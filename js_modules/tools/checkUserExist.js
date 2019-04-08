var request = require("request");

module.exports = {

    checkUserId : async function(username){
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
                if (err) reject(err);
                if (typeof body === 'undefined') reject('I\'m having problems to check that user... Try again later.');
                //execute regxp in body to only get the user id
                let regUid = new RegExp(/\"id\":\"(.*?)\"\,\"is_business_account/);//"id":"55344323","is_business_account"
                body.match(regUid) ? resolve(true) : resolve(false);
                
            })
        })             

    }

}