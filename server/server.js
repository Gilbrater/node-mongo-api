require('./config/config');
const _ = require('lodash');
const { ObjectID } = require('mongodb');
var express = require('express');
var bodyParser = require('body-parser');
var { mongoose } = require('./db/mongoose');
var { User } = require('./models/users');
var { Todo } = require('./models/todos');
var { authenticate } = require('./middleware/authenticate');
const bcrypt = require('bcryptjs');


var port = process.env.PORT;
var app = express();

//middleware
app.use(bodyParser.json());
//middleware


//POST /todos
app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }).catch((err) => res.status(400).send());
});

//GET /todos
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({
            todos
        });
    }).catch((err) => res.status(400).send());
});

//GET /todos/12345656
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    var isValidId = ObjectID.isValid(id);

    if (isValidId) {
        Todo.findById(id).then((todo) => {
            if (!todo) {
                return res.status(404).send();
            }
            res.send(todo);
        }).catch((err) => res.status(400).send());
    } else {
        res.status(404).send();
    }
});


//DELETE /todos/:id
app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    var isValid = ObjectID.isValid(id);

    if (isValid) {
        Todo.findByIdAndRemove(id).then((todo) => {
            if (!todo) {
                return res.status(404).send();
            }
            res.send({
                todo
            });
        }).catch((err) => res.status(400).send());
    } else {
        res.status(404).send();
    }
});

//PATCH /todos/:id
app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var isValid = ObjectID.isValid(id);
    var body = _.pick(req.body, ["text", "completed"]);

    if (!isValid) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {
        $set: body
    }, {
            new: true
        }).then((todo) => {
            if (!todo) {
                return res.status(404).send();
            }
            res.send({
                todo
            });
        }).catch((err) => res.status(400).send());
});

//POST /users (Sign Up)
app.post('/users', (req, res) => {
    var body = _.pick(req.body, ["email", "password"]);
    var user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

//POST /users/login {email, password}
app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ["email", "password"]);
    var user = new User(body);

    User.findByCredentials(body.email, body.password).then((user) => {
        user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
        res.status(400).send(e);
    });
});


//GET /users/me
app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

//DELETE /users
app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });
});

//Port Setup
app.listen(port, () => {
    console.log("Started on port: ", port);
});

module.exports = {
    app
};
