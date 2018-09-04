var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/educacion-basica',
  { useNewUrlParser: true });
//var db = mongoose.connection;

var premiosSchema = mongoose.Schema({
  index: { type: Number , required:true },
  link: { type:String , required:true },
  tipo: { type:String , required:true },
  nombre: { type: String , required:true },
  capitulo: { type: Number },
  titulo: { type: String , required:true  },
  temporada: { type: Number , required:true },
  ver: { type: Date },
  visto: { type: Boolean, required:true },
  fecha_creacion: { type: Date, default:Date.now },
});


var _Premio = mongoose.model('premios', premiosSchema);

module.exports.Premio = _Premio;
module.exports.listarPremios = function(query, limit, callback) {
  _Premio.find(query, callback).sort({ "index":1 }).limit(limit);
};
