const oficinaMemoria = require('../model/oficinaMemoria');

exports.telaPrincipal = async function (req, res, next) {
  try {
    const [resumo, oficinas] = await Promise.all([
      oficinaMemoria.resumo(),
      oficinaMemoria.listar(),
    ]);

    res.render('index', {
      tituloPagina: 'Catálogo de Oficinas',
      menuInicio: true,
      filtroAbertas: false,
      resumo,
      oficinas,
      nenhumaAberta: false,
    });
  } catch (err) {
    next(err);
  }
};

exports.inscricoesAbertas = async function (req, res, next) {
  try {
    const [resumo, oficinas] = await Promise.all([
      oficinaMemoria.resumo(),
      oficinaMemoria.listarAbertas(),
    ]);

    res.render('index', {
      tituloPagina: 'Catálogo de Oficinas - Inscrições Abertas',
      menuInicio: true,
      filtroAbertas: true,
      resumo,
      oficinas,
      nenhumaAberta: resumo.total > 0 && oficinas.length === 0,
    });
  } catch (err) {
    next(err);
  }
};

exports.sobre = function (req, res) {
  res.render('sobre', {
    tituloPagina: 'Sobre o catálogo',
    menuSobre: true,
  });
};
