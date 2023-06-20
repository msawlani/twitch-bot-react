import tmi from "tmi.js";

const accessToken = localStorage.getItem("accessToken");

console.log(accessToken);

export const client = new tmi.Client({
  connection: {
    reconnect: true,
  },
  identity: {
    username: process.env.REACT_APP_TWITCH_USER,
    password: "oauth:" + accessToken,
  },
  channels: ["sinsofaninja"],
});

//connecting client to server
client.on("connected", (port, address) => {
  console.log(port);
});
client.connect().catch(console.error);
