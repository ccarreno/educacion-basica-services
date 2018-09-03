var express = require('express');

var app = express();

var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var tipoOperacion = require('./src/app/model/TipoOperacion');
var operacion = require('./src/app/model/Operacion');
var bitacoraOperacion = require('./src/app/model/BitacoraOperacion');
var imagen = require('./src/app/model/Imagen');

app.use(bodyParser.json());

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

var preffix = "/educacion-basica-ws/api/v1/";

var router = express.Router();

router.get('/', function(req, res) {
  res.write('GET ' + preffix + 'tipo-operaciones\n');
  res.write('GET ' + preffix + 'imagenes\n');
  res.write('GET ' + preffix + 'operaciones/existen/:tipo-operacion/:fecha   ejemplo: ' + preffix + 'operaciones/suma/2018-08-25\n');
  res.write('POST ' + preffix + 'operaciones + body   ejemplo: ' + preffix + 'operaciones\n');
  res.write('GET ' + preffix + 'operaciones/:tipo-operacion/:fecha   ejemplo: ' + preffix + 'operaciones/suma/2018-08-25\n');
  res.write('GET ' + preffix + 'operaciones/:id   ejemplo: ' + preffix + 'operaciones/5b874a4aa77e5933ec324133\n');
  res.write('PUT ' + preffix + 'operaciones/:id + body   ejemplo: ' + preffix + 'operaciones/5b874a4aa77e5933ec324133\n');
  res.write('GET ' + preffix + 'bitacora-operacion/existe/:tipo_operacion/:usuario/:fecha   ejemplo: ' + preffix + 'bitacora-operacion/existe/suma/dcarreno/2018-08-25\n');
  res.write('POST ' + preffix + 'bitacora-operacion + body   ejemplo: ' + preffix + 'bitacora-operacion\n');
  res.write('PUT ' + preffix + 'bitacora-operacion/:id + body   ejemplo: ' + preffix + 'bitacora-operacion/5b874a4aa77e5933ec324133\n');
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

router.get(preffix + 'imagenes', function(req, res) {
  imagen.listarImagenes(function(err, data) {
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

router.get(preffix + 'operaciones/:id', function(req, res) {
  console.log("req.params.id=" + req.params.id);
  var id = req.params.id;
  operacion.buscarPorId(id, function(err, data) {
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

router.put(preffix + 'operaciones/:id', function(req, res) {
  //console.log(req);
  console.log("req.body" + req.body);
  var id = req.params.id;
  var model = req.body;
  operacion.modificarOperacion(id, model, {}, function(err, data) {
    if(err) {
      console.log(err);
      throw err;
    }
    console.log(data);
    res.json(data);
  });
});

router.get(preffix + 'bitacora-operacion/existe/:tipo_operacion/:usuario/:fecha', function(req, res) {
  console.log("req.params.tipo_operacion=" + req.params.tipo_operacion);
  console.log("req.params.usuario=" + req.params.usuario);
  console.log("req.params.fecha=" + req.params.fecha);
  bitacoraOperacion.listarBitacoraOperaciones(
    {
      "usuario": req.params.usuario,
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

router.post(preffix + 'bitacora-operacion', function(req, res) {
  //console.log(req);
  console.log("req.body" + req.body);
  var model = req.body;
  bitacoraOperacion.crearBitacoraOperacion(model, function(err, data) {
    if(err) {
      console.log(err);
      throw err;
    }
    console.log(data);
    res.json(data);
  });
});

router.put(preffix + 'bitacora-operacion/:id', function(req, res) {
  //console.log(req);
  console.log("req.body" + req.body);
  var id = req.params.id;
  var model = req.body;
  bitacoraOperacion.modificarBitacoraOperacion(id, model, {}, function(err, data) {
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
