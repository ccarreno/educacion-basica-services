var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/educacion-basica',
  { useNewUrlParser: true });
//var db = mongoose.connection;

var operacionSchema = mongoose.Schema({
  index: { type: Number , required:true },
  usuario: { type:String , required:true },
  tipo_operacion: { type:String , required:true },
  valorA: { type: Number , required:true },
  valorB: { type: Number , required:true },
  resultadoUsuario: { type: Number },
  resultadoOK: { type: Number , required:true },
  randomImageURL: { type: String , required:true },
  resuelto: { type: Boolean, required:true },
  titulo: { type: String , required:true },
  errorCalculo: { type: Boolean },
  fecha: { type: Date, default:Date.now },
  bitacoraId: { type: mongoose.Schema.ObjectId , required:true }
});


var _Operacion = mongoose.model('operaciones', operacionSchema);

module.exports.Operacion = _Operacion;
module.exports.listarOperaciones = function(query, callback) {
  _Operacion.find(query, callback);
};

module.exports.buscarPorId = function(id, callback) {
  _Operacion.findById(id, callback);
};

module.exports.crearOperacion = function(model, callback) {
  _Operacion.create(model, callback);
};

module.exports.modificarOperacion = function(id, model, options, callback) {
  var query = { "_id":id };
  var update = {
    "resultadoUsuario": model.resultadoUsuario,
    "resuelto": model.resuelto,
    "errorCalculo": model.errorCalculo
  };
  console.log(query);
  console.log(update);
  _Operacion.findOneAndUpdate(query, update, options, callback);
};
