import tmi from "tmi.js";

var users = [];
var permit = [];
var shoutOut = true;
var schedule = true;
var dice = true;
var counter = 0;
var messageDeletes = 0;
var linkDeletes = 0;
var mods = true;
var title = true;
var game = true;
var following = true;
var vips = true;
var uptime = true;
var song = true;

export const client = new tmi.Client({
  options: { debug: true },
  connection: {
    reconnect: false,
    secure: true,
    timeout: 180000,
    reconnectDecay: 1.4,
    reconnectInterval: 1000,
  },
  identity: {
    username: process.env.REACT_APP_TWITCH_USER,
    password: process.env.REACT_APP_OAUTH,
  },
  channels: ["SinsofaNinja"],
});

//connecting client to server
client.on("connected", (port, address) => {
  // console.log(client);
});
client.connect().catch(console.error);

client.on("message", (channel, userState, message, self) => {
  // Don't listen to my own messages..
  if (self) return;
  if (userState.username === process.env.TWITCH_USER) return;
  //bools for mod broadcaster and both
  let isMod = userState.mod || userState["user-type"] === "mod";
  let isBroadcaster = userState.username === "sinsofaninja";
  let isModUp = isMod || isBroadcaster;
  let username = userState.username;
  let newMessage = { username, message };
  // console.log("Broadcaster: ", isBroadcaster);
  // console.log("Mod: ", isMod);
  // console.log("Mod Up: ", isModUp);
  if (message.toLowerCase() === "!schedule" && schedule) {
    client.say(
      channel,
      `@${userState.username}, I stream every Saturday & Sunday at 3pm CST / 4pm EST sometimes I do bonus streams on Thursday or Friday.`
    );

    schedule = false;
    setTimeout(function () {
      schedule = true;
      console.log("schedule Done");
    }, 30000);
  }
});
