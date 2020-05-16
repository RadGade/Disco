<script>
    // your script goes here
    import { push } from 'svelte-spa-router';
    import Room from '../components/room.svelte';
    let rooms = []

    for (let i = 0; i < 5; i++) {
        rooms.push(i)
    }

    	const showPopupCustom = () => {
		open(
			Popup,
			{
				message: "It's a customized popup!"
			},
		  {
				styleBg: {
					background: 'rgba(39, 39, 39, 0.9);'
				},
				styleWindow: {
					border: '2px solid #00beff',
                    background: '#3E3E3E'
				},
				transitionWindow: fly,
				transitionWindowProps: {
					y: 100,
					duration: 1000
				},
			},
			{
				onOpen: () => {
					opening = true;
				},
				onOpened: () => {
					opening = false;
					opened = true;
				},
				onClose: () => {
					opened = false;
					closing = true;
				},
				onClosed: () => {
					closing = false;
					closed = true;
					setTimeout(() => { closed = false; }, 1000);
				}
			}
		);
	};
	
</script>

<style>
    /* your styles go here */
    .title{
        font-family: Roboto;
        position: absolute;
        font-style: normal;
        font-weight: 900;
        font-size: calc(50px + (26 - 14) * ((100vw - 300px) / (1600 - 300)));
        line-height: 84px;

        color: #FFFFFF;
    }
</style>

<!-- markup (zero or more items) goes here -->
         <!-- content here -->

<h1 class="title ml-12 -mt-40">Rooms</h1>

<div class="flex flex-wrap mx-5 mt-48 overflow-hidden sm:mx-20 sm:mt-48 md:mx-5 md:mt-48 lg:mx-5 lg:mt-48 xl:mx-20 xl:mt-48">
    {#each rooms as item}
        <Room name="Team Era" />
    {/each}
  <div class="my-2 px-2 w-full overflow-hidden sm:my-2 sm:px-2 sm:w-full md:my-2 md:px-2 md:w-1/2 lg:my-2 lg:px-2 lg:w-1/3 xl:my-2 xl:px-2 xl:w-1/3">
    <!-- Column Content -->
<button class="shadow bg-purple-500 hover:bg-purple-400 focus:outline-none text-white font-bold py-2 px-4 rounded my-24 mx-32" type="button" on:click={showPopupCustom}>
        Make a Room
      </button>
  </div>
</div>
