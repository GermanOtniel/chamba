const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const centroSchema = new Schema({
  nombre: String,
  fechaAlta: {
    type: String,
    required: true
  },
  fechaBaja: {
    type: String,
    required: false
  },
  activo:{
    type: String,
    enum: ["Activo", "Inactivo"],
    default: "Inactivo"
  },
  usuarios:[{
    type:Schema.Types.ObjectId,
    ref:"User"
  }],
  brand:{
    type:Schema.Types.ObjectId,
    ref:"Brand"
  },
  zona:{
    type:Schema.Types.ObjectId,
    ref:"Zona"
  }
},{
    timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
    }
  });


  
  
  module.exports = mongoose.model('CentroConsumo', centroSchema);
 
