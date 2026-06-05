require("node:dns").setServers(["1.1.1.1", "8.8.8.8"]);

require('dotenv').config();


const express = require('express');
const conectarDB = require('./config/connection');

// modelo
const Cliente = require('./models/cliente.model');
const Servicio = require('./models/servicio.model');
const Producto = require('./models/producto.model');
const clienteController = require('./controllers/cliente.controller');
const servicioController = require('./controllers/servicio.controller');
const productoController = require('./controllers/producto.controller');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

conectarDB();



app.get('/clientes', clienteController.consultar)
app.get('/clientes/email/:email', clienteController.consultarId)
app.post('/clientes', clienteController.registrar)
app.put('/clientes/email/:email', clienteController.actualizar)
app.delete('/clientes/email/:email', clienteController.eliminar)


app.get('/servicios', servicioController.consultar)
app.get('/servicios/nombre/:nombre', servicioController.consultarId)
app.post('/servicios', servicioController.registrar)
app.put('/servicios/nombre/:nombre', servicioController.actualizar)
app.delete('/servicios/nombre/:nombre', servicioController.eliminar)

app.get('/productos', productoController.consultar)
app.get('/productos/nombre/:nombre', productoController.consultarId)
app.post('/productos', productoController.registrar)
app.put('/productos/nombre/:nombre', productoController.actualizar)
app.delete('/productos/nombre/:nombre', productoController.eliminar)



app.get('/tiendita', function(req,res){
   fetch('https://mongo-connection-api2.onrender.com/clientes')
   .then(response => response.json())
   .then(data => {
       res.render('pages/clientes',
           {clientes:data}
       )
   });
});



app.listen(1999);