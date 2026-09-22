const { MongoClient } = require('mongodb')
   let  url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);
let mydb=async ()=>{
    await client.connect();
   let db= client.db("myproject")
    return db;
}
module.exports= mydb;