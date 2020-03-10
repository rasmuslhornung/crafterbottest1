const discord = require('discord.js');

var client = new discord.Client();
const fs = require("fs");
const config = require ('./config.json');




// Rich embed for return !v who command




client.on("ready", () => {
	console.log("ready.");

	client.msgs = require("./msgs.json");
	client.skills = require("./skills.json");


});


const prefix = "!v"
client.on("message", (message) => {


	





	if (message.author.bot) return;

	if (message.content.startsWith(prefix + " hello")) {

		message.reply("Hello!");
	}

//create a map of lowercase keys to mixedcase (actual) key names
const lowercaseToMixedcase = {}; //create the map
Object.keys(client.msgs)
  .forEach(key => lowercaseToMixedcase[key.toLowerCase()] = key); //populate it

if(message.content.startsWith (prefix + " craft")) {
	//load your json here
let data = {}
//user message
let mess = "T8 Leather Hood";
//getting the tier type
let tierType = mess.substr(2);
//getting the tier number in the message
let tierNumberMsg = mess.split("")[1]

for(let k in data)
{
//getting the current tier number
  let tierNumber = k.split(" ")[0].split("")[1]
  if(tierNumber<=tierNumberMsg && k.includes(tierType))
    data[k].push("userId")
}
console.log(data)
    let editedmessage = message.content.slice(prefix.length + 1);
    let lowercaseSkill = message.content.toLowerCase().slice(9); //save the lowercase key. Looks like "t4 plate armor"
    let skill = lowercaseToMixedcase[lowercaseSkill]; //take the lowercase key, and use it to get the actual key name, e.g. "T4 Plate Armor"

    if(!client.msgs[skill]) return message.reply("I cant find that skill"); {
        client.msgs[skill] = [message.author.id]
    }
        if(!client.msgs[skill].includes(message.author.id)) client.msgs[skill].push(message.author.id);
        {

        message.reply("You can now " + editedmessage)
    }
}
	
/* 	if(message.content.startsWith (prefix + " craft")) {
		let editedmessage = message.content.slice(prefix.length + 1);
		let skill = message.content.toLowerCase().slice(9);
	
		if(!client.msgs[skill]) return message.reply("I cant find that skill"); {
			client.msgs[skill] = [message.author.id]
		}
			if(!client.msgs[skill].includes(message.author.id)) client.msgs[skill].push(message.author.id);
			{

			message.reply("You can now " + editedmessage)
		}
	} */


	/* if (message.content.startsWith(prefix + " craft")) {
		editedmessage = message.content.slice(prefix.length + 1);
		skill = message.content.slice(9);

		if (!client.msgs[skill]) client.msgs[skill] = [];
		client.msgs[skill].push(message.author.id);

		message.reply("You can now " + editedmessage)
	} */
	fs.writeFile("./msgs.json", JSON.stringify(client.msgs, null, 4), err => {
		if (err) throw err;

		{

			return console.log(err);
		}

		

	})

	if (message.content.startsWith (prefix + " who")) { 
		let filter = message.content.slice(prefix.length + 5) 
		let item = message.content.slice(7) 
		let _skill = client.msgs[filter]
		if(!_skill) return message.reply('I cant find that skill')
		const whoEmbed = new discord.MessageEmbed() 
			.setColor('#0099ff') 
			.setTitle('These players can craft ' + item) 
			.setAuthor('VINDICTIVE CRAFTER BOT', 'https://i.imgur.com/uz8xDax.jpg') 
			.setDescription(`${_skill.map(user => `<@${user}>`).join('\n')}`) 
			.setFooter('This bot was created by BigTibbies'); 
		message.channel.send(whoEmbed); 

	}

	if (message.content.startsWith (prefix + " items")) { 
		let filter = message.content.slice(prefix.length + 8) 
		let item = message.content.slice(7) 
		let _skill = client.msgs[filter]
		/* if(!_skill) return message.reply('I cant find that skill') */
		const whoEmbed = new discord.MessageEmbed() 
			.setColor('#0099ff') 
			.setTitle('These are the items that you can choose from') 
			.setAuthor('VINDICTIVE CRAFTER BOT', 'https://i.imgur.com/uz8xDax.jpg') 
			.addField(Object.keys(client.skills),  "Remember to define your skill with a tier") 
			.setFooter('This bot was created by BigTibbies'); 
		message.channel.send(whoEmbed); 

	
	
		 
	 }




});

	 client.login (config.token);
	 
