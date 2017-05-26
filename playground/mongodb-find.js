//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

let obj = new ObjectID();
console.log("ObjectID", obj);


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db)=>{
    if(err){
        return console.log('Unable to connect to mongodb server');
    }
    console.log('Connected to MongoDB server');
    
    db.collection('Todos').find().toArray().then((docs)=>{
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err)=>{
        console.log('Unable to fetch Todos', err);
    });
    
    db.close();
});

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db)=>{
    if(err){
        return console.log('Unable to connect to mongodb server');
    }
    console.log('Connected to MongoDB server');
    
    db.collection('Todos').find({completed:true}).toArray().then((docs)=>{
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err)=>{
        console.log('Unable to fetch Todos', err);
    });
    
    db.close();
});

//FETCHING BY _id
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db)=>{
    if(err){
        return console.log('Unable to connect to mongodb server');
    }
    console.log('Connected to MongoDB server');
    
    db.collection('Todos').find({_id:new ObjectID('')}).toArray().then((docs)=>{
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err)=>{
        console.log('Unable to fetch Todos', err);
    });
    
    db.close();
});

//COUNT
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db)=>{
    if(err){
        return console.log('Unable to connect to mongodb server');
    }
    console.log('Connected to MongoDB server');
    
    db.collection('Todos').find().count().then((count)=>{
        console.log("Count: ", count);
    }, (err)=>{
        console.log('Unable to fetch Todos', err);
    });
    
    db.close();
});