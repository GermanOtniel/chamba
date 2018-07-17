const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const dinamicaSchema = new Schema({
  nombreDinamica: {
    type:String,
    required:true
  },
  descripcion: String,
  imagenPremio:String,
  ganadores:[{
    type:Schema.Types.ObjectId,
    ref:"User"
  }],
  modalidad: {
    type: String,
    enum: ["Ventas", "Puntos","Otro"],
    default: "Otro"
  },
  meta: Number,
  cantidadPuntos:Number,
  tipoConsumo:{
    type: String,
    enum: ["Botella", "Unidad","Otro"],
    default: "Otro"
  },
  fechaInicio:{
    type: String,
    required: true
  },
  fechaFin:{
    type: String,
    required: true
  },
  activa:{
    type: String,
    enum: ["Activa", "Inactiva"],
    default: "Activa"
  },
  status:{
    type: String,
    enum:["Aprobada","Desaprobada"],
    default: "Desaprobada"
  },
  marca:[{
    type: Schema.Types.ObjectId,
    ref:"Marca"
  }],
  ranking:[{
    type: Schema.Types.ObjectId,
    ref:"User"
  }],
  centroConsumo: [{
    type: Schema.Types.ObjectId,
    ref: "CentroConsumo",
  }],
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
