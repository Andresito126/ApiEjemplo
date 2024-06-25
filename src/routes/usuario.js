const express = require('express');
const router = express.Router();
const usuariosControllers = require('../controllers/usuario');

//rutas para los endpoints el crud



router.post('/crearUsuario',usuariosControllers.createUser);

module.exports = router;