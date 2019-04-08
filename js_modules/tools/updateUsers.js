var toolsUE = require('./checkUserExist');
var TPosts = require('../tools/postsAdapter');
var request = require("request");



module.exports = {

    addUser : async function(username, message, bot){
        //check if user exist on instagram
        let uExist = await toolsUE.checkUserId(username);
        //get lastPosts
        let lastPost = await TPosts.getPosts(username, bot, message);
        
        //declare variable of time stamp of last post
        let TSlastPost = '';
        //return promise
        return new Promise(function(resolve, reject){
            if(!uExist){
                reject('User does not exist');
                return;
            }
            //check that there is posts
            if(typeof lastPost === 'undefined' || lastPost == false || lastPost.length == 0){
                //if lastspost becomes undefineed reject the promise
                message.channel.send(username+' Doesn\'t have any post... Adding to database.');
            }else{
                //set timestamp of the last post
                TSlastPost = lastPost[0][2];
            }

            //add it to the json file with php (json file because I'm not using a db)
            let opt = {
                url: `/PHP/userscontrol.php?mode=1&user=${username}&channel=${message.channel.id}&lastpost=${TSlastPost}`,
            };
            //make request to php using post
            request.post(opt, function(err, resp, body){
                if(err){
                    bot.channels.get('YOURERRORSCHANNELID').send(`Error in channel ${message.channel.id} with the username: ${userName} and the error: ${err} in updateUsers.js line 25.`);
                    reject('There was an error :(');
                }
                if(body == 'done'){
                    resolve(body);
                }else{
                    reject('User already on Database!');
                }
            })
        })

    },

    delUser : async function(username, message, bot){
        return new Promise(function(resolve, reject){
        //delete the user from the json file using php since I'm not using a db
            let opt = {
                url: `/PHP/userscontrol.php?mode=2&user=${username}`,
            };
            //make the request to php using post
            request.post(opt, function(err, resp, body){
                if(err){
                    bot.channels.get('YOURERRORSCHANNELID').send(`Error in channel ${message.channel.id} with the username: ${userName} and the error: ${err} in updateUsers.js line 47.`);
                    reject('There was an error :(');
                }
                if(body == 'done'){
                    resolve(body);
                }else{
                    reject('User doesn\'t exist in Database!');
                }
            })
        })
    },

    tsUser : async function(username, bot, ts){
        return new Promise(function(resolve, reject){
            //delete the user from the json file using php since I'm not using a db
                let opt = {
                    url: `/PHP/userscontrol.php?mode=3&user=${username}&ts=${ts}`,
                };
                //make the request to php using post
                request.post(opt, function(err, resp, body){
                    if(err){
                        bot.channels.get('YOURERRORSCHANNELID').send(`Error with the username: ${username} and the error: ${err} in updateUsers.js line 81.`);
                        //reject('There was an error :(');
                    }
                    if(body == 'done'){
                        resolve(true);
                    }else{
                        bot.channels.get('YOURERRORSCHANNELID').send(`Error in channel ${message.channel.id} with the username: ${username} and the error: PHP dosn't executed as expected in updateUsers.js line 87.`);
                        //reject('User doesn\'t exist in Database!');
                    }
                })
            })
    }

}