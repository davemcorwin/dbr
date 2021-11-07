<script>
  export let data;
</script>

<div class="container">
  <div class="summary">
    <div class="team left v-center">{data.awayTeam.teamTricode}</div>
    <div class="score center">{data.awayTeam.score}</div>
  </div>
  <div class="gametime center">{data.gameStatusText}</div>
  <div class="summary">
    <div class="score center">{data.homeTeam.score}</div>
    <div class="team v-center">{data.homeTeam.teamTricode}</div>
  </div>
</div>

<style>
  .container {
    height: 40px;
    display: grid;
    grid-template-columns: 33% 33% 33%;
    padding: 0.25rem 0;
  }
  .summary {
    display: grid;
    grid-template-columns: 50% 50%;
  }
  .gametime {
    font-size: 1rem;
  }
  .score {
    font-size: 2rem;
  }
  .team {
    font-size: 1rem;
  }
  .team.left {
    justify-content: flex-end;
  }
</style>
