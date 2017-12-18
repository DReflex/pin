const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    id: {
      type:String,
      unique:true,
      required:true,
    },
    name:String,
    img: String,
    creations:[String],

});
const User = mongoose.model('user', UserSchema);

// User.create({id: 1, name: 'Minion'}, function(err, doc) {
//     // At this point the jobs collection is created.
// });

module.exports = User;
