var express = require('express');
var router = express.Router();
var controllerOficina = require('../controller/controllerOficina');

router.get('/nova', controllerOficina.cadastroGet);
router.post('/nova', controllerOficina.cadastroPost);
router.get('/consulta/:id', controllerOficina.consulta);
router.get('/editar/:id', controllerOficina.editarGet);
router.post('/editar/:id', controllerOficina.editarPost);
router.get('/situacao/:id', controllerOficina.alternarSituacao);
router.get('/excluir/:id', controllerOficina.excluir);

module.exports = router;
