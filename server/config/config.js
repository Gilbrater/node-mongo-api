var env = process.env.NODE_ENV || 'development';
if(env==='development'){
    process.env.PORT = 3000;
    process.env.MONGODB_URI = `mongodb://${process.env.MDB_U}:${process.env.MDB_P}@ds153501.mlab.com:53501/easyfly`;
}else if(env==='test'){
    process.env.PORT = 3000;
    process.env.MONGODB_URI = "mongodb://localhost:27017/TodoAppTest";
}