import conexao from "../../../config/database.js";

class CursoModel {
  //Metodo especial do javascript
  constructor(
    codigo,
    nome,
    descricao,
    cargaHoraria,
    instrutor,
    modalidade,
    quantidadeVagas,
  ) {
    //inicialização dos parametros
    this.codigo = codigo;
    this.nome = nome;
    this.descricao = descricao;
    this.cargaHoraria = cargaHoraria;
    this.instrutor = instrutor;
    this.modalidade = modalidade;
    this.quantidadeVagas = quantidadeVagas;
  }
  static async cadastrar(
    codigo,
    nome,
    descricao,
    cargaHoraria,
    instrutor,
    modalidade,
    quantidadeVagas,
  ) {
    const dados = [
      codigo,
      nome,
      descricao,
      cargaHoraria,
      instrutor,
      modalidade,
      quantidadeVagas,
    ];
    const query = `insert into curso(codigo, nome, descricao, cargaHoraria, instrutor, modalidade, quantidadeVagas) values ($1, $2, $3, $4, $5, $6, $7) return *`;
    const resultado = await conexao.query(query, dados);
    return resultado.rows[0];
  }

  static async listarTodos() {
    const query = `select * from curso`;
    const resultado = await conexao.query(query);
    return resultado;
  }
  static async listarPorCodigo(codigo) {
    const dados = [codigo];
    const query = `select * from curso where matricula = $1`;
    const resultado = await conexao.query(query, dados);
    return resultado;
  }
  static async editarTotal(
    nome,
    descricao,
    cargaHoraria,
    instrutor,
    modalidade,
    quantidadeVagas,
  ) {
    // Primeiro procuramos o aluno pela matricula.
    const curso = await AlunoModel.listarPorCodigo(codigo);

    // Se o aluno nao existir, retornamos null para o controller tratar.
    if (curso.length === 0) {
      return null;
    }

    const dados = [
      nome,
      descricao,
      cargaHoraria,
      instrutor,
      modalidade,
      quantidadeVagas,
    ];
    const query = `update curso 
        set nome = $2, descricao = $3, cargaHoraria = $4, instrutor = $5, modalidade = $6, quantidadeVagas = $7
        where codigo = $1 returning *;`;
    const resultado = await conexao.query(query, dados);
    return resultado.rows[0];
  }

  static async editarParcial(
    nome,
    descricao,
    cargaHoraria,
    instrutor,
    modalidade,
    quantidadeVagas,
  ) {
    const curso = await CursoModel.listarPorCodigo(codigo);
    if (curso.length === 0) {
      return null;
    }
    const dados = [
      nome,
      descricao,
      cargaHoraria,
      instrutor,
      modalidade,
      quantidadeVagas,
    ];
    const query = `update curso 
        set nome = coalesce ($2, nome), descricao = coalesce ($3, descricao), cargaHoraria = coalesce ($4, cargaHoraria), instrutor = coalesce ($5, instrutor), modalidade = coalesce ($6, modalidade), quantidadeVagas = coalesce ($7, quantidadeVagas)
        where codigo = $1 returning *;`;
    const resultado = await conexao.query(query, dados);
    return resultado.rows[0];
  }

  static async excluirPorCodigo(codigo) {
    const curso = await CursoModel.listarPorCodigo(codigo);

    if (curso.length === 0) {
      return null;
    }
    const dados = [codigo];
    const query = `delete from curso where codigo = $1 returning *`;
    const resultado = await conexao.query(query, dados);
    return resultado.rows[0];
  }

  static async excluirTodos() {
    const query = `delete from curso returning *`;
    const resultado = await conexao.query(query);
    return resultado.rows[0];
  }
}

export default CursoModel;
