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
 