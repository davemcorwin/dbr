<script>
  import BoxBodyRow from './BoxBodyRow.svelte';
  import BoxHeaderRow from './BoxHeaderRow.svelte';

  export let team;
  $: players = team.players.sort(comparePlayers);

  function comparePlayers(a, b) {
    const starterCompare = a.starter.localeCompare(b.starter);
    if (starterCompare !== 0) return -1 * starterCompare;

    const playedCompare = a.played.localeCompare(b.played);
    if (playedCompare !== 0) return -1 * playedCompare;

    return a.order < b.order ? -1 : 1;
  }

  function fieldGoals(stats) {
    return format(
      stats.fieldGoalsAttempted === 0 ? 0 : stats.fieldGoalsMade / stats.fieldGoalsAttempted
    );
  }

  function freeThrows(stats) {
    return format(
      stats.freeThrowsAttempted == 0 ? 0 : stats.freeThrowsMade / stats.freeThrowsAttempted
    );
  }

  function threePointers(stats) {
    return format(
      stats.threePointersAttempted === 0
        ? 0
        : stats.threePointersMade / stats.threePointersAttempted
    );
  }

  function format(pct) {
    return `${Math.round(pct * 1000) / 10}%`;
  }
</script>

<thead>
  <tr>
    <th colspan="15">
      <h2>{team.teamName}</h2>
    </th>
  </tr>
  <BoxHeaderRow title="Starters" />
</thead>
<tbody>
  {#each players.slice(0, 5) as player}
    <BoxBodyRow name={player.nameI} stats={player.statistics} />
  {/each}
</tbody>
<thead>
  <BoxHeaderRow title="Bench" />
</thead>
<tbody>
  {#each players.slice(5) as player}
    <BoxBodyRow name={player.nameI} stats={player.statistics} />
  {/each}
  <BoxBodyRow isTeam={true} name="Team" stats={team.statistics} />
  <tr class="team">
    <td />
    <td />
    <td>{fieldGoals(team.statistics)}</td>
    <td>{threePointers(team.statistics)}</td>
    <td>{freeThrows(team.statistics)}</td>
  </tr>
</tbody>

<style>
  .team {
    font-weight: bold;
  }
  td,
  th {
    padding: 5px 2px;
    text-align: right;
  }
  th:first-child {
    text-align: left;
  }
</style>
