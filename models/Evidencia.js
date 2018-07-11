const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const evidenciaSchema = new Schema({
  mensaje: String,
  archivo: String,
  status:{
    type: String,
    enum:["Aprobada","Desaprobada"],
    default: "Desaprobada"
  },
  creador:{
    type:Schema.Types.ObjectId,
    ref:"User"
  },
  dinamica:{
    type:Schema.Types.ObjectId,
    ref:"Dinamica"
  }
},{
    timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
    }
  });


  
  
  module.exports = mongoose.model('Evidencia', evidenciaSchema);
 