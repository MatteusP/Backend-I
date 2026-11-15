var express = require('express');
var router = express.Router();
var controllerIndex = require('../controller/controllerIndex');

router.get('/', controllerIndex.telaPrincipal);
router.get('/abertas', controllerIndex.inscricoesAbertas);
router.get('/sobre', controllerIndex.sobre);

module.exports = router;
