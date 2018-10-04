const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const paisSchema = new Schema({
  nombre: String,
  estados:[{
    type:Schema.Types.ObjectId,
    ref:"Estado"
  }]
},{
    timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
    }
  });
  
  module.exports = mongoose.model('Pais', paisSchema);
// UN ESTADO DEBE PERTENECER A UN PAIS 
