const express = require("express");
const path=require('path')
const _dirname=path.resolve()
const dbconnect = require("./Config/Database");
const router = require("./Route/PostRoute");
const app=express()
const cors=require('cors')
const PORT=process.env.PORT||4000
require('dotenv').config()
app.use(cors({origin:"https://shashikanta-portfolio.vercel.app/", credential:true}))
app.use(express.json())
app.listen(PORT,()=>{
console.log(`App Connected At ${PORT}`)
})
app.get('/',(req,res)=>{
  res.send(`<h1>This is your home page</h1>`)

})
app.use('/api/v1',router)
app.use(express.static(path.join(_dirname,"FrontEndG/dist")))
app.get("*",(req,res)=>{
  res.sendFile(path.resolve(_dirname,"FrontEndG","dist","index.html"))
})
dbconnect()
