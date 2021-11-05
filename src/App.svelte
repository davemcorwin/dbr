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

  function loadGames() {
    supabase
      .from('games')
      .select()
      .then(({ data }) => {
        games = filterGames(data);
      });
  }

  function loadBoxScores() {
    supabase
      .from('boxscores')
      .select()
      .eq('date', selectedGameDate)
      .then(({ data }) => {
        boxscores = data ?? [];
      });
  }

  function isWolvesGame(game) {
    return [game.awayTeam.teamName, game.homeTeam.teamName].includes('Timberwolves');
  }

  function filterGames(data) {
    return data
      .filter((day) => !!day.data.find(isWolvesGame))
      .map((day) => ({ ...day, data: day.data.find(isWolvesGame) }));
  }

  function handleChange() {
    page(`/${selectedGameDate}`);
  }
</script>

<main>
  <form on:change={handleChange}>
    <label for="game">Choose a date: </label>
    <select id="game" name="game" bind:value={selectedGameDate} required>
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
    display: flex;
    flex-direction: column;
  }
  form {
    display: flex;
    gap: 2rem;
    height: 40px;
    padding: 0.5rem;
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
