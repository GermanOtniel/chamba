const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const dinamicaSchema = new Schema({
  nombreDinamica: {
    type:String,
    required:true
  },
  descripcion: String,
  imagenPremio:String,
  ganador: Boolean,
  puntos:Number,
  ventas:[],
  marcaPuntosVentas:[{
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
    puntosUsuario:{
      type: Number,
      default: 0,
      min:0
    }
  }],
  ventasTotales:{
    type:Number,
    default:0,
    min:0
  },
  fechaInicio:{
    type: String,
    required: true
  },
  fechaFin:{
    type: String,
    required: true
  },
  modalidad: {
    type: String,
    enum: ["Ventas", "Puntos","Otro"],
    default: "Otro"
  },
  activa:{
    type: String,
    enum: ["Activa", "Inactiva"],
    default: "Activa"
  },
  status:{
    type: String,
    enum:["Aprobada","Desaprobada","Pendiente"],
    default: "Pendiente"
  },
  marcas:[{
    type: Schema.Types.ObjectId,
    ref:"Marca"
  }],
  ranking:[{
    type: Schema.Types.ObjectId,
    ref:"User"
  }],
  ganadores:[{
    type:Schema.Types.ObjectId,
    ref:"User"
  }],
  centroConsumo: [{
    type: Schema.Types.ObjectId,
    ref: "CentroConsumo",
  }],
  zona:{
    type: Schema.Types.ObjectId,
    ref:"Zona"
  },
  brand:{
    type:Schema.Types.ObjectId,
    ref: "Brand"
  },
  evidencias:[{
    type:Schema.Types.ObjectId,
    ref: "Evidencia"
  }]
},{
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });


  module.exports  = mongoose.model('Dinamica', dinamicaSchema);
