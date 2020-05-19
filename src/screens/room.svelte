<script>
    import Users from '../components/active-users.svelte'
    import ChatInput from '../components/chat-input.svelte'
    import ChatBubble from '../components/chatBubble.svelte'
	import ChannelSelect from '../components/channel-select.svelte'
	import ChannelSettings from '../components/room-settings.svelte'
    import { getContext } from 'svelte';
    import { fly } from 'svelte/transition';

	let opening = false;
	let opened = false;
	let closing = false;
	let closed = false;

    const { open } = getContext('simple-modal');

        	const showPopupCustom = () => {
		open(
			ChannelSettings,
			{
				message: "morty"
			},
		  {
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
	.channel-setting{
		color: #4D4D4D;
		font-weight: bold;
	}

</style>
<p class="channel-setting absolute ml-8 mt-1" on:click={showPopupCustom}>Team ERA</p>
<!-- <ChannelSelect/> -->
<Users />
<ChatBubble />
<ChatInput />