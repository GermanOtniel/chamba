const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const puntosSchema = new Schema({
  cantidad: {
    type:Number,
    required:true
  },
  marca:{
    type: Schema.Types.ObjectId,
    ref: "Marca"
  },
  dinamica:{
    type: Schema.Types.ObjectId,
    ref: "Dinamica"
  }
},{
    timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
    }
  });


  
  
  module.exports = mongoose.model('Puntos', puntosSchema);
 