<script>
  import page from 'page';
  import router from './routerStore';
  import App from './App.svelte';

  let currentPage;

  function queryString(ctx, next) {
    ctx.query = {};
    new URLSearchParams(ctx.querystring).forEach((v, k) => {
      ctx.query[k] = v;
    });
    next();
  }

  function render(component) {
    return (ctx) => {
      currentPage = component;
      router.setContext(ctx);
    };
  }

  // Routes
  page('/', render(App));
  page('/:date', queryString, render(App));
  page();
</script>

{#if currentPage}
  <svelte:component this={currentPage} />
{/if}
