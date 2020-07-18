<svelte:head>
  <script src="/lib/gun.js"></script>
  <script src="/lib/sea.js"></script>
</svelte:head>
<script>
	import Router, {wrap, push, replace} from 'svelte-spa-router';
	  import Modal from 'svelte-simple-modal';
    import Notifications from 'svelte-notifications';
    import { get } from 'svelte/store';
    import Rooms from './screens/rooms.svelte'
    import Room from './screens/room.svelte'
    import Auth from './screens/auth.svelte'
    import './lib/gun'
    import './lib/sea'



    const routes = {
        '/': wrap(
          Auth,
          
                  {hello: 'world', myFunc: () => {
            console.log('do something!')
        }},
(detail) => {
   var isAuth = window.localStorage.getItem('keys');
  if (isAuth) {
    push('/rooms')
  }
                // This pre-condition is executed only if the first one succeeded
                // eslint-disable-next-line no-console
                console.log('Pre-condition 2 executed', detail.location, detail.userData)
                // Always succeed
                return true
            }
        ),
        '/rooms' : wrap(
          Rooms,

          (detail) => {
            
            var isAuth = window.localStorage.getItem('keys');
            console.log(isAuth)
            if (!isAuth) {
              console.log("YOU SHALL NOT PASS");
              return false

            } else {
            console.log("Get  in");
              return true
            }
          }
        ),
        '/room' : wrap(
          Room,

          (detail) => {
            
            var isAuth = window.localStorage.getItem('keys');
            console.log(isAuth)
            if (!isAuth) {
              console.log("YOU SHALL NOT PASS");
              return false

            } else {
            console.log("Get  in");
              return true
            }
          }
        ),
    }

    function conditionsFailed(event) {
    console.error('conditionsFailed event', event.detail)
        replace('/')
    }
</script>
<style>
  /* your styles go here */
  :global(body) {

    background: linear-gradient(90deg, #232526 0%, #414345 50%);
    height: 100vh;
    overflow: hidden;
    margin: 0;
    width: 100%;

  }
</style>

<!-- markup (zero or more items) goes here -->
<Modal>
<Notifications>
    <Router {routes} on:conditionsFailed={conditionsFailed}/>
</Notifications>
</Modal>

