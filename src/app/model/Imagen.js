var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/educacion-basica',
  { useNewUrlParser: true });
//var db = mongoose.connection;

var imagenSchema = mongoose.Schema({
  nombreArchivo: { type:String , required:true },
  categoria: { type:String , required:true }
});


var _Imagen = mongoose.model('imagenes', imagenSchema);

module.exports.Imagen = _Imagen;
module.exports.listarImagenes = function(query, callback) {
  _Imagen.find(query, callback);
};
