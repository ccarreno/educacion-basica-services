var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/educacion-basica',
  { useNewUrlParser: true });
//var db = mongoose.connection;

var tipoOperacionSchema = mongoose.Schema({
  _id:{
    type: Number,
    required: true
  },
  descripcion:{
    type: String,
    required: true
  }
});


var _TipoOperacion = mongoose.model('tipo_operaciones', tipoOperacionSchema);

module.exports.TipoOperacion = _TipoOperacion;
module.exports.listarTipoOperaciones = function(callback) {
  _TipoOperacion.find(callback);
}
