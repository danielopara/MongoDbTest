const express = require('express')
// const { router } = require('../../app')
const router = express.Router()
const User = require("../model/userModel")
const mongoose = require('mongoose')

router.get('/', (req, res, next)=>{
    res.status(200).json({
        message: "Get users"
    })
})

router.post('/', (req, res, next)=>{
    
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name : req.body.name,
        email : req.body.email
    })
    user.save().then(result=>{
        console.log(result)
    }).catch(err=>{
        console.log(err)
    });
    res.status(201).json({
        message: "Post users",
        createdUser : user
    })
})

router.get('/:userId', (req, res, next)=>{
   const id = req.params.userId;
   if(id === 'special'){
    res.status(200).json({
        message : 'You are special',
        id: id
    })
   } else {
    res.status(200).json({
        message : "here is your id",
        id : id
    })
   }
})

router.patch('/:userId', (req, res, next)=>{
   res.status(200).json({
    message : 'updated'
   })
 })

router.delete('/:userId', (req, res, next)=>{
     res.status(200).json({
     message : 'Deleted'
    })
  })

module.exports = router;