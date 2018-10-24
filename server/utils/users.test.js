const expect = require('expect');

const { Users } = require('./users');

describe('Users', () => {
    let users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Avengers'
        }, 
        {
            id: '2',
            name: 'Jen',
            room: 'DC'
        }, 
        {
            id: '3',
            name: 'Julie',
            room: 'Avengers'
        },]
    });

    it('should add new user', () => {
        let users = new Users();
        let user = {
            id: '123',
            name: 'Michael',
            room: 'Avengers'
        };
        let resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        let userId = '1'
        let removedUser = users.removeUser(userId);
        expect(removedUser.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('should not remove user', () => {
        let userId = '99'
        let removedUser = users.removeUser(userId);
        expect(removedUser).toBeFalsy();
        expect(users.users.length).toBe(3);
    })

    it('should find user', () => {
        let userId = '2';
        let user = users.getUser(userId);

        expect(user.id).toBe(userId);

    })
    it('should not find user', () => {
        let userId = '99';
        let user = users.getUser(userId);

        expect(user).toBeFalsy();
    })


    it('should return names for Avengers', () => {
        let userList = users.getUserList('Avengers');

        expect(userList).toEqual(['Mike', 'Julie'])
    });

    it('should return names for DC', () => {
        let userList = users.getUserList('DC');

        expect(userList).toEqual(['Jen'])
    })
})