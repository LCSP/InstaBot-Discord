var UC = require('../tools/updateUsers');

module.exports.run = async (message, args, command, bot) => {
    //check if mode is add
    if(args[0] == 'add' && message.author.id == 'USERID' || args[0] == 'add' && message.author.id == 'USERID'){
        //try to add it
        let response = await UC.addUser(args[1], message, bot).catch((err) =>{message.channel.send(err); return;});
        if(response == 'done'){
            //if it was added to the remote json we refresh our memory json
            //userJson.botUsers[args[1]] = {'channel' : message.channel.id, 'lastPost' : ''};
            //console.log(userJson);
            //added
            message.channel.send('The user and channel has been added.');
            return;
        }else if(response != '1' && typeof response !== "undefined"){
            //error and report to channel
            message.channel.send('There was an error :(');
            bot.channels.get('YOURERRORSCHANNELID').send(`Error in channel ${message.channel.name} with the username: ${args[1]} with the error: PHP doesn't not respond what it should: "${response}". In admin.js line 16`);
            return;
        }
    }
    //check if mode is delete
    if(args[0] == 'delete' && message.author.id == 'USERID' || args[0] == 'delete' && message.author.id == 'USERID'){
        //try to delete it
        let response = await UC.delUser(args[1], message, bot).catch((err)=>{message.channel.send(err); return;});
        if(response == 'done'){
            //deleted
            message.channel.send('The user was removed succesfully.');
        }else if(response != '2' && typeof response !== "undefined"){
            //error and report to channel
            message.channel.send('There was an error :(');
            bot.channels.get('YOURERRORSCHANNELID').send(`Error in channel ${message.channel.name} with the username: ${args[1]} with the error: PHP doesn't not respond what it should. In admin.js line 28.`);
            return;
        }
    }
    
}

module.exports.help = {
    name: 'admin',
    help: 'admin add|delete igName'
}