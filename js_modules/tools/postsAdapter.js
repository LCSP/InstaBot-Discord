var tPosts = require('./getPosts');

module.exports = {

    getPosts : async function(username, bot){
        //get json data from ig site
        let jsonData = await tPosts.getPostsIG(username, bot);

        let jsonObj;
        //return promise
        return new Promise(function(resolve,reject){
            //check that response from getPosts is not undefined
            if(typeof jsonData !== 'undefined' && jsonData != false){
                //try to parse the json data or reject in case it doesn work with reporting
                try {
                    jsonObj = JSON.parse(jsonData);
                } catch (error) {
                    reject('There was an error :(');
                    bot.channels.get('YOURERRORSCHANNELID').send(`Error with the username: ${username}  with the error: Can't parse json data: ${error}. In postAdapter.js line 18.`);
                }

                //count how many posts there are
                let nItems = Object.keys(jsonObj.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges).length;
                let aItems = [];
                //try to get the information, if there is an error report and give error to bot

                try {
                    for (let index = 0; index < nItems; index++) {
                        var tempArray = [];
                        let short_id = jsonObj.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges[index].node.shortcode;

                        let caption = '';
                        if(jsonObj.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges[index].node.edge_media_to_caption.edges.hasOwnProperty(0)){
                            caption = jsonObj.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges[index].node.edge_media_to_caption.edges[0].node.text;
                        }

                        let timestamp =jsonObj.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges[index].node.taken_at_timestamp;

                        tempArray.push(short_id);
                        tempArray.push(caption);
                        tempArray.push(timestamp);
                        aItems.push(tempArray);
                    }
                    //resolve with array that has every post with short_id/caption/timestamp, structure: array(array(post_info))
                    resolve(aItems);
                } catch (error) {
                    reject('There was an error :(');
                    bot.channels.get('YOURERRORSCHANNELID').send(`Error with the username: ${username}  with the error: Can't get json data: ${error}. In postAdapter.js line 40.`);
                }

                
                //if there is no matches inside of getPosts.js (line 29) the result will be undefined. in that case bot has to respond that the user don't have any post
            }else{
                resolve(false);
            }
        });

    }

}