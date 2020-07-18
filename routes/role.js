var express = require('express');
var RoleController = require('../controller/role');
var api = express.Router();
const TokenizedRoutes = require('../middleware/token');
// Creamos una ruta para los métodos que tenemos en nuestros controladores
api.get('/role', TokenizedRoutes, RoleController.getAll);
api.get('/role/:roleId', TokenizedRoutes, RoleController.findOne);
api.post('/role', TokenizedRoutes, RoleController.addRole);
api.put('/role/:roleId', TokenizedRoutes, RoleController.updateRole);
api.delete('/role/:roleId', TokenizedRoutes, RoleController.deleteRole);
// Exportamos la configuración
module.exports = api;