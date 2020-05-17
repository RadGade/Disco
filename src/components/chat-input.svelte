<script>
let message;
</script>

<style>

.chat {
    background: #4D4D4D;
    border-radius: 8px;
    outline: none;
    color: white;
    border: none;
    position: absolute;
    bottom: 5%;
    margin-left: 2%;
    padding-left: 2%;
    padding-right: 2%;
}

</style>

<textarea type="text" class="chat w-10/12" bind:value={message}></textarea>