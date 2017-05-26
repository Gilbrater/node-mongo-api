const {ObjectID} = require('mongodb');
var express = require('express');
var bodyParser = require('body-parser');
var {mongoose} = require('./db/mongoose');
var {User} = require('./models/users');
var {Todo} = require('./models/todos');


var port = process.env.PORT || 3000;
var app = express();

//middleware
app.use(bodyParser.json());
//middleware


//POST /todos
app.post('/todos', (req,res)=>{
    var todo = new Todo({
        text:req.body.text
    });
    
    todo.save().then((doc)=>{
        res.send(doc);
    },(err)=>{
        res.status(400).send(err);
    });
});

//GET /todos
app.get('/todos', (req,res)=>{
   Todo.find().then((todos)=>{
       res.send({todos});
   }, (err)=>{
       res.status(400).send(err);
   });
});

//GET /todos/12345656
app.get('/todos/:id',(req,res)=>{
    var id = req.params.id;
    
    if(isValidId){
        Todo.findById({_id:id}).then((todo)=>{
            if(!todo){
                return res.status(404).send();
            }
            res.send(todo);
        }).catch((err)=>res.status(400).send());
    }else{
        res.status(404).send();
    }
    
});


//Port Setup
app.listen(port, ()=>{
   console.log("Started on port: ", port); 
});

module.exports = {app};