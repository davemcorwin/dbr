<script>
  export let isTeam = false;
  export let name;
  export let stats;

  function parseMinutes(minutes) {
    return `${minutes.slice(2, 4)}:${minutes.slice(5, 7)}`;
  }

  function fieldGoals(stats) {
    return `${stats.fieldGoalsMade}-${stats.fieldGoalsAttempted}`;
  }

  function freeThrows(stats) {
    return `${stats.freeThrowsMade}-${stats.freeThrowsAttempted}`;
  }

  function threePointers(stats) {
    return `${stats.threePointersMade}-${stats.threePointersAttempted}`;
  }
</script>

<tr class:team={isTeam}>
  <td>{name}</td>
  <td>{isTeam ? '' : parseMinutes(stats.minutes)}</td>
  <td>{fieldGoals(stats)}</td>
  <td>{threePointers(stats)}</td>
  <td>{freeThrows(stats)}</td>
  <td>{stats.reboundsOffensive}</td>
  <td>{stats.reboundsDefensive}</td>
  <td>{stats.reboundsTotal}</td>
  <td>{stats.assists}</td>
  <td>{stats.steals}</td>
  <td>{stats.blocks}</td>
  <td>{stats.turnovers}</td>
  <td>{stats.foulsPersonal}</td>
  <td>{stats.points}</td>
  <td>{isTeam ? '' : stats.plusMinusPoints}</td>
</tr>

<style>
  tr {
    border-top: 1px solid #edeef0;
    color: #595959;
  }
  td {
    border-top: 1px solid #edeef0;
    padding: 4px 2px;
    text-align: right;
  }
  td:first-child {
    text-align: left;
    white-space: nowrap;
  }
  .team {
    font-weight: bold;
  }
  td:nth-child(2n),
  tr:nth-child(2n) {
    background-color: rgba(0, 0, 0, 0.016);
  }
</style>
