const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const brandSchema = new Schema({
  nombre: String,
  fechaAlta: {
    type: String,
    required: true
  },
  fechaBaja: {
    type: String,
    required: false
  },
  dinamicas:[{
    type:Schema.Types.ObjectId,
    ref:"Dinamica"
  }],
  users:[{
    type:Schema.Types.ObjectId,
    ref:"User"
  }],
  marcas: [{
    type:Schema.Types.ObjectId,
    ref:"Marca"
  }],
  activo:{
    type: String,
    enum: ["Activo", "Inactivo"],
    default: "Inactivo"
  }
},{
    timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
    }
  });


  
  
  module.exports = mongoose.model('Brand', brandSchema);
 