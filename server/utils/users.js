[{
    id:'742938reue9ddjcdesf283',
    name: 'Michael',
    room: 'Avengers'
}]

// addUser(id, name, room)
// removeUser(id);
// getUser(id);
// getUserList(room);


class Users {
    constructor() {
        this.users = [];
    }

    addUser (id, name, room) {
        let user = {id, name, room};
        this.users.push(user);
        return user;
    }
    removeUser(id) {
        let selectedUser = this.getUser(id);

        if(selectedUser) {
            this.users = this.users.filter((user) => user.id !== id);
        }

        return selectedUser;
    }
    getUser(id){
        return this.users.filter((user) => user.id === id)[0];
    }
    getUserList(room){
        let users = this.users.filter((user) => user.room === room);
        let namesArray = users.map((user) => user.name);

        return namesArray;
    }
}

module.exports = { Users }