const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
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
    tokens:[{
        access: {
            type: String,
            required: true
        },
        token:{
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.toJSON = function(){
    var user = this;
    var userObject = user.toObject();
    
    return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function(){
    var user = this;
    var access = 'auth';
    var id = user._id.toHexString();
    var token = jwt.sign({_id: id, access}, 'abc123').toString();
    
    user.tokens.push({
        access, token
    });
    
    console.log("Before-TOKEN:",token);
    return user.save().then(()=>{
        console.log("After-TOKEN:",token);
        return token;
    });
};

var User = mongoose.model("User", UserSchema);

module.exports = {
    User
};
