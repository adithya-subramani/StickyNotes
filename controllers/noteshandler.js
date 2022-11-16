const fs = require('fs');
const arr = require('../model/model');
const mnote = arr[1];

exports.addNote = async(req,res)=>{
    try{
        const aNote = req.body;
        const newNote = await mnote.create(aNote);
        console.log(newNote);
        res.status(201).json({
            status:"success",
            data:{newNote}
        });
    }
    catch(err){
        res.send(404).json({
            status:"fail",
            message:err.message
        })
    }
}

exports.getNotes= async (req,res)=>{
    try{
        const Notes=await mnote.find({owner:req.params.un},{_id:0,__v:0});
        console.log(Notes);
        return res.status(200).json(Notes);
    }
    catch(err){
        return res.status(404).json({
            status:"fail",
            message:err.message
        })
    }
}

exports.updateNote=async (req,res)=>{
    console.log(3);
    try{
        console.log(req.body);
        console.log(req.params.id);

        const uNote=await mnote.findOneAndUpdate({id:req.params.id},
            req.body,{
            new:true,
            runValidators:true,
        });

        if(uNote!=null){
            res.status(200).json({
                status:"success",
                result:uNote.length,
                data:{uNote}
            });
        }
        else{
            res.status(400).json({
                status:"success",
                result:"no Note available with the id to update"
            });
        }
    }
    catch(err){
        res.status(404).json({
            status:"fail",
            message:err.message
        })
    }
}

exports.deleteNote=async (req,res)=>{
    try{
        console.log(req.body);
        console.log(req.params.id);
        const uNote=await mnote.findOneAndDelete({id:req.params.id});

        if(uNote!=null){
            res.status(200).json({
                status:"success",
                result:uNote.length,
                data:{uNote}
            });
        }
        else{
            res.status(400).json({
                status:"success",
                result:"no Note available with the id to delete"
            });
        }
    }
    catch(err){
        res.status(404).json({
            status:"fail",
            message:err.message
        })
    }
}