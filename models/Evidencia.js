const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const evidenciaSchema = new Schema({
  fecha:String,
  mensaje: String,
  archivo: String,
  cantidadProducto: Number,
  modalidad:{
    type: String,
    enum:["Puntos","Ventas","S/M"],
    default: "S/M"
  },
  total:{
    type:Number,
    default:0,
    min:0
  },
  status:{
    type: String,
    enum:["Aprobada","Desaprobada","Pendiente"],
    default: "Pendiente"
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
    },
    puntosUsuario:{
      type: Number,
      default: 0,
      min:0,
      required: true
    },
    id:{
      type: String,
      required: false
    }
  }],
  creador:{
    type:Schema.Types.ObjectId,
    ref:"User"
  },
  dinamica:{
    type:Schema.Types.ObjectId,
    ref:"Dinamica"
  },
  brand:{
    type:Schema.Types.ObjectId,
    ref:"Brand"
  },
  notas:[{
    type:Schema.Types.ObjectId,
    ref:"Nota"
  }]
},{
    timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
    }
  });
  
  module.exports = mongoose.model('Evidencia', evidenciaSchema);
// FORMA PARTE IMPORTANTE DE NUESTRO PROYECTO, SIN EVIDENCIAS NO HAY DINAMICAS, NO HAY VENTAS Y NO HAY NADA.
// LAS EVIDENCIAS TIENEN RELACION CON EL USUARIO QUE LOS CREO, LA DINAMICA A LA QUE PERTENECEN Y EL BRAND QUE CREO LA DINAMICA.
// LAS EVIDENCIAS CUENTAN CON FOTO DEL TICKET, SOLO SI LA DINAMICA A LA QUE PERTENECE REQUERIA FOTO
// EL ATRIBUTO DE FECHA QUE ES STRING ES PARA TRAER LAS EVIDENCIAS CONFORME A LA FECHA DENTRO DEL REPORTE DE VENTA EN EL DASHBOARD  