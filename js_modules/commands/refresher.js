var TPosts = require('../tools/postsAdapter');
var TComparator = require('../tools/comparator');
var TJson = require('../tools/jsonUpdater');
var tUUser = require('../tools/updateUsers');


module.exports.run = async (bot) => {

    let newData = await TJson.getNewJson(bot).catch((error)=>{
        bot.channels.get('YOURERRORSCHANNELID').send(`Error: couln't get new json. In refresher.js line 10`);
        return;
    });
    let userJson = JSON.parse(newData);
    for(var key in userJson.botUsers){
        //save values of the user
        let username = key; //ig name
        let channel = userJson.botUsers[key].channel; //discord channel
        let lastTS = userJson.botUsers[key].lastPost; //last post timestamp

        let posts = await TPosts.getPosts(username, bot).catch((error)=>{bot.channels.get(channel).send(error); return;});
        if(posts != false){
            let tab = await TComparator.getNewPosts(posts, lastTS);
            if(tab.length != 0){
                let TSupdated = await tUUser.tsUser(username,'',bot,tab[0][2]);
            }
            tab.forEach(element => {
                let link = 'https://www.instagram.com/p/' + element[0] + '/';
                let title = element[1].substring(0,100) + '...';
                bot.channels.get(channel).send({embed: {
                    color: 0x00E626,
                    description: title,
                    title: 'New post from: ' + username + '!',
                    url: link
                  }});
                bot.channels.get(channel).send(link);
            });
        }

    }

}

module.exports.help = {
    name: 'refresher',
    help: 'refresher'
}