const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const zonaSchema = new Schema({
  nombre: String,
  centros:[{
    type:Schema.Types.ObjectId,
    ref:"CentroConsumo"
  }],
  estado:{
    type:Schema.Types.ObjectId,
    ref:"Estado"
  }
},{
    timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
    }
  });
  
  module.exports = mongoose.model('Zona', zonaSchema);
// UN CENTRO DE CONSUMO DEBE DE PERTENECER A UNA ZONA ES POR ESO QUE SE CREO ESTE MODELO 
// PARA PODER TENER UNA AGRUPACION MAS ESTRATEGICA Y GEOGRAFICA DE LOS CENTROS DE CONSUMO 
