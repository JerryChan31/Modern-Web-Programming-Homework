var users = require('../public/javascripts/users');
var serverValidate = {
    isPropertyUnique: function(user, property) {
        for(var i = 0; i < users.userList.length; i++) {
            if (users.userList[i][property] == user[property]) {
                return property;
            }
        }
        return "";
    },
    isUserUnique: function(user) {
        var error = [];
        var uniqueness = [];
        uniqueness.push(this.isPropertyUnique(user, "username"));
        uniqueness.push(this.isPropertyUnique(user, "uid"));
        uniqueness.push(this.isPropertyUnique(user, "phone"));
        uniqueness.push(this.isPropertyUnique(user, "email"));
        for (var i = 0; i < uniqueness.length; i++) {
            if (uniqueness[i] != "") {
                error.push(uniqueness[i]);
            }
        }
        //console.log("error:");
        console.log(error);
        return error;
    },
}
module.exports = serverValidate;