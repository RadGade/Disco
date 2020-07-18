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
    width: 100%;
    height: 17rem;
    /* background: #3E3E3E; //add this when intiating modal
    border-radius: 6px; */
    }

    
  #profile-upload{
    background-image:url('');
    background-size:cover;
    width: 10rem;
    height: 10rem;
     z-index: 5;
    background-position: center;
  overflow:hidden;
  position: absolute;
  right: 4%;
  top: 0;

}
#profile-upload:hover input.upload{
  display:block;
}
#profile-upload:hover .hvr-profile-img{
  display:inline-block;
 }
#profile-upload .fa{   margin: auto;
    position: absolute;
    bottom: -4px;
    left: 0;
    text-align: center;
    right: 0;
    padding: 6px;
   opacity:1;
   -webkit-transform: scale(1); 
}
#profile-upload input.upload {
    z-index:1;
    left: 0;
    margin: 0;
    bottom: 0;
    top: 0;
    padding: 0;
    opacity: 0;
    outline: none;
    cursor: pointer;
    position: absolute;
    background:#ccc;
    width:100%;
    display:none;
}

#profile-upload .hvr-profile-img {
  width:100%;
  height:100%;
  display: none;
  position:absolute;
  vertical-align: middle;
  position: relative;
  background: grey;
  opacity: 50%;
 }

.form__group{
  margin-top: 5rem;
  margin-left: 3%;
}

.form__label {
  font-family: 'Roboto', sans-serif;
  font-size: calc(4px + (26 - 14) * ((100vw - 300px) / (1600 - 300))); 
  margin-left: 1rem;
  font-weight: bold;
  margin-top: 0.3rem;
  display: block;
  color: white;
  transition: all 0.3s;
  transform: translateY(0rem);
}

.form__input {
  font-family: 'Roboto', sans-serif;
  color: #333;
 font-size: calc(4px + (26 - 14) * ((100vw - 300px) / (1600 - 300))); 
  padding: 0.6rem 1rem;
  background-color: rgb(255, 255, 255);
  border: none;
  width: 50%;
  display: block;
  border-bottom: 0.3rem solid transparent;
}

.form__input:placeholder-shown + .form__label {
  opacity: 0;
  visibility: hidden;
  -webkit-transform: translateY(-4rem);
  transform: translateY(-4rem);
}

.form__input:focus{
    outline: none
}

.call-to-action{
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    color: white;
    font-size: calc(15px + (26 - 14) * ((100vw - 300px) / (1600 - 300))); 
    margin-left: 3%;
    margin-top: 2%;
}

.create:focus{
  outline: none;
  border: none;
}
.create{
  outline: none;
  border: none;
}
</style>

<div class="con">
<p class="call-to-action">Build a room for your community</p>
  <div class="form__group">
  <input type="text" class="form__input" id="name" placeholder="Enter a name for your sweet room" required="" autocomplete="off" />
  <label for="name" class="form__label">Room Name</label>
</div>

        <div class="md:w-2/3">
<button class="create shadow bg-purple-500 hover:bg-purple-400 ml-4 mt-4 focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
        Create
      </button>
        </div>

  <div id='profile-upload' class="h-20 w-20 bg-gray-400 ml-4 mt-24 rounded absolute">
<div class="hvr-profile-img"><input type="file" name="logo" id='getval'  class="upload w180" title="Dimensions 180 X 180" ></div>
  <div class="fa fa-camera"><svg class="add" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg></div>
  </div>
</div>