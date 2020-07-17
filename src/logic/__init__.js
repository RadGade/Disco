import '../lib/gun'
import '../lib/rindexed'
import '../lib/radix'
import '../lib/radisk'
import '../lib/sea'
import '../lib/store'
import '../lib/webrtc'
var peerList = [
    "https://gunjs.herokuapp.com/gun",
    "https://www.raygun.live/gun",
    "https://e2eec.herokuapp.com/gun",
    "http://gun-matrix.herokuapp.com/gun",
    "https://dletta.rig.airfaas.com/gun",
  ];
  Gun.log.off = true;
var gunOpts = {  peers: peerList, localStorage: false, retry:Infinity };

  gunOpts.store = RindexedDB(gunOpts);

var gun = new Gun(gunOpts);

window.Gun = Gun

export default gun;