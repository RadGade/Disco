<script>
        let msg = []

    for (let i = 0; i < 20; i++) {
        msg.push(i)
    }

</script>

<style type="css">
* {
	 margin: 0;
	 font-family: "Roboto", sans-serif;
	 border: 0;
	 font-size: 100%;
	 font-style: inherit;
	 font-weight: inherit;
	 margin: 0;
	 padding: 0;
	 vertical-align: baseline;
	 overflow: hidden;
	 transition: background-color 0.17s ease, color 0.17s ease;
}
 .app {
	position: absolute;
	width: 80%;
	overflow:auto;
	-ms-overflow-style: none;
    height: 75%;
	bottom: 0;
	overflow-y: auto;
	margin-bottom: 10%;
    overflow-x: hidden;
	
}
 
 .chat-box {
	 height: auto;
     width: 80%;
	 margin-bottom: 0;
}

.app::-webkit-scrollbar {
	display: none;
}
 /* .app::-webkit-scrollbar {
	 width: 14px;
	 position: absolute;
}
 .app::-webkit-scrollbar-thumb, ::-webkit-scrollbar-track-piece {
	 background-clip: padding-box;
	 border: 2.5px solid #36393f;
	 border-radius: 7px;
	 background-clip: padding-box;
}
 .app::-webkit-scrollbar-thumb {
	 background-color: #181a1c;
}
 .app::-webkit-scrollbar-track-piece {
	 background-color: rgba(0, 0, 0, 0.25);
} */
 .message-group {
	 margin: 10px 20px;
	 padding: 10px 1px;
}
 .header-group > .avatar img {
	 position: absolute;
	 border-radius: 50%;
	 height: 45px;
	 width: 45px;
}
 .header-group > .header {
	 margin-left: 60px;
	 padding-top: 3px;
	 color: #fff;
	 height: 1.3em;
}
 .header-group > .header > .timestamp {
	 color: rgba(255, 255, 255, 0.2);
	 font-size: 0.75rem;
	 font-weight: 400;
	 letter-spacing: 0;
	 margin-left: 0.3rem;
}
 .message {
	 color: #dcddde;
	 margin-left: 60px;
	 padding-right: 10px;
}
 .message > .content {
	 margin-top: 4px;
	 font-size: 0.9375rem;
	 color: #dcddde;
}
 .divider {
	 border: none;
	 border-bottom: 1px solid transparent;
	 margin: 20px 0px -20px;
	 border-bottom-color: rgba(255, 255, 255, 0.04);
}

 /* code.inline {
	 border: none;
	 border-radius: 3px;
	 font-family: Consolas, Liberation Mono, Menlo, Courier, monospace;
	 font-size: 85%;
	 height: auto;
	 margin: -0.2em 0;
	 padding: 0.2em;
	 text-indent: 0;
	 width: auto;
	 background: #2f3136;
	 line-height: 1.3;
	 user-select: text;
	 white-space: pre-wrap;
	 word-wrap: break-word; 
} */
 
</style>
<div class="app">
{#each msg as item}
<div class="chat-box">
  <div class="message-group">
    <div class="header-group">
      <div class="avatar">
        <img src="https://dustiidesign.com/wp-content/uploads/2017/01/PLEASE-REMAIN-CALM-6.png" alt="avatar" />
      </div>
      <div class="header">Aeternum<span class="timestamp">Today at 6:10 PM</span></div>

    </div>
    <div class="message">
      <div class="content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ac nibh vel diam viverra aliquam. Donec auctor, velit vel dignissim dictum, dolor libero malesuada orci, in pulvinar quam massa quis quam. Nulla egestas quam eu ligula cursus interdum.
        In leo magna, vulputate fermentum venenatis non, mattis eu sapien. Pellentesque dictum et turpis vitae facilisis. Praesent eu ullamcorper justo, vel fringilla felis. Mauris posuere euismod tempor.</div>
    </div>
    <hr class="divider" />
  </div>
 </div>
 {/each}
</div>
