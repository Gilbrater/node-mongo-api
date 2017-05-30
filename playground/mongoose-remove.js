const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todos');

var id = '5928029512de570b32f8b308';

//ID Verification helper
if(ObjectID.isValid(id)){
    console.log('ID is valid');
}

//Removes All
Todo.remove({}).then((res)=>{
    console.log(res);
});

//Find One and Remove
Todo.findOneAndRemove({}).then((todo)=>{
    console.log(res);
});

//Find By Id and Remove
Todo.findByIdAndRemove(id).then((todo)=>{
    console.log(res);
});

