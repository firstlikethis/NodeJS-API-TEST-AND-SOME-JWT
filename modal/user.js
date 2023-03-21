const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    f_name: { type:String, default:null },
    l_name: { type:String, default:null },
    email: { type:String, default:null },
    password: { type:String, default:null },
    token: { type:String }
})

module.exports = mongoose.model('user', userSchema);