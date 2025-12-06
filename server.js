const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
require('dotenv').config();
  

const app= express();
app.use(cors())
app.use(express.json());


const Todo = mongoose.model("Todo", new mongoose.Schema({text:String}));

app.get('/todos', async(req, res)=>{
    const todos = await Todo.find();
    res.send(todos)
});
app.post('/todos', async(req,res)=>{
    const todo = new Todo({text: req.body.text});
    await todo.save();
    res.send(todo);

})
app.delete('/todos/:id', async(req,res)=>{
    await Todo.findByIdAndDelete(req.params.id);
    res.send({message:"deleted"})
})

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("mongodb connected");
    app.listen(5000,()=>console.log("sever running on port 5000"))
})
.catch(err =>console.log(err))