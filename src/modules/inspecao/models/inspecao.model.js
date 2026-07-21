import conexao from "../../../config/database.js";

class InspecaoModel {
  //Metodo especial do javascript
  constructor(codigo, item_inspecionado, data_inspecao, resultado) {
    //inicialização dos parametros
    this.codigo = codigo;
    this.item_inspecionado = item_inspecionado;
    this.data_inspecao = data_inspecao;
    this.resultado = resultado;
  }
  static async cadastrar(codigo, item_inspecionado, data_inspecao, resultado) {
    const dados = [codigo, item_inspecionado, data_inspecao, resultado];
    const query = `insert into inspecao(codigo, item_inspecionado, data_inspecao, resultado) values ($1, $2, $3, $4) returning *`;
    const resultado2 = await conexao.query(query, dados);
    return resultado2.rows;
  }

  static async listarTodos() {
    const query = `select * from inspecao`;
    const resultado2 = await conexao.query(query);
    return resultado2.rows;
  }
  static async listarPorCodigo(codigo) {
    const dados = [codigo];
    const query = `select * from inspecao where codigo = $1`;
    const resultado2 = await conexao.query(query, dados);
    return resultado2.rows;
  }
  static async editarTotal(
    codigo,
    item_inspecionado,
    data_inspecao,
    resultado,
  ) {
    // Primeiro procuramos o inspecao pela codigo.
    const inspecao = await InspecaoModel.listarPorCodigo(codigo);

    // Se a inspeção nao existir, retornamos null para o controller tratar.
    if (inspecao.length === 0) {
      return null;
    }

    const dados = [codigo, item_inspecionado, data_inspecao, resultado];
    const query = `update inspecao 
            set item_inspecionado = $2, data_inspecao = $3, resultado = $4 
        where codigo = $1 returning *;`;
    const resultado2 = await conexao.query(query, dados);
    return resultado2.rows;
  }

  static async editarParcial(
    codigo,
    item_inspecionado,
    data_inspecao,
    resultado,
  ) {
    const inspecao = await InspecaoModel.listarPorCodigo(codigo);
    if (inspecao.length === 0) {
      return null;
    }
    const dados = [codigo, item_inspecionado, data_inspecao, resultado];
    const query = `update inspecao 
        set item_inspecionado = coalesce ($2, item_inspecionado), data_inspecao = coalesce ($3,data_inspecao), resultado = coalesce ($4, resultado)
        where codigo = $1 returning *;`;
    const resultado2 = await conexao.query(query, dados);
    return resultado2.rows;
  }

  static async excluirPorCodigo(codigo) {
    const inspecao = await InspecaoModel.listarPorCodigo(codigo);

    if (inspecao.length === 0) {
      return null;
    }
    const dados = [codigo];
    const query = `delete from inspecao where codigo = $1 returning *`;
    const resultado2 = await conexao.query(query, dados);
    return resultado2.rows;
  }

  static async excluirTodos() {
    const query = `delete from inspecao returning *`;
    const resultado2 = await conexao.query(query);
    return resultado2.rows;
  }
}

export default InspecaoModel;
