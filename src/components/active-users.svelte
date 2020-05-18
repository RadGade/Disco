<script>
    // your script goes here
    let users = [],
        isOpen = true

    for (let i = 0; i < 20; i++) {
        users.push(i)
    }

    function openNav() {
         isOpen = true
        console.log(isOpen)
  document.getElementById("ver").style.width = "7em";
  document.getElementById("main").style.marginLeft = "8rem";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    isOpen = false
    console.log(isOpen)
  document.getElementById("ver").style.width = "3rem";
  document.getElementById("main").style.marginLeft = "3rem";
}
</script>

<style>
    /* your styles go here */
    .users{
        background: #656565;
        overflow:auto;
        max-height:100%;
        height: 100vh;
        position: absolute;
        right: 0;
        overflow-x: hidden;
        transition: 0.5s;
    }

     .users::-webkit-scrollbar {
	 width: 7px;
}
 .users::-webkit-scrollbar-thumb, ::-webkit-scrollbar-track-piece {
	 background-clip: padding-box;
	 border-radius: 2px;
	 background-clip: padding-box;
}
 .users::-webkit-scrollbar-thumb {
	 background-color: #181a1c;
}
 .users::-webkit-scrollbar-track-piece {
	 background-color: rgba(0, 0, 0, 0.25);
}
</style>

<!-- markup (zero or more items) goes here -->

<div class="users float-right" id="ver" on:click={() => {
    if(isOpen == true){
        closeNav()
    } else {
        openNav()
    }
}}>
{#each users as item}
     <!-- content here -->
     <div class="bg-gray-500 text-white font-bold py-2 px-4 rounded w-16 h-16 my-5 mr-5 ml-5"></div>
{/each}
</div>
