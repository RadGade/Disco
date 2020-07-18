import gun from "./__init__";
import iris from "../lib/iris";
var user = gun.user()

function createChannel(channelName) {
   var key = window.localStorage.getItem("keys")
    var c = new iris.Channel({
        gun,
        key,
        participants: []
    })
    c.put('name', channelName)
    console.log(c)
}


export { createChannel }