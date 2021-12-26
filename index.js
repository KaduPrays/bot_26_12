const express = require('express');
const app = express();
app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
});
app.listen(process.env.PORT);

const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

client.on('message', message => {
     if (message.author.bot) return;
     if (message.channel.type == 'dm') return;
     if (!message.content.toLowerCase().startsWith(config.prefix)) return;
     if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;

    const args = message.content
        .trim().slice(config.prefix.length)
        .split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
        const commandFile = require(`./js/${command}.js`)
        commandFile.run(client, message, args);
    } catch (err) {
    console.error('Erro:' + err);
  }
});

client.on("ready", () => {
  console.log(`Bot foi iniciado, com ${client.users.cache.size} usuários, em ${client.channels.cache.size} canais, em ${client.guilds.cache.size} servidores.`); 
  var tabela = [
    {name: 'UltraHostBR ©️ 2021', type: 'LISTENING'},
    {name: 'Meu prefixo: !help', type: 'PLAYING'}
  ];

  function setStatus() {
    var altstatus = tabela[Math.floor(Math.random() * tabela.length)]
    client.user.setActivity(altstatus)
  }
  setStatus();
  setInterval(() => setStatus(), 50000)
});

const cdseconds = 5;

client.login(process.env.TOKEN);