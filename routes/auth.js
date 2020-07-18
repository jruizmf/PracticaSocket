var express = require('express');
var Auth = require('../controller/auth');
var api = express.Router();
const TokenizedRoutes = require('../middleware/token');

api.post('/auth/', Auth.getUserLogin);
api.put('/auth/:sessionId', TokenizedRoutes, Auth.getUserLogout);

module.exports = api;
