var fileSystem = require('fs');
var userList = []
var users = {
    userList,
    insertUser: function(user) {
        this.userList.push(user);
    },
    findUser: function(username) {
        for (var i = 0; i < this.userList.length; i++) {
            if (this.userList[i].username == username) {
                return i;
            }
        }
        return -1;
    },
    readUser: function() {
        fileSystem.readFile('./public/data/users.json', (err, data) => {
            if (err) throw err;
            if (data.length != 0) {
                this.userList = JSON.parse(data);
            }
            console.log(this.userList);
        });
    },
    writeUser: function() {
        fileSystem.writeFile('./public/data/users.json', JSON.stringify(this.userList), (err) => {
            if (err) throw err;
            console.log(this.userList);
        });
    }
};
module.exports = users;