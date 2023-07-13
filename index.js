const { Client, User, Events, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

const dotenv = require('dotenv');
dotenv.config();
const token = process.env.TOKEN;
const dmID = process.env.DISCORD_ID;
const uuid = process.env.UUID;
const apiKey = process.env.API_KEY;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const userID = { "id": dmID };
const user = new User(client, userID);

client.once(Events.ClientReady, () => {
  console.log('Ready!');
});

setInterval(async function() {
  getStatus();
}, 300000);

async function getStatus() {
  try {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://api.hypixel.net/status?uuid='+ uuid + '&key=' + apiKey,
    };
    const json = await axios.request(config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        //console.log(error);
        console.log('error');
      });


      if (json.session.mode != "dynamic") {
        //Direct Message
        user.send('Not on Island')
          .then(message => console.log(`Sent message: ${message.content} @ ${message.createdAt}`))
          .catch(console.error);
    }

  } catch (error) {
    console.log(error)
  }
}

client.login(token);
