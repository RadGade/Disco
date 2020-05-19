<script>
  export let message;
</script>

<style>
  h2 {
		font-size: 2rem;
		text-align: center;
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 21px;
    color: #969696;
    line-height: 25px;
	}

    .con{
    width: 5rem;
    height: 40rem;
    /* background: #3E3E3E; //add this when intiating modal
    border-radius: 6px; */
    }
</style>

<div class="con">
    <div class="profile-pic h-20 w-20 bg-gray-700 ml-64 mt-4 rounded"></div>
    <h2 class="ml-64 mt-4">@{message}</h2>
</div>