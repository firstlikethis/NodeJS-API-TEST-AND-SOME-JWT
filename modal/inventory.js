const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    name_product: { type:String, default:null },
    price: { type:String, default:null },
    description: { type:String, default:null }
})

module.exports = mongoose.model('inventory', inventorySchema);