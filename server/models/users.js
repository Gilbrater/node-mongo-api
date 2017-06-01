const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} not a valid email'
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var id = user._id.toHexString();
    var token = jwt.sign({ _id: id, access }, 'abc123').toString();

    user.tokens.push({
        access, token
    });

    return user.save().then(() => {
        return token;
    });
};

UserSchema.methods.removeToken = function(token){
    var user = this;

    return user.update({
        $pull:{
            tokens:{
                token:token
            }
        }
    });
}

UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;
    try {
        decoded = jwt.verify(token, 'abc123');
    } catch (error) {
        return Promise.reject();
    }

    return User.findOne({
        _id: decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

UserSchema.statics.findByCredentials = function (email, password) {
    var User = this;
    return User.findOne({ email }).then((user) => {
        if (!user) {
            return Promise.reject("User doesn't exist");
        }
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, value) => {
                if (!value) {
                    reject("Incorrect password");
                }
                resolve(user);
            });
        });

    });
};

UserSchema.pre('save', function (next) {
    var user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) {
                    throw new Error("ERROR", err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
})

var User = mongoose.model("User", UserSchema);

module.exports = {
    User
};
