const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const brandSchema = new Schema({
  nombre: String,
  fechaAlta: {
    type: String,
    required: true
  },
  fechaBaja: {
    type: String,
    required: false
  },
  dinamicas:[{
    type:Schema.Types.ObjectId,
    ref:"Dinamica"
  }],
  users:[{
    type:Schema.Types.ObjectId,
    ref:"User"
  }],
  marcas: [{
    type:Schema.Types.ObjectId,
    ref:"Marca"
  }],
  activo:{
    type: String,
    enum: ["Activo", "Inactivo"],
    default: "Inactivo"
  }
},{
    timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
    }
  });
// ESTE MODELO SE USA PARA AGRUPAR LA INFORMACIÓN QUE CADA BRAND PODRA VER, UN BRAND ES UNCLIENTE EN SI, HEINEKEN, TOMMY, ACHE, RAMIA...ETC.
// LOS QUE PERTENECERAN A UN BRAND SON USUARIOS, GERENTES, SUPERVIDORES, CHECKTICKETS...EN FIN SON ELLOS, UN USUARIO DE APP NO TIENE BRAND
// NO LO NECESITA YA QUE A LOS USUARIOS DE LA APP SE LES AGRUPA POR MEDIO DE SU CENTRO DE CONSUMO EN EL QUE TRABAJAN.

// LAS EVIDENCIAS, LAS DINAMICAS SI PERTENECEN A UN BRAND Y A PARTIR DEL BRAND QUE PERTENEZCAN SON LAS QUE LE REPRESENTAMOS A UN BRAND
// DENTRO DEL DASHBOARD. 

// EL BRAND DE 1PUNTOCINCO TIENE EL PERMISO ESPECIAL DE VISUALIZAR TODO
  module.exports = mongoose.model('Brand', brandSchema);
 