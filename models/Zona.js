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
 
