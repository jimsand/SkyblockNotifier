const { Client, User, Events, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

const dotenv = require('dotenv');
dotenv.config();
const token = process.env.TOKEN;
const dmID = process.env.DISCORD_ID;

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
      url: 'https://sky.shiiyu.moe/api/v2/profile/Ianoda/',
    };
    const json = await axios.request(config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });

    for (const i in json) {
      for (const profiles in json[i]) {
        if (json[i][profiles]['current'] === true) {
          if (json[i][profiles]['raw']['current_area'] == "Private Island") {

            //Direct Message
            user.send('Not on Island')
              .then(console.log("Not on Island"))
              .catch(console.error);
          }
        }
      }
    }

  } catch (error) {
    console.log(error)
  }
}

client.login(token);
