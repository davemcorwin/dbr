<script>
  import page from 'page';
  import { supabase } from './supabase';
  import router from './routerStore';
  import Box from './Box.svelte';

  let games = [];
  let boxscores = [];

  $: selectedGameDate = $router.params.date;
  $: if (selectedGameDate) loadBoxScores();

  loadGames();

  async function loadGames() {
    const { data } = await supabase.from('games').select();
    games = filterGames(data);
  }

  async function loadBoxScores() {
    const lastCreatedAt = boxscores[boxscores.length - 1]?.created_at;

    const query = supabase.from('boxscores').select().eq('date', selectedGameDate);

    if (lastCreatedAt) {
      query.gt('created_at', lastCreatedAt);
    }

    const { data } = await query;

    boxscores = [...boxscores, ...(data || [])];

    setTimeout(loadBoxScores, 10 * 1000);
  }

  function isWolvesGame(game) {
    return [game.awayTeam.teamName, game.homeTeam.teamName].includes('Timberwolves');
  }

  function filterGames(data) {
    return data
      .filter((day) => !!day.data.find(isWolvesGame))
      .map((day) => ({ ...day, data: day.data.find(isWolvesGame) }));
  }

  function handleInput(e) {
    page(`/${e.target.value}`);
  }
</script>

<main>
  <form>
    <label for="game">Choose a date: </label>
    <select id="game" name="game" value={selectedGameDate} required on:input={handleInput}>
      {#each games as game}
        <option value={game.date}>{game.date}</option>
      {/each}
    </select>
  </form>
  {#if boxscores}
    <Box date={selectedGameDate} stats={boxscores} />
  {/if}
</main>

<style>
  main {
    height: 100%;
  }
  form {
    display: flex;
    gap: 2rem;
    height: 40px;
    padding: 0.5rem;
    border: 1px solid #d9d9d9;
  }
  select,
  label {
    padding: 0 1rem;
  }
  select {
    flex: 1;
  }
  label {
    display: flex;
    align-items: center;
  }
</style>
