import { createClient } from '@supabase/supabase-js'
import axios from 'axios';

const { SUPABASE_SECRET_KEY, SUPABASE_URL } = process.env;

const boxscoreUrl = gameId => `https://cdn.nba.com/static/json/liveData/boxscore/boxscore_${gameId}.json`;

function isWolvesGame(game) {
  return [game.awayTeam.teamName, game.homeTeam.teamName].includes('Timberwolves');
}

function startsWithin(dateStr, minutes) {
  return ((Date.now() - new Date(dateStr).getTime()) / 1000 / 60) < minutes;
}

async function wrap(p) {
  const { data, error } = await p;
  if (error) throw error;
  return data;
}

async function fetch(date, extGameId) {
  const { data: { game } } = await axios.get(boxscoreUrl(extGameId));
    
  const { gameStatusText } = game;
  
  await wrap(supabase
    .from('boxscores')
    .upsert(
      {
        date,
        ext_game_id: extGameId,
        game_time: gameStatusText,
        identifier: `${extGameId}|${gameStatusText}`,
        data: game
      },
      { onConflict: 'identifier' }
    ));
}

async function go() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY);
  
  const { date, data: gameData } = await wrap(supabase
    .from('games')
    .select()
    .order('date', { ascending: false })
    .limit(1)
    .single());

  const wolvesGame = gameData.find(isWolvesGame);
  if (!wolvesGame) {
    console.log('No Wolves game found');
    return;
  }

  if (wolvesGame.gameStatus !== 2 && !startsWithin(wolvesGame.gameTimeUTC, 30)) {
    console.log('No active game');
    return;
  }

  console.log('Wolves are howling, fetching boxes for the next 30 minutes');
  const id = setInterval(fetch, 30 * 1000, date, wolvesGame.gameId);
  setTimeout(clearInterval, 30 * 60 * 1000, id);
};

try {
  go()
} catch(e) {
  console.error(e);
  process.exit(1);
};