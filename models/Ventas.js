const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const ventasSchema = new Schema({
  cantidad: {
    type:Number,
    required:true
  },
  brand:{
    type: Schema.Types.ObjectId,
    ref: "Brand"
  },
  dinamica:{
    type: Schema.Types.ObjectId,
    ref: "Dinamica"
  },
  user:{
    type: Schema.Types.ObjectId,
    ref: "User"
  }
},{
    timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
    }
  });


  
  
  module.exports = mongoose.model('Ventas', ventasSchema);
 