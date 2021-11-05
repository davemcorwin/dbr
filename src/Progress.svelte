<script>
  import { styles } from './customStyles';

  export let times;
  export let currentIdx;

  $: currentWidth = '35%';
  $: maxWidth = '30%';
</script>

<div class="progress">
  <span use:styles={{ currentWidth }} class="current" />
  <span use:styles={{ maxWidth }} class="max" />
</div>

<style>
  .progress {
    align-items: stretch;
    background-color: darkgray;
    display: flex;
    height: 20px;
  }
  .current {
    background-color: rgb(18, 138, 54);
    width: var(--currentWidth);
  }
  .max {
    background-color: rgb(12, 81, 49);
    opacity: 0.8;
    width: var(--maxWidth);
  }
</style>
