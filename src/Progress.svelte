<script>
  import { styles } from './customStyles';

  export let times;
  export let currentIdx;

  $: currentWidth = progress(times[currentIdx].data);
  $: maxWidth = progress(times[times.length - 1].data);

  function progress(data) {
    console.log(data);
    const { period, gameClock } = data;
    const minutes =
      getCumulativePeriodMinutes(period - 1) +
      (getPeriodMinutes(period) - Number.parseInt(gameClock.slice(2, 4)));
    const progress = Math.round((minutes / getCumulativePeriodMinutes(Math.max(4, period))) * 100);
    return `${progress}%`;
  }

  function getPeriodMinutes(period) {
    return period > 4 ? 5 : 12;
  }

  function getCumulativePeriodMinutes(period) {
    let minutes = 0;
    for (let i = 1; i <= period; i++) {
      minutes += getPeriodMinutes(i);
    }
    return minutes;
  }
</script>

<div class="progress">
  <span use:styles={{ maxWidth }} class="max" />
  <span use:styles={{ currentWidth }} class="current" />
</div>

<style>
  .progress {
    background-color: darkgray;
    height: 20px;
  }
  .current {
    background-color: rgb(18, 138, 54);
    height: 20px;
    position: absolute;
    width: var(--currentWidth);
  }
  .max {
    background-color: rgb(12, 81, 49);
    height: 20px;
    opacity: 0.8;
    position: absolute;
    width: var(--maxWidth);
  }
</style>
