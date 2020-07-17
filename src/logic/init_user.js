import gun from "./__init__";
import iris from "../lib/iris";
var user = gun.user()
console.log(iris.VERSION)
let key
async function init_user (alias, pass) {
    var User = new Promise((res, rej) => {
        user.create(alias, pass, async (ack) => {
          if (ack.err) {
            return rej(ack.err);
          } else {
            console.log(user._.sea);
            await login_user(alias, pass)
            createChatLink(user._.sea)
            return res(user._.sea);
          }
        });
      });

    return User;
}


async function login_user (alias, pass) {
        var prom = new Promise((res, rej) => {
            user.auth(alias, pass, async (ack) => {
              if (ack.err) {
                return rej(ack.err);
              } else {
                key = ack.sea
                window.localStorage.setItem("keys", JSON.stringify(ack.sea));
                await iris.Channel.initUser(gun, ack.sea)
                window.sessionStorage.setItem("isAuth", true);
                await iris.Channel.getMyChatLinks(gun, ack.sea, "http://localhost:8080/#/", chatLink => {
                  console.log(chatLink)
                });  
                return res(ack);
              }
            });
          });
            return prom;
    }

    async function createChatLink(key) {
      let latestChatLink = await iris.Channel.createChatLink(gun, key, "http://localhost:8080/#/");
      console.log(latestChatLink)
      user.get("latestChatlink").put(latestChatLink)
    }
    

export {
    init_user,
    login_user
}