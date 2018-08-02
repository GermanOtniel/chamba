const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const ventasSchema = new Schema({
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
  },
  status:{
    type: String,
    enum:["Canjeada","No Canjeada"],
    default: "No Canjeada"
  },
  marcas:[{
    ref: { 
      type:Schema.Types.ObjectId, 
      ref:"Marca"
    },
    puntosVentas:{
      type: Number,
      default: 0,
      min:0,
      required: true
    },
    ventas:{
      type:Number,
      default: 0,
      min: 0,
      required: true
    }
  }],
  total:{
    type:Number,
    default: 0,
    min: 0,
    required: true
  }
},{
    timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
    }
  });


  
  
  module.exports = mongoose.model('Ventas', ventasSchema);
 