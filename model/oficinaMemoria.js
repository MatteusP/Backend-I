const oficinas = [];
let proximoId = 1;

function buscarIndice(id) {
  const idNumerico = Number(id);
  return oficinas.findIndex((oficina) => oficina.id === idNumerico);
}

function validarDados(titulo, responsavel, descricao, cargaHoraria) {
  const tituloLimpo = (titulo || '').trim();
  const responsavelLimpo = (responsavel || '').trim();
  const textoDescricao = descricao || '';
  const horas = Number(cargaHoraria);

  if (!tituloLimpo || !responsavelLimpo || !textoDescricao.trim()) {
    throw new Error('Todos os campos da oficina são obrigatórios.');
  }

  if (!Number.isInteger(horas) || horas < 1 || horas > 40) {
    throw new Error('A carga horária deve ser um número inteiro entre 1 e 40.');
  }

  return {
    titulo: tituloLimpo,
    responsavel: responsavelLimpo,
    descricao: textoDescricao,
    cargaHoraria: horas,
  };
}

class OficinaMemoria {
  async listar() {
    return [...oficinas];
  }

  async listarAbertas() {
    return oficinas.filter((oficina) => oficina.inscricoesAbertas);
  }

  async resumo() {
    let abertas = 0;
    let cargaHorariaAbertas = 0;

    for (const oficina of oficinas) {
      if (oficina.inscricoesAbertas) {
        abertas += 1;
        cargaHorariaAbertas += oficina.cargaHoraria;
      }
    }

    return {
      total: oficinas.length,
      abertas,
      encerradas: oficinas.length - abertas,
      cargaHorariaAbertas,
    };
  }

  async consultar(id) {
    const indice = buscarIndice(id);
    if (indice === -1) {
      throw new Error(`Oficina com ID ${id} não encontrada.`);
    }
    return oficinas[indice];
  }

  async criar(titulo, responsavel, descricao, cargaHoraria) {
    const dados = validarDados(titulo, responsavel, descricao, cargaHoraria);
    const oficina = {
      id: proximoId++,
      titulo: dados.titulo,
      responsavel: dados.responsavel,
      descricao: dados.descricao,
      cargaHoraria: dados.cargaHoraria,
      inscricoesAbertas: true,
    };

    oficinas.push(oficina);
    return oficina;
  }

  async atualizar(id, titulo, responsavel, descricao, cargaHoraria) {
    const indice = buscarIndice(id);
    if (indice === -1) {
      throw new Error(`Oficina com ID ${id} não encontrada.`);
    }

    const dados = validarDados(titulo, responsavel, descricao, cargaHoraria);
    const atual = oficinas[indice];

    oficinas[indice] = {
      id: atual.id,
      titulo: dados.titulo,
      responsavel: dados.responsavel,
      descricao: dados.descricao,
      cargaHoraria: dados.cargaHoraria,
      inscricoesAbertas: atual.inscricoesAbertas,
    };

    return oficinas[indice];
  }

  async alternarSituacao(id) {
    const indice = buscarIndice(id);
    if (indice === -1) {
      throw new Error(`Oficina com ID ${id} não encontrada.`);
    }

    oficinas[indice].inscricoesAbertas = !oficinas[indice].inscricoesAbertas;
    return oficinas[indice];
  }

  async excluir(id) {
    const indice = buscarIndice(id);
    if (indice === -1) {
      throw new Error(`Oficina com ID ${id} não encontrada.`);
    }

    oficinas.splice(indice, 1);
  }

  async pesquisar(termo) {
    const busca = (termo || '').trim().toLowerCase();
    if (!busca) {
      return [];
    }

    return oficinas.filter((oficina) =>
      oficina.titulo.toLowerCase().includes(busca)
    );
  }
}

module.exports = new OficinaMemoria();
