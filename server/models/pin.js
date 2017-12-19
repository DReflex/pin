const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PinSchema = new Schema ({
    desc:String,
    img: String,
    votes:Number,
    who:[],
    creator_id:String,
    creator_img:String,


});
const Pin = mongoose.model('pin', PinSchema);

module.exports = Pin;
