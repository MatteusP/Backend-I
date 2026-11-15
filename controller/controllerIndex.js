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

exports.pesquisaGet = function (req, res) {
  res.render('pesquisa', {
    tituloPagina: 'Pesquisa de Oficinas',
    menuPesquisa: true,
    pesquisou: false,
    termo: '',
    resultados: [],
  });
};

exports.pesquisaPost = async function (req, res, next) {
  try {
    const termo = (req.body.termo || '').trim();
    const resultados = await oficinaMemoria.pesquisar(termo);

    res.render('pesquisa', {
      tituloPagina: 'Pesquisa de Oficinas',
      menuPesquisa: true,
      pesquisou: true,
      termo,
      resultados,
    });
  } catch (err) {
    next(err);
  }
};
