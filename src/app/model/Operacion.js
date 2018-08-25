var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/educacion-basica',
  { useNewUrlParser: true });
//var db = mongoose.connection;

var operacionSchema = mongoose.Schema({
  index: { type: Number , required:true },
  tipo_operacion: { type:String , required:true },
  valorA: { type:Number , required:true },
  valorB: { type:Number , required:true },
  resultadoUsuario: { type:Number },
  resultadoOK: { type:Number , required:true },
  randomImageURL: { type:String , required:true },
  resuelto: { type:Boolean, required:true },
  titulo: { type:String , required:true },
  errorCalculo: { type:Boolean },
  fecha: { type:Date, default:Date.now }
});


var _Operacion = mongoose.model('operaciones', operacionSchema);

module.exports.Operacion = _Operacion;
module.exports.listarOperaciones = function(query, callback) {
  _Operacion.find(query, callback);
};

module.exports.crearOperacion = function(model, callback) {
  _Operacion.create(model, callback);
};
