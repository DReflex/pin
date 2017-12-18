const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema ({
    desc:String,
    img: String,
    votes:Number,
    who:[
          {
            type:String,
            unique:true
          }
        ],
    creator_id:String,
    creator_img:String,


});
const Pin = mongoose.model('pin', TodoSchema);

module.exports = Pin;
