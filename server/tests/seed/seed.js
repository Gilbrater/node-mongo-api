const { ObjectID } = require('mongodb');
const { Todo } = require('./../../models/todos');
const { User } = require('./../../models/users');
const jwt = require('jsonwebtoken');


const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const todos = [{
    _id: new ObjectID(),
    text: "first todo",
    _creator:userOneId
}, {
    _id: new ObjectID(),
    text: "second todo",
    completed: true,
    completedAt: 333,
    _creator:userTwoId
}];

const users = [{
    _id: userOneId,
    email: 'max@example.com',
    password: 'userOnePass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({ _id: userOneId, access: 'auth' }, process.env.JWT_SECRET).toString()
    }]
}, {
    _id: userTwoId,
    email: 'crap@example.com',
    password: 'userOnePass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({ _id: userTwoId, access: 'auth' }, process.env.JWT_SECRET).toString()
    }]
}];

const populateTodos = (done) => {
    Todo.remove({}).then((doc) => {
        return Todo.insertMany(todos);
    }).then(() => {
        done();
    }).catch(err => {
        done(err);
    });
};

const populateUsers = (done) => {
    User.remove({}).then(() => {
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo]);
    }).then(()=>done());
};

module.exports = {
    todos, populateTodos, users, populateUsers
};