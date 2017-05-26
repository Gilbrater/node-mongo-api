const {MongoClient, ObjectID} = require("mongodb");

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
    if(err){
        return console.log("Unable to connected to MongoDB server");
    }
    console.log('Connected to MongoDB server');
    
    //findOneAndUpdate
    db.collection('Todos').findOneAndUpdate({_id:new ObjectID('5926c52c32deae050112471b')}, 
                                           {
                                               $set:{completed:false}
                                           },{returnOriginal:false}).then((result)=>{
                                               console.log(result);
                                           });
    db.collection("Users").findOneAndUpdate(
        {
            name: "Gilbert Isu"
        },{
            $inc:{
                age:20
            }
        },{
            returnOriginal: false
          }).then((result)=>{
        console.log(result);
    });
    db.close();
});