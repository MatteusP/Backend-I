const createError = require('http-errors');
const oficinaMemoria = require('../model/oficinaMemoria');

exports.cadastroGet = function (req, res) {
  res.render('cadastro', {
    tituloPagina: 'Nova Oficina',
    menuNova: true,
  });
};

exports.cadastroPost = async function (req, res, next) {
  try {
    const { titulo, responsavel, descricao, cargaHoraria } = req.body;
    await oficinaMemoria.criar(titulo, responsavel, descricao, cargaHoraria);
    res.redirect('/');
  } catch (err) {
    next(createError(400, err.message));
  }
};

exports.consulta = async function (req, res, next) {
  try {
    const oficina = await oficinaMemoria.consultar(req.params.id);
    res.render('consulta', {
      tituloPagina: 'Consulta de Oficina',
      oficina,
    });
  } catch (err) {
    next(createError(404, err.message));
  }
};

exports.editarGet = async function (req, res, next) {
  try {
    const oficina = await oficinaMemoria.consultar(req.params.id);
    res.render('editar', {
      tituloPagina: 'Editar Oficina',
      oficina,
    });
  } catch (err) {
    next(createError(404, err.message));
  }
};

exports.editarPost = async function (req, res, next) {
  try {
    await oficinaMemoria.consultar(req.params.id);
  } catch (err) {
    return next(createError(404, err.message));
  }

  try {
    const { titulo, responsavel, descricao, cargaHoraria } = req.body;
    await oficinaMemoria.atualizar(
      req.params.id,
      titulo,
      responsavel,
      descricao,
      cargaHoraria
    );
    res.redirect('/');
  } catch (err) {
    next(createError(400, err.message));
  }
};

exports.alternarSituacao = async function (req, res, next) {
  try {
    await oficinaMemoria.alternarSituacao(req.params.id);
    res.redirect('/');
  } catch (err) {
    next(createError(404, err.message));
  }
};

exports.excluir = async function (req, res, next) {
  try {
    await oficinaMemoria.excluir(req.params.id);
    res.redirect('/');
  } catch (err) {
    next(createError(404, err.message));
  }
};
