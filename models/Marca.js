const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const marcaSchema = new Schema({
  nombre: {
    type:String,
    required:true
  },
  descripcion:{
    type:String,
    required: false
  },
  imagen: String,
  fechaAlta: {
    type: String,
    required: true
  },
  fechaBaja: {
    type: String,
    required: false
  },
  brand:{
    type:Schema.Types.ObjectId,
    ref:"Brand"
  },
  total:{
    type:Number,
    min:0,
    default:0
  }
},{
    timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
    }
  });
  
  module.exports = mongoose.model('Marca', marcaSchema);
 // ES EL MODELO PARA LAS MARCAS QUE LOS BRANDS TENDRAN, LAS MARCAS QUE SE TENDRAN QUE VENDER EN LAS DINAMICAS
 // LAS MARCAS PERTENECEN A UN BRAND, UN BRAND SOLO PODRA VER SUS MARCAS, EXCEPTO EL BRAND DE 1PUNTOCINCO, ESE BRAND PUEDE VERLO TODO