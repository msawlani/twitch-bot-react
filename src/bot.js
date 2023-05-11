import tmi from "tmi.js";

export const client = new tmi.Client({
  connection: {
    reconnect: true,
  },
  identity: {
    username: process.env.REACT_APP_TWITCH_USER,
    password: process.env.REACT_APP_STREAMER_OAUTH,
  },
  channels: ["sinsofaninja"],
});

//connecting client to server
client.on("connected", (port, address) => {
  console.log(client);
});
client.connect().catch(console.error);
