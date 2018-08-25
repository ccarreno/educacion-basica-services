var express = require('express');

var app = express();

var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var tipoOperacion = require('./src/app/model/TipoOperacion');
var operacion = require('./src/app/model/Operacion');

app.use(bodyParser.json());

var preffix = "/api/v1/";

var router = express.Router();

router.get('/', function(req, res) {
  res.write('GET ' + preffix + 'tipo-operaciones\n');
  res.write('GET ' + preffix + 'operaciones/existen/:tipo-operacion/:fecha   ejemplo: ' + preffix + 'operaciones/suma/2018-08-25\n');
  res.write('POST ' + preffix + 'operaciones   ejemplo: ' + preffix + 'operaciones\n');
  res.write('GET ' + preffix + 'operaciones/:tipo-operacion/:fecha   ejemplo: ' + preffix + 'operaciones/suma/2018-08-25\n');
  res.send();
});

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

// console.log(mongoose.model('cosas', tipoOperacionSchema).find());

// define the home page route
router.get(preffix + 'tipo-operaciones', function(req, res) {
  tipoOperacion.listarTipoOperaciones(function(err, data) {
    if(err) {
      console.log(err);
      throw err;
    }
    console.log(data);
    res.json(data);
  });
});

router.get(preffix + 'operaciones/:tipo_operacion/:fecha', function(req, res) {
  console.log("req.params.tipo_operacion=" + req.params.tipo_operacion);
  console.log("req.params.fecha=" + req.params.fecha);
  operacion.listarOperaciones(
    {
      "tipo_operacion": req.params.tipo_operacion,
      "fecha": {
        "$gte": new Date(req.params.fecha),
        "$lt": new Date()
      },
      "resuelto": false
    }, function(err, data) {
    if(err) {
      console.log(err);
      throw err;
    }
    console.log(data);
    res.json(data);
  });
});

router.get(preffix + 'operaciones/existen/:tipo_operacion/:fecha', function(req, res) {
  console.log("req.params.tipo_operacion=" + req.params.tipo_operacion);
  console.log("req.params.fecha=" + req.params.fecha);
  operacion.listarOperaciones(
    {
      "tipo_operacion": req.params.tipo_operacion,
      "fecha": {
        "$gte": new Date(req.params.fecha),
        "$lt": new Date()
      }
    }, function(err, data) {
    if(err) {
      console.log(err);
      throw err;
    }
    console.log(data);
    res.json(data);
  });
});

router.post(preffix + 'operaciones', function(req, res) {
  //console.log(req);
  console.log("req.body" + req.body);
  var model = req.body;
  operacion.crearOperacion(model, function(err, data) {
    if(err) {
      console.log(err);
      throw err;
    }
    console.log(data);
    res.json(data);
  });
});

module.exports = router;

app.use('/', router);
app.listen(4201);
console.log('Running on port 4201');