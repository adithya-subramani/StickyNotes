const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_ATLAS_URI).then(() => {
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
