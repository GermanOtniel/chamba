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
  cuentaConfirmada:{
    type: Boolean,
    default:false
  },
  terminosCondiciones:Boolean,
  correoEnviado:{
    type: Boolean,
    default:false
  },
  telefono:String,
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
  habilidades:[{
    limpieza:{
      type: Number,
      default: 0,
      min:0,
      max: 5,
      required: false
    },
    puntualidad:{
      type: Number,
      default: 0,
      min:0,
      max: 5,
      required: false
    },
    disciplinado:{
      type: Number,
      default: 0,
      min:0,
      max: 5,
      required: false
    },
    colaborativo:{
      type: Number,
      default: 0,
      min:0,
      max: 5,
      required: false
    }
  }],
  documentos:{
    idOficial:{
      type: String,
      required: false
    },
    actaNac:{
      type: String,
      required: false
    },
    curp:{
      type: String,
      required: false
    }
  },
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

  // EL MODELO MAS GRANDE DE LA APP, ES EL CENTRO DE NUESTRA APP, TIENEN RELACION CON CASI TODOS LOS DEMAS MODELOS
  // UN USUARIO PERTENECE A UN CENTRO DE CONSUMO, CREA EVIDENCIAS, PARTICIPA EN DINAMICAS, GENERA VENTAS DE LAS EVIDENCIAS APROBADAS
  // LE HACEN NOTAS DE LAS EVIDENCIAS QUE LE RECHAZARON, VENDE MARCAS Y TIENE UN PUESTO, LOS QUE SON SOLO USER SOLO SON USUARIOS DEL APP
  // LOS QUE TIENEN OTRO PUESTO SON USUARIOS DEL DASHBOARD

  // QUIERO RESALTAR QUE LA CALIFICACION SE HA USADO PARA LO SPUNTOS GLOBALES DE LOS USUARIOS