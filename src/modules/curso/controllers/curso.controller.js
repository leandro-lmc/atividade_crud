import CursoModel from "../models/curso.model.js";

class CursoController{
    static cadastrar(requisicao, resposta){
       try {
    // corpo da requisição com os dados que preciso
    const { codigo, nome, descricao, cargaHoraria, instrutor, modalidade, quantidadeVagas } = requisicao.body
    // Vericando se todos os campos foram preenchidos, caso não retorna erro 400
    if(!codigo || !nome || !descricao || !cargaHoraria || !instrutor || !modalidade || !quantidadeVagas){
      return resposta.status(400).json({mensagem:"Todos os campos são obrigatorios!"})
    }
    CursoModel.cadastrar(codigo, nome, descricao, cargaHoraria, instrutor, modalidade, quantidadeVagas);
    resposta.status(201).json({mensagem:"Cadastro realizado com sucesso!"});
        } catch (error) {
          resposta.status(500).json({mensagem: "Erro ao cadastrar curso!"}) 
        }
    }
   static ListarTodos(requisicao, resposta){
    try {
        const cursos = CursoModel.listarTodos()
        if(cursos.length === 0 ){
            return resposta.status(200).json({mensagem:"Nenhum curso cadastrado!"});
        }
            resposta.status(200).json(cursos)
    } catch (error) {
        resposta.status(500).json({mensagem: "Erro ao listar os cursos"})
    }
   } 

   static listarPorCodigo(requisicao, resposta){
    try {
        const codigo = requisicao.params.codigo
        const curso = CursoModel.listarPorCodigo(codigo)
        if(!curso){
            return resposta.status(200).json({mensagem:"Curso não encontrado"});
        }
        resposta.status(200).json(curso)
    } catch (error) {
        resposta.status(500).json({mensagem:"Erro ao listar os cursos!"})
    }
   }
   static editarTotal (requisicao, resposta){
    try {
        const codigo = requisicao.params.codigo
        const {novonome, novodescricao, novocargaHoraria, novoinstrutor, 
novomodalidade, novoquantidadeVagas} = requisicao.body
        const curso = CursoModel.editar(codigo, nome, descricao, cargaHoraria, instrutor, modalidade, quantidadeVagas)
        resposta.status(200).json(curso)
    } catch (error) {
         resposta.status(500).json({mensagem:"Erro ao editar os cursos!"})        
    }
   }
   static editarParcial (requisicao, resposta){
    try {
        const curso = CursoModel.editarParcial(codigo, nome, descricao, cargaHoraria, instrutor, modalidade, quantidadeVagas)
        resposta.status(200).json(curso)
    } catch (error) {
        resposta.status(500).json({mensagem:"Erro ao editar os cursos!"})
    }
   static excluir
}
}