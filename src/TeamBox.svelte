<script>
  export let team;

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

<thead>
  <tr>
    <th colspan="15">
      <h2>{team.teamName}</h2>
    </th>
  </tr>
  <tr>
    <th>Player</th>
    <th>MIN</th>
    <th>FG</th>
    <th>3PT</th>
    <th>FT</th>
    <th>OREB</th>
    <th>DREB</th>
    <th>REB</th>
    <th>AST</th>
    <th>STL</th>
    <th>BLK</th>
    <th>TO</th>
    <th>PF</th>
    <th>PTS</th>
    <th>+/-</th>
  </tr>
</thead>
<tbody>
  {#each team.players as player}
    <tr>
      <td>{player.name}</td>
      <td>{parseMinutes(player.statistics.minutes)}</td>
      <td>{fieldGoals(player.statistics)}</td>
      <td>{threePointers(player.statistics)}</td>
      <td>{freeThrows(player.statistics)}</td>
      <td>{player.statistics.reboundsOffensive}</td>
      <td>{player.statistics.reboundsDefensive}</td>
      <td>{player.statistics.reboundsTotal}</td>
      <td>{player.statistics.assists}</td>
      <td>{player.statistics.steals}</td>
      <td>{player.statistics.blocks}</td>
      <td>{player.statistics.turnovers}</td>
      <td>{player.statistics.foulsPersonal}</td>
      <td>{player.statistics.points}</td>
      <td>{player.statistics.plusMinusPoints}</td>
    </tr>
  {/each}
  <tr class="totals">
    <td>Totals</td>
    <td />
    <td>{fieldGoals(team.statistics)}</td>
    <td>{threePointers(team.statistics)}</td>
    <td>{freeThrows(team.statistics)}</td>
    <td>{team.statistics.reboundsOffensive}</td>
    <td>{team.statistics.reboundsDefensive}</td>
    <td>{team.statistics.reboundsTotal}</td>
    <td>{team.statistics.assists}</td>
    <td>{team.statistics.steals}</td>
    <td>{team.statistics.blocks}</td>
    <td>{team.statistics.turnovers}</td>
    <td>{team.statistics.foulsPersonal}</td>
    <td>{team.statistics.points}</td>
    <td />
  </tr>
</tbody>

<style>
  .totals {
    font-weight: bold;
  }
  td,
  th {
    text-align: right;
  }
  td:first-child,
  th:first-child {
    text-align: left;
  }
</style>
