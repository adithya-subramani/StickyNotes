const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/stickynotes").then(() => {
  console.log("db connection established...");
});

const noteSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: [true, "Required Field"],
        },
        notetitle: {
            type: String,
            required: [true, "Required Field"],
        },
        notecontent: {
            type: String,
            required: [true, "Required Field"],
        },
        owner: {
            type: String,
            required: [true, "Required Field"],
        }
    },
    { timestamps: true }
);

const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: [true, "Required Field"],
    },
    name : {
        type: String,
        required: [true, "Required Field"],
    },
    username : {
        type: String,
        required: [true, "Required Field"],
    },
    password : {
        type: String,
        required: [true, "Required Field"],
    }
});

module.exports = [userSchema,noteSchema];
