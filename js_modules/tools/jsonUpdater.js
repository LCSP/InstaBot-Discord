var request = require("request");

module.exports = {

    getNewJson : async function(bot){
        //url from json of users
        let urlUsers = "/PHP/channelList.json";
        let opt = {
            url: urlUsers,
            headers: {
                'User-Agent' : 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36'
            }
        };
        //return promise
        return new Promise(function(resolve, reject){
            //do async job
            request.get(opt, function(err, resp, body){
                if (err){
                    bot.channels.get('YOURERRORSCHANNELID').send(`Error in request "${err}". In jsonUpdater.js line 19`);
                    reject('I\'m having problems to get the list of users. I\'ll try again later');
                }
                if (typeof body === 'undefined') reject('I\'m having problems to get the list of users. I\'ll try again later');
                //resolve with json
                resolve(body);
                
            })
        })             

    }

}