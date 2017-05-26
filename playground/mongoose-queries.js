const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todos');

var id = '5928029512de570b32f8b308';

//ID Verification helper
if(ObjectID.isValid(id)){
    console.log('ID is valid');
}

////Find all todos
//Todo.find().then((todos)=>{
//    console.log(todos);
//}).catch((e)=>console.log(e));

////Find todos using param
Todo.find({_id:id}).then((todos)=>{
    console.log(todos);
}).catch((e)=>console.log(e));

////Find one todo using param
Todo.findOne({_id:id}).then((todos)=>{
    console.log(todos);
}).catch((e)=>console.log(e));

////Find todo strictly by id
Todo.findById(id).then((todos)=>{
    console.log(todos);
}).catch((e)=>console.log(e));