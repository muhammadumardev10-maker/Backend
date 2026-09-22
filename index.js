let express=require("express")
let app =express();
const dbconnection = require("./dbconnection");
const { ObjectId } = require("mongodb");
app.use(express.json())



app.post("/student-insert",async(req,res)=>{
    let mydb = await dbconnection();
    let stcoll=mydb.collection("student")
    let {name,email}=req.body;
    let obj = {name,email}
    let insertres= await stcoll.insertOne(obj)
        let resobj = {
            status:1,
            message:"data insert",
            insertres
        }
        res.send(resobj)
})
app.get("/student-read",async(req,res)=>{
    let mydb=await dbconnection();
    let stcoll=mydb.collection("student")
    let data = await stcoll.find().toArray();
    let resobj = {
            status:1,
            message:"data insert",
            data
        }
        res.send(resobj)
})
app.delete("/student-delete/:id",async(req,res)=>{
   try{ let{id}=req.params;
    let mydb=await dbconnection();
    let stcoll=mydb.collection("student")
    let delres =await stcoll.deleteOne({_id:new ObjectId(id)})
    let resobj = {
            status:1,
            message:"data delete",
            delres
        };
        res.send(resobj)
    } catch(err){
        console.error(err);
        res.status(500).send({status :0, message: err.message});
    }
})
app.put("/student-update/:id",async(req,res)=>{
  try{ let {id}=req.params;
    let mydb=await dbconnection();
    let {name,email}=req.body
    let obj={name,email}

    let stcoll=mydb.collection("student")
    let updateres= await stcoll.updateOne({_id:new ObjectId(id)},{$set:{name,email}})
let resobj = {
            status:1,
            message:"data update",
            updateres
}
            res.send(resobj)}
            catch(err){
        console.error(err);
        res.status(500).send({status :0, message: err.message});
    }

})
app.listen("8005")
