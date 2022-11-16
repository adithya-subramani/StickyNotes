const fs = require('fs');
const arr = require('../model/model');
const muser = arr[0];

exports.getUsers= async (req,res)=>{
    try{
        const users=await muser.find({},{_id:0,__v:0});
        console.log(users);
        if(users.length>0){
            return res.status(200).json(users);
        }
        else{
            return res.status(400).json({
                status:"success",
                result:"no data to get"
            });
        }
    }
    catch(err){
        return res.status(404).json({
            status:"fail",
            message:err.message
        })
    }
}

exports.addUser= async (req,res)=>{
    try{        
        const aUser = req.body;
        const newUser = await muser.create(aUser);
        console.log(newUser);
        res.status(201).json({
            status:"success",
            data:{newUser}
        });
    }
    catch(err){
        res.send(404).json({
            status:"fail",
            message:err.message
        })
    }
}
