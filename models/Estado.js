const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const estadoSchema = new Schema({
  nombre: String,
  zonas:[{
    type:Schema.Types.ObjectId,
    ref:"Zona"
  }],
  pais:{
    type: Schema.Types.ObjectId,
    ref:"Pais"
  }
},{
    timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
    }
  });
  
  module.exports = mongoose.model('Estado', estadoSchema);
// UNA ZONA DEBE PERTENECER A UN ESTADO, POR ESO SE CREO ESTE MODELO, PARA TENER UN OREN GEOGRAFICO PARA MAS ADELANTE
