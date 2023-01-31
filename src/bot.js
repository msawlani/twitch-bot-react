import tmi from "tmi.js";

export const client = new tmi.Client({
  channels: ["SinsofaNinja"],
});

//connecting client to server
client.on("connected", (port, address) => {
  console.log(client);
});
client.connect().catch(console.error);
