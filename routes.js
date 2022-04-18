const express = require('express');
const routes = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');


// Rotas da home
routes.get('/', homeController.index);

// routess login
routes.get('/login', loginController.index);
routes.post('/login/register', loginController.register);
routes.post('/login/login', loginController.login);

module.exports = routes;
