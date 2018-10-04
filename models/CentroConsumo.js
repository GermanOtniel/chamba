const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const centroSchema = new Schema({
  nombre: String,
  codigoPostal: Number,
  fechaAlta: {
    type: String,
    required: false
  },
  fechaBaja: {
    type: String,
    required: false
  },
  activo:{
    type: String,
    enum: ["Activo", "Inactivo"],
    default: "Inactivo"
  },
  ventas:[],
  ventasUsuario:[],
  usuarios:[{
    type:Schema.Types.ObjectId,
    ref:"User"
  }],
  brand:{
    type:Schema.Types.ObjectId,
    ref:"Brand"
  },
  zona:{
    type:Schema.Types.ObjectId,
    ref:"Zona"
  }
},{
    timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
    }
  });
    
  module.exports = mongoose.model('CentroConsumo', centroSchema);
 
  // UN CENTRO DE CONSUMO ES FACIL DE DEFINIR, ES UN CENTRO EN DONDE SE REGISTRAN VENTAS D ELAS MARCAS QUE NUESTROS BRANDS NECESITAN VENDER
  // EN SI ESTE MODELO SE CREO PARA QUE LOS USUARIOS ELIJAN EL CENTRO DE CONSUMO EN EL QUE TRABAJAN
  // LA IDEA ERA AGRUPAR LOS USUARIOS DENTRO DE ESTE CENTRO DE CONSUMO PERO VIMOS MEJOR SOLO UBICAR QUE USUARIOS TRABAJAN EN QUE LUGAR 
  // MEDIANTE UNA BUSQUEDA DEL CENTRO DE CONSUMO QUE TIENEN EN SU PERFIL O MODELO DE USUARIO.
  // UN CENTRO DE CONSUMO ES GENERAL PARA TODOS, ES DECIR CUALQUIER USUARIO PUEDE DEICR QUE TRABAJA EN TL¡AL CENTRO DE CONSUMO.
