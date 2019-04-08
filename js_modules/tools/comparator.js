

module.exports = {

    getNewPosts: async function(posts, lastTS){
        let newPosts = [];

        for(var key in posts){
            if(posts[key][2] != lastTS){
               newPosts.push(posts[key]); 
            }else{
                break;
            }
        }
        return(newPosts);
    }

}