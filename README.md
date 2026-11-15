# Catálogo de Oficinas

Aplicação web desenvolvida para a disciplina **Desenvolvimento Backend I** (Pós-graduação em Desenvolvimento Fullstack), com o objetivo de gerenciar um catálogo de oficinas de treinamento em memória.

## Tecnologias utilizadas

- Node.js
- Express / Express Generator
- Handlebars (`hbs`)
- Bootstrap (arquivos locais offline)

## Como executar

1. Instale as dependências:

```bash
npm install
```

2. Inicie o servidor:

```bash
npm start
```

3. Acesse no navegador:

```text
http://localhost:3000
```

> Caso a porta `3000` esteja em uso, defina outra porta pela variável de ambiente `PORT` antes de iniciar (por exemplo, `$env:PORT=3099; npm start` no PowerShell).

## Funcionalidades

- Listagem de oficinas com resumo do catálogo (total, abertas, encerradas e soma da carga horária das abertas)
- Visualização completa ou filtrada por inscrições abertas
- Cadastro, consulta detalhada, edição e exclusão com confirmação em modal Bootstrap
- Alternância da situação das inscrições (aberta / encerrada)
- Pesquisa por título da oficina
- Página Sobre
