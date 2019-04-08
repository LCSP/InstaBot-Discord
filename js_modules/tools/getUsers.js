var request = require('sync-request');

module.exports = {

    getUsers : function(){
        var usersOBJ = request('GET', '/PHP/channelList.json');
        var userJson = usersOBJ.getBody('utf8');
        return userJson;
    }

}


