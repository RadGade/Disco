<script>
    // your script goes here
    import { push } from 'svelte-spa-router';
    import Room from '../components/room.svelte';
	import UserSettings from '../components/user-settings.svelte';
	import RoomsSettings from '../components/create-room.svelte';
    import { getContext } from 'svelte';
    import { fly } from 'svelte/transition';

    const { open } = getContext('simple-modal');
	
	let opening = false;
	let opened = false;
	let closing = false;
	let closed = false;
    let rooms = []



    	const showPopupCustom = () => {
		open(
			UserSettings,
			{
				message: "morty"
			},
		  {
			  closeButton: false,
				styleBg: {
					background: 'rgba(39, 39, 39, 0.9);'
				},
				styleWindow: {
                    background: '#3E3E3E',
					overflow: 'none'
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
	
	    	const createRoom = () => {
		open(
			RoomsSettings,
			{
				message: "Room"
			},
		  {
			  closeButton: false,
				styleBg: {
					background: 'rgba(39, 39, 39, 0.9);'
				},
				styleWindow: {
                    background: '#3E3E3E',
					overflow: 'none'
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

    .user{
        position: absolute;
        right: 0;
    }
</style>

<!-- markup (zero or more items) goes here -->
         <!-- content here -->

<h1 class="title ml-12 mt-10">Rooms</h1>
<div on:click={showPopupCustom} class="user h-12 w-12 bg-gray-700 mr-4 mt-4 rounded"></div>
<div class="flex flex-wrap mx-5 mt-48 overflow-hidden sm:mx-20 sm:mt-48 md:mx-5 md:mt-48 lg:mx-5 lg:mt-48 xl:mx-20 xl:mt-48">
    {#each rooms as item}
        <Room name="Team Era" />
    {/each}
  <div class="my-2 px-2 w-full overflow-hidden sm:my-2 sm:px-2 sm:w-full md:my-2 md:px-2 md:w-1/2 lg:my-2 lg:px-2 lg:w-1/3 xl:my-2 xl:px-2 xl:w-1/3">
    <!-- Column Content -->
<button on:click={createRoom} class="shadow bg-purple-500 hover:bg-purple-400 focus:outline-none text-white font-bold py-2 px-4 rounded my-24 mx-32" type="button">
        Make a Room
      </button>
  </div>
</div>
