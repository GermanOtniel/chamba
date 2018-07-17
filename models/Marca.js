const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const marcaSchema = new Schema({
  nombre: {
    type:String,
  required:true
  },
  tipoDestilado:String,
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
  }
},{
    timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
    }
  });


  
  
  module.exports = mongoose.model('Marca', marcaSchema);
 