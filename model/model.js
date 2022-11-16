const mongoose = require('mongoose');
const schema = require('./schema');

const muser=mongoose.model("myusers",schema[0]);
const mnote=mongoose.model("allnotes",schema[1]);
module.exports= [muser,mnote];