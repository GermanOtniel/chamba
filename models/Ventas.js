const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const ventasSchema = new Schema({
  brand:{
    type: Schema.Types.ObjectId,
    ref: "Brand"
  },
  dinamica:{
    type: Schema.Types.ObjectId,
    ref: "Dinamica"
  },
  user:{
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  status:{
    type: String,
    enum:["Canjeada","No Canjeada"],
    default: "No Canjeada"
  },
  marcas:[{
    ref: { 
      type:Schema.Types.ObjectId, 
      ref:"Marca"
    },
    puntosVentas:{
      type: Number,
      default: 0,
      min:0,
      required: true
    },
    ventas:{
      type:Number,
      default: 0,
      min: 0,
      required: true
    }
  }],
  total:{
    type:Number,
    default: 0,
    min: 0,
    required: true
  }
},{
    timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
    }
  });
  
  module.exports = mongoose.model('Ventas', ventasSchema);
 // ESTOS OBJETOS SE CREAN A PARTIR DE UNA EVIDENCIA APROBADA CON MODALIDAD VENTAS, 
 // EN SI SUPONGO QUE NO PRECISAMENTE TENDRIAN QUE CREARSE, BIEN PODRIAMOS TOMAR LAS 
 // EVIDENCIAS DE ESTE TIPO DE VENTAS Y A PARTIR DE AHI HACER TODA LA LOGICA, PERO HASTA 
 // AHORITA HA ESTADO FUNCIONANDO Y NO HAY NECESIDAD DE CAMBIAR ESTE FUNCIONAMIENTO