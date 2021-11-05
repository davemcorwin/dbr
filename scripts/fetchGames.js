import { createClient } from '@supabase/supabase-js'
import axios from 'axios';

const { SUPABASE_SECRET_KEY, SUPABASE_URL } = process.env;

const scoreboardUrl = 'https://cdn.nba.com/static/json/liveData/scoreboard/todaysScoreboard_00.json';

async function go() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY);
  
  const { data: { scoreboard } } = await axios.get(scoreboardUrl);
  const { gameDate, games } = scoreboard;
  
  const { data, error } = await supabase
    .from('games')
    .upsert(
      { date: gameDate, data: games },
      { onConflict: 'date' }
    );

  if (error) {
    console.error(error);
  }
}

go();