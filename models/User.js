const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const PassportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  nombreUsuario:String,
  correo:String,
  nombre: String,
  apellido:  String,
  googleID: String,
  fotoPerfil:String,
  codigoPostal: Number,
  ranking: {
    type:Number,
    default:0
  },
  ganador:{
    type: Boolean,
    default:false
  },
  calificacion: {
    type:Number,
    default:0,
    min:0
  },
  total:{
    type:Number,
    default:0,
    min:0
  },
  puesto:{
    type: String,
    enum : ['SUPERADMIN', 'GERENTE', 'CHECKTICKET','SUPERVISOR','EMBAJADOR','USER'],
    default : 'USER'
  },
  ventas: [{
    type:Schema.Types.ObjectId,
    ref:"Ventas"
  }],
  ventasDinamica: [],
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
    puntosUsuario:{
      type: Number,
      default: 0,
      min:0,
      required:true
    },
    nombre:{
      type: String,
      required:false
    }
  }],
  centroConsumo:{
    type: Schema.Types.ObjectId,
    ref: "CentroConsumo"
  },
  brand:{
    type:Schema.Types.ObjectId,
    ref:"Brand"
  },
  dinamicasGanadas:[{
    type:Schema.Types.ObjectId,
    ref:"Dinamica"
  }],
  evidencias:[{
    type:Schema.Types.ObjectId,
    ref:"Evidencia"
  }],
  notificacion:[{
    type:Schema.Types.ObjectId,
    ref:"Dinamica"
  }],
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


  userSchema.plugin(PassportLocalMongoose, {
    usernameField:"correo"
  });
  
  module.exports = mongoose.model('User', userSchema);