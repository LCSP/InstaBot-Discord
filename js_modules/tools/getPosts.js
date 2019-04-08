var request = require("request");

module.exports = {

    getPostsIG : async function(username, bot){
        //instagram url to get user id
        let urlUser = "https://www.instagram.com/"+username+"/";
        let opt = {
            url: urlUser,
            headers: {
                'User-Agent' : 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36'
            }
        };
        //return promise
        return new Promise(function(resolve, reject){
            //do async job
            request.get(opt, function(err, resp, body){
                if (err){
                    //if error in request report to bug channels and reject with there was an error
                    reject('There was an error...');
                    bot.channels.get('YOURERRORSCHANNELID').send(`Error with the username: ${username} ; with the error: Request gives an error getting instagram page info. In getPosts.js line 21.`);
                }
                if (typeof body === 'undefined'){
                    reject('I\'m having problems to refresh this user...');
                    bot.channels.get('YOURERRORSCHANNELID').send(`Error with the username: ${username} ; with the error: Request response body was undefined. In getPosts.js line 25.`);
                }
                //execute regxp in body to get the user data
                let regUid = new RegExp(/window._sharedData = (.*?);<\/script>/);//"id":"55344323","is_business_account"
                let matches;
                try {
                    matches = body.match(regUid);
                } catch (error) {
                    reject('I\'m having problems to refresh this user...');
                    bot.channels.get('YOURERRORSCHANNELID').send(`Error with the username: ${username} ; with the error: Can't read property 'match' of undefined. In getPosts.js line 33.`);
                }
                if(typeof matches !== 'undefined' && matches !== null){
                    //console.log(matches);
                    resolve(matches[1]);
                }else{
                    resolve(false);
                }
                
            })
        })             

    }

}