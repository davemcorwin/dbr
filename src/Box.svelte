<script>
  import router from './routerStore';
  import Header from './Header.svelte';
  import Progress from './Progress.svelte';
  import TeamBox from './TeamBox.svelte';

  export let date;
  export let stats = [];

  $: currentIdx = Number.parseInt($router.query?.time ?? '0');
  $: sorted = stats.sort(compareGameTime);
  $: currentData = sorted[currentIdx]?.data;
  $: hasNext = currentIdx < sorted.length - 1;
  $: nextIdx = Math.min(currentIdx + 1, sorted.length - 1);
  $: hasPrevious = currentIdx > 0;
  $: previousIdx = Math.max(currentIdx - 1, 0);

  function compareGameTime(a, b) {
    if (a.data.gameStatusText === 'Final') return 1;

    if (b.data.gameStatusText === 'Final') return -1;

    const periodCompare = `${a.data.period}`.localeCompare(`${b.data.period}`);
    if (periodCompare !== 0) return periodCompare;

    const minuteCompare = a.data.gameClock.slice(2, 4).localeCompare(b.data.gameClock.slice(2, 4));
    if (minuteCompare !== 0) return -1 * minuteCompare;

    const secondCompare = a.data.gameClock.slice(5, 7).localeCompare(b.data.gameClock.slice(5, 7));
    if (secondCompare !== 0) return -1 * secondCompare;

    const subSecondCompare = a.data.gameClock.slice(8).localeCompare(b.data.gameClock.slice(8));

    return -1 * subSecondCompare;
  }
</script>

<div class="container">
  {#if currentData}
    <Header data={currentData} />
    <Progress times={sorted} {currentIdx} />
    <div class="stats">
      <table>
        <TeamBox team={currentData.awayTeam} />
        <TeamBox team={currentData.homeTeam} />
      </table>
    </div>
    <div class="actions">
      <a class="previous center" href={`/${date}?time=${previousIdx}`} disabled={!hasPrevious}
        >Prev</a
      >
      <a class="next center" href={`/${date}?time=${nextIdx}`} disabled={!hasNext}>Next</a>
    </div>
  {:else}
    <h2>No data</h2>
  {/if}
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    font-size: 70%;
    height: 100%;
    justify-content: end;
  }
  .stats {
    flex: 1;
    overflow: scroll;
  }
  .actions {
    display: grid;
    grid-template-columns: 50% 50%;
    height: 50px;
  }
  .actions a {
    border-radius: 5px;
    color: white;
    font-weight: bold;
    font-size: 1.5rem;
    text-decoration: none;
  }
  .previous {
    background-color: rgb(18, 138, 54);
  }
  .next {
    background-color: rgb(6, 50, 200);
  }
</style>
