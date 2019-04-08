const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
var userObj = require('./js_modules/tools/getUsers');
var refresher = require('./js_modules/commands/refresher');


//create bot commands collection
bot.commands = new Discord.Collection;

//get commands files
fs.readdir('./js_modules/commands/', (err, files) =>{
    if(err) return console.error(err);
    //this line only selects .js files, and adds them to command_files
    let command_files = files.filter(f => f.includes('.js'));
    for(let cmd of command_files){
        let props = require(`./js_modules/commands/${cmd}`);
        try{
            bot.commands.set(props.help.name, props);
        }catch(error){
            console.log('Error adding commands, file doesn\'t have name or help properties');
            process.exit(1);
        }
    }
});

//get users
//var usersJson = JSON.parse(userObj.getUsers());

//login bot
bot.login('YOURDISCORDTOKEN');


//set configs when bot is ready
bot.on('ready', function(){
    //set bot prefix
    bot.prefix = '!';
    //set bot unknown message
    bot.unknown_command_message = 'false';
    //show in console that the bot is ready
    console.log('Bot is ready!');
    //start refresher
    setInterval(function(){
        refresher.run(bot);
    },3600000);
});

//bot sees a message
bot.on('message', async(message) => {
    //this is so the bot cant message itself
    if(message.author.bot === true) return;
    //this makes the bot respond to not respond to anyone expect me
    if(message.channel.type !== 'text' && message.author.id !== 'YOURUSERID'){
        return message.channel.send('My owner said that I shouln\'t talk to strangers.');
    }

    //example command !hello world how are you
    //this gets the commands arguments, wich would be: world how are you
    let messageArguments = message.content.slice(bot.prefix.length).split(' ');
    messageArguments.shift(); //this shift removes the first ork in the command

    //this gets the comand: wich would be: hello
    let command = message.content.slice(bot.prefix.length).split(' ').shift();

    //this checks if the command is actualy a command
    let cmdFunction = bot.commands.get(command);

    //this checks if the command starts ith the correct prefix
    if(message.content.startsWith(bot.prefix)){
        //this checks if cmdFunction is a real function
        if(cmdFunction){
            //this runs that function, if 'command' is an actual command
            cmdFunction.run(message, messageArguments, command, bot);

        }else if(bot.unknown_command_message == 'true'){//this checks if the bots needs a unknonw command
            message.channel.send('Unknon command!');
        }
    }

});