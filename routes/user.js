var express = require('express');
var UserController = require('../controller/user');
var api = express.Router();
const TokenizedRoutes = require('../middleware/token');
// Creamos una ruta para los métodos que tenemos en nuestros controladores
api.get('/user', TokenizedRoutes, UserController.getAll);
api.get('/user/:userId', TokenizedRoutes, UserController.findOne);
api.post('/user', TokenizedRoutes, UserController.addUser);
api.put('/user/:userId', TokenizedRoutes, UserController.updateUser);
api.delete('/user/:userId', TokenizedRoutes, UserController.deleteUser);
// Exportamos la configuración
module.exports = api;