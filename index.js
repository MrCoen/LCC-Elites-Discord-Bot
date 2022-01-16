// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const axios = require('axios');
const cheerio = require('cheerio');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.on('ready', () => {
	console.log('Ready!');
});

client.once('message', (message) =>{
  const prefix = '/lcc'
  let args = message.content.slice(prefix.length).trim().split(/ +/g);
  

  if(message.content.lowercase() === prefix + 'news'){
    const getPostTitles = async (search) => {
      try {
        const { data } = await axios.get(
          'https://leedscitycollege.ac.uk/news/'
        );
        const $ = cheerio.load(data);
        const postTitles = [];
        const embed = new discord.MessageEmbed()
        .setAuthor(client.user.username)
        $('.event-content > h3').each((_idx, el) => {
          const postTitle = $(el).text()
          embed.addField('headlines', postTitle)
        });

        return message.channel.send(embed);
      } catch (error) {
        throw error;
      }
    };

    getPostTitles()
  }
})

// Login to Discord with your client's token
client.login('OTMyMzM3NzIyMTk3MTc2MzUw.YeRhKg.Y_Q3uQkkR_d4Hk7hMsr8FKfdIPM');