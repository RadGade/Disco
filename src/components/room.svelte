<script>
    // your script goes here
    import { push } from 'svelte-spa-router';
    export let name
</script>

<style>
    /* your styles go here */
    .room-con{
        background: linear-gradient(90deg, #4568DC 0%, #B06AB3 100%);
        
    }

    .room-name{
        font-size: calc(20px + (26 - 14) * ((100vw - 300px) / (1600 - 300)));
        font-style: normal;
        font-family: Roboto;
        font-weight: 900;
        color: #FFFFFF;
    }
</style>

<!-- markup (zero or more items) goes here -->
         <!-- content here -->
  <div class="my-2 px-2 w-full overflow-hidden sm:my-2 sm:px-2 sm:w-full md:my-2 md:px-2 md:w-1/2 lg:my-2 lg:px-2 lg:w-1/3 xl:my-2 xl:px-2 xl:w-1/3">
    <!-- Column Content -->
   <div class="room-con w-full rounded overflow-hidden hover:shadow-lg h-56" on:click={() => {
    push('/room')}}>
        <h1 class="room-name my-40 ml-8">{name}</h1>
    </div>
  </div>