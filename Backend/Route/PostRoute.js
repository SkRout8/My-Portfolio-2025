const express=require('express')
const { PostData } = require('../Controller/BackController')
const router=express.Router()

router.post('/Contactdata',PostData)

module.exports=router