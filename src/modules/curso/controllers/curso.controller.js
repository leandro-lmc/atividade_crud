import CursoModel from "../models/curso.model.js";

class CursoController{
    static async cadastrar(requisicao, resposta){
       try {
    // corpo da requisição com os dados que preciso
    const { codigo, nome, descricao, cargaHoraria, instrutor, modalidade, quantidadeVagas } = requisicao.body
    // Vericando se todos os campos foram preenchidos, caso não retorna erro 400
    if(!codigo || !nome || !descricao || !cargaHoraria || !instrutor || !modalidade || !quantidadeVagas){
      return resposta.status(400).json({mensagem:"Todos os campos são obrigatorios!"})
    }
    await CursoModel.cadastrar(codigo, nome, descricao, cargaHoraria, instrutor, modalidade, quantidadeVagas);
    resposta.status(201).json({mensagem:"Cadastro realizado com sucesso!"});
        } catch (error) {
          resposta.status(500).json({mensagem: "Erro ao cadastrar curso!"}) 
        }
    }
   static async ListarTodos(requisicao, resposta){
    try {
        const cursos = await CursoModel.listarTodos()
        if(cursos.length === 0 ){
            return resposta.status(200).json({mensagem:"Nenhum curso cadastrado!"});
        }
            resposta.status(200).json(cursos)
    } catch (error) {
        resposta.status(500).json({mensagem: "Erro ao listar os cursos"})
    }
   } 

   static async listarPorCodigo(requisicao, resposta){
    try {
        const codigo = requisicao.params.codigo
        const curso = await CursoModel.listarPorCodigo(codigo)
        if(!curso){
            return resposta.status(200).json({mensagem:"Curso não encontrado"});
        }
        resposta.status(200).json(curso)
    } catch (error) {
        resposta.status(500).json({mensagem:"Erro ao listar os cursos!"})
    }
   }
   static async editarTotal (requisicao, resposta){
    try {
        const codigo = requisicao.params.codigo
        const {nome, descricao, cargaHoraria, instrutor, 
modalidade, quantidadeVagas} = requisicao.body
        const curso = await CursoModel.editar(codigo, nome, descricao, cargaHoraria, instrutor, modalidade, quantidadeVagas)
        resposta.status(200).json(curso)
    } catch (error) {
         resposta.status(500).json({mensagem:"Erro ao editar os cursos!"})        
    }
   }
   static async editarParcial (requisicao, resposta){
    try {
        const curso = await CursoModel.editarParcial(codigo, nome, descricao, cargaHoraria, instrutor, modalidade, quantidadeVagas)
        resposta.status(200).json(curso)
    } catch (error) {
        resposta.status(500).json({mensagem:"Erro ao editar os cursos!"})
    }
    }
   static async excluirTodos(requisicao, resposta){
    try {
       await CursoModel.excluirTodos()
        resposta.status(200).json({mensagem:"Todos os cursos foram excluídos!"})    
    } catch (error) {
        resposta.status(500).json({mensagem:"Erro ao excluir todos os cursos!"})
    }
   }
   static async excluirPorCodigo(requisicao, resposta){
    try {
        const codigo = requisicao.params.codigo
        await CursoModel.excluirPorCodigo()
        resposta.status(200).json({mensagem:"curso excluído com sucesso!"})
    } catch (error) {
        resposta.status(500).json({mensagem:"Erro ao excluir o curso!"})
    }
   }
}

export default CursoController