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


    function addChat(channel) {
      console.log(channel)
      var pub = channel.getId();
      if (chats[pub]) { return; }
      chats[pub] = channel;
      $('#welcome').remove();
      var el = $('<div class="chat-item"><div class="text"><div><span class="name"></span><small class="latest-time"></small></div> <small class="typing-indicator"></small> <small class="latest"></small> <span class="unseen"></span></div></div>');
      el.attr('data-pub', pub);
      var latestEl = el.find('.latest');
      var typingIndicator = el.find('.typing-indicator').text(t('typing'));
      chats[pub].getMessages((msg, info) => {
        chats[pub].messages[msg.time] = msg;
        msg.info = info;
        msg.selfAuthored = info.selfAuthored;
        msg.time = new Date(msg.time);
        if (!info.selfAuthored && msg.time > (chats[pub].myLastSeenTime || -Infinity)) {
          if (activeChat !== pub || document.visibilityState !== 'visible') {
            Notifications.changeChatUnseenCount(pub, 1);
          }
        }
        if (!info.selfAuthored && msg.time > chats[pub].theirLastSeenTime) {
          chats[pub].theirLastSeenTime = msg.time;
          lastSeenTimeChanged(pub);
        }
        if (!chats[pub].latest || msg.time > chats[pub].latest.time) {
          chats[pub].latest = msg;
          var text = msg.text || '';
          if (msg.attachments) {
            text = '['+ t('attachment') +']' + (text.length ? ': ' + text : '');
          } else {
            text = msg.text;
          }
          if (chats[pub].uuid && !msg.selfAuthored && msg.info.from && chats[pub].participantProfiles[msg.info.from].name) {
            text = chats[pub].participantProfiles[msg.info.from].name + ': ' + text;
          }
          var latestTimeText = iris.util.getDaySeparatorText(msg.time, msg.time.toLocaleDateString({dateStyle:'short'}));
          latestTimeText = t(latestTimeText);
          if (latestTimeText === t('today')) { latestTimeText = iris.util.formatTime(msg.time); }
          latestEl.text(text);
          latestEl.html(Helpers.highlightEmoji(latestEl.html()));
          if (info.selfAuthored) {
            latestEl.prepend($(seenIndicatorHtml));
            setLatestSeen(pub);
            setLatestCheckmark(pub);
          }
          el.find('.latest-time').text(latestTimeText);
          el.data('latestTime', msg.time);
          sortChatsByLatest();
        }
        if (activeChat === pub) {
          addMessage(msg, pub);
          sortMessagesByTime(); // this is slow if message history is loaded while chat active
          if (chats[pub].latest.time === msg.time && Session.areWeOnline) {
            chats[pub].setMyMsgsLastSeenTime();
          }
          if (pub !== 'public') {
            if (chats[pub].theirLastSeenTime) {
              $('#not-seen-by-them').slideUp();
            } else if (!chats[pub].uuid) {
              $('#not-seen-by-them').slideDown();
            }
          }
          Helpers.scrollToMessageListBottom();
        }
        Notifications.notifyMsg(msg, info, pub);
      });
      Notifications.changeChatUnseenCount(pub, 0);
      chats[pub].messages = chats[pub].messages || [];
      chats[pub].identicon = Helpers.getIdenticon(pub, 49);
      el.prepend($('<div>').addClass('identicon-container').append(chats[pub].identicon));
      chats[pub].onTheir('nickname', (nick) => {
        chats[pub].myNickname = nick;
        $('#profile-nickname-my').text(nick && nick.length ? nick : '');
        $('#profile-nickname-my-container').toggle(!!(nick && nick.length));
      });
      chats[pub].onMy('nickname', (nick) => {
        chats[pub].theirNickname = nick;
        if (pub !== Session.getKey().pub) {
          el.find('.name').text(Helpers.truncateString(Profile.getDisplayName(pub), 20));
        }
        if (pub === activeChat || pub === activeProfile) {
          Profile.addUserToHeader(pub);
        }
      });
      chats[pub].notificationSetting = 'all';
      chats[pub].onMy('notificationSetting', (val) => {
        chats[pub].notificationSetting = val;
        if (pub === activeProfile) {
          $("input[name=notificationPreference][value=" + val + "]").attr('checked', 'checked');
        }
      });
      el.click(() => showChat(pub));
      if (pub !== 'public') {
        $(".chat-list").append(el);
      }
      chats[pub].getTheirMsgsLastSeenTime(time => {
        if (chats[pub]) {
          chats[pub].theirLastSeenTime = new Date(time);
          lastSeenTimeChanged(pub);
        }
      });
      chats[pub].getMyMsgsLastSeenTime(time => {
        chats[pub].myLastSeenTime = new Date(time);
        if (chats[pub].latest && chats[pub].myLastSeenTime >= chats[pub].latest.time) {
          Notifications.changeChatUnseenCount(pub, 0);
        }
        PeerManager.askForPeers(pub); // TODO: this should be done only if we have a chat history or friendship with them
      });
      chats[pub].getTyping(isTyping => {
        if (activeChat === pub) {
          $('#header-content .last-seen').toggle(!isTyping);
          $('#header-content .typing-indicator').toggle(isTyping);
        }
        typingIndicator.toggle(isTyping);
        latestEl.toggle(!isTyping);
      });
      chats[pub].online = {};
      iris.Channel.getOnline(gun, pub, (online) => {
        if (chats[pub]) {
          chats[pub].online = online;
          Profile.setTheirOnlineStatus(pub);
          setDeliveredCheckmarks(pub);
        }
      });
      function setName(name, from) {
        if (chats[pub].uuid) {
          var profile = chats[pub].participantProfiles[from];
          if (profile && !(profile.permissions && profile.permissions.admin)) {
            return;
          }
        }
        if (name && typeof name === 'string') {
          chats[pub].name = name;
        }
        if (pub === Session.getKey().pub) {
          el.find('.name').html("📝 <b>" + t('note_to_self') + "</b>");
        } else {
          el.find('.name').text(Helpers.truncateString(Profile.getDisplayName(pub), 20));
        }
        if (pub === activeChat || pub === activeProfile) {
          Profile.addUserToHeader(pub);
        }
        if (pub === activeProfile) {
          $('#profile-group-name').not(':focus').val(name);
        }
      }
      function setAbout(about) {
        chats[pub].about = about;
        if (activeProfile === pub) {
          $('#profile .profile-about').toggle(about && about.length > 0);
          $('#profile .profile-about-content').text(about);
        }
      }
      function setGroupPhoto(photo, from) {
        var profile = chats[pub].participantProfiles[from];
        if (profile && !(profile.permissions && profile.permissions.admin)) {
          return;
        }
        chats[pub].photo = photo;
        el.find('.identicon-container').empty();
        var img = Helpers.setImgSrc($('<img>'), photo).attr('height', 49).attr('width', 49).css({'border-radius': '50%'});
        el.find('.identicon-container').append(photo ? img : chats[pub].identicon);
        if (pub === activeChat || pub === activeProfile) {
          Profile.addUserToHeader(pub);
        }
        if (pub === activeProfile) {
          Helpers.setImgSrc($('#current-profile-photo'), photo);
          Helpers.setImgSrc($('#profile .profile-photo'), photo);
        }
        $('#current-profile-photo').toggle(!!photo);
      }
      if (chats[pub].uuid) {
        chats[pub].on('name', setName);
        chats[pub].on('about', setAbout);
        chats[pub].on('photo', setGroupPhoto);
        chats[pub].participantProfiles = {};
        chats[pub].onMy('participants', participants => {
          if (typeof participants === 'object') {
            var keys = Object.keys(participants);
            keys.forEach((k, i) => {
              if (chats[pub].participantProfiles[k]) { return; }
              var hue = 360 / Math.max(keys.length, 2) * i; // TODO use css filter brightness
              chats[pub].participantProfiles[k] = {permissions: participants[k], color: `hsl(${hue}, 98%, ${isDarkMode ? 80 : 33}%)`};
              gun.user(k).get('profile').get('name').on(name => {
                chats[pub].participantProfiles[k].name = name;
              });
            });
          }
          if (activeProfile === pub) {
            Profile.renderGroupParticipants(pub);
          }
          if (activeChat === pub) {
            Profile.addUserToHeader(pub);
          }
        });
        var isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      } else {
        gun.user(pub).get('profile').get('name').on(setName);
        gun.user(pub).get('profile').get('about').on(setAbout);
      }
      if (chats[pub].put) {
        chats[pub].onTheir('webPushSubscriptions', (s, k, from) => {
          if (!Array.isArray(s)) { return; }
          chats[pub].webPushSubscriptions = chats[pub].webPushSubscriptions || {};
          chats[pub].webPushSubscriptions[from || pub] = s;
        });
        const arr = Object.values(Notifications.webPushSubscriptions);
        setTimeout(() => chats[pub].put('webPushSubscriptions', arr), 5000);
      }
      chats[pub].onTheir('call', call => VideoCall.onCallMessage(pub, call));
    }
    

export {
    init_user,
    login_user
}