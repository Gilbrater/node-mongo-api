const {MongoClient} = require("mongodb");

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
    if(err){
        return console.log("Unable to connected to MongoDB server");
    }
    console.log('Connected to MongoDB server');
    
//    //deleteMany
//    db.collection('Todos').deleteMany({text: 'eat dinner'}).then((result)=>{
//        console.log("Result: ", JSON.stringify(result, undefined, 2));
//    }, (err)=>{
//        console.log('Error: ',err);
//    });
    
    
//    //deleteOne
//     db.collection('Todos').deleteOne({text: 'eat dinner'}).then((result)=>{
//        console.log("Result: ", JSON.stringify(result, undefined, 2));
//    }, (err)=>{
//        console.log('Error: ',err);
//    });
//    
    
    //findOneAndDelete
    db.collection('Todos').findOneAndDelete({completed: false}).then((result)=>{
        console.log("Result: ", JSON.stringify(result, undefined, 2));
    }, (err)=>{
        console.log('Error: ',err);
    });
    
    db.close();
});