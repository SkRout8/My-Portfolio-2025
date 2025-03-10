const express = require("express");
const dbconnect = require("./Config/Database");
const router = require("./Route/PostRoute");
const app=express()
const cors=require('cors')
const PORT=process.env.PORT||4000
require('dotenv').config()
app.use(cors({origin:"http://localhost:3000", credential:true}))
app.use(express.json())
app.listen(PORT,()=>{
console.log(`App Connected At ${PORT}`)
})
app.get('/',(req,res)=>{
  res.send(`<h1>This is your home page</h1>`)

})
app.use('/api/v1',router)
dbconnect()