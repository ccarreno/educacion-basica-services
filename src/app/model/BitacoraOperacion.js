var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/educacion-basica',
  { useNewUrlParser: true });
//var db = mongoose.connection;

var bitacoraOperacionSchema = mongoose.Schema({
  usuario: { type:String , required:true },
  tipo_operacion: { type:String , required:true },
  completado: { type: Boolean, required:true },
  fecha: { type: Date, default:Date.now }
});


var _BitacoraOperacion = mongoose.model('bitacora-operaciones', bitacoraOperacionSchema);

module.exports.BitacoraOperacion = _BitacoraOperacion;
module.exports.listarBitacoraOperaciones = function(query, callback) {
  _BitacoraOperacion.find(query, callback);
};

module.exports.crearBitacoraOperacion = function(model, callback) {
  _BitacoraOperacion.create(model, callback);
};

module.exports.modificarBitacoraOperacion = function(id, model, options, callback) {
  var query = { "_id":id };
  var update = {
    "completado": model.completado
  };
  console.log(query);
  console.log(update);
  _BitacoraOperacion.findOneAndUpdate(query, update, options, callback);
};
