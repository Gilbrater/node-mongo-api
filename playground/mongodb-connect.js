//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

let obj = new ObjectID();
console.log("ObjectID", objectID);

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db)=>{
    if(err){
        return console.log('Unable to connect to mongodb server');
    }
    console.log('Connected to MongoDB server');
    
    db.collection('Todos').insertOne({
        text: "something to do",
        completed: false
    }, (err, result)=>{
        if(err){
            return console.log("Unable to insert todo",err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });
    
    db.close();
});

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db)=>{
    if(err){
        return console.log('Unable to connect to mongodb server');
    }
    console.log('Connected to MongoDB server');
    
    db.collection('Users').insertOne({name:"Gilbert Isu", age:2, location:"Lagos"}, (err, result)=>{
        if(err){
            return console.log("Couldn't update data", err);
        }
        console.log("Successfully updated data", JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
    })
    db.close();
});