import InspecaoModel from "../models/inspecao.model.js";

class InspecaoController{
    static async cadastrar(requisicao, resposta){
       try {
    // corpo da requisição com os dados que preciso
    const { codigo, item_inspecionado, data_inspecao, resultado } = requisicao.body
    // Vericando se todos os campos foram preenchidos, caso não retorna erro 400
    if(!codigo || !item_inspecionado || !data_inspecao || !resultado){
      return resposta.status(400).json({mensagem:"Todos os campos são obrigatorios!"});
    }
    await InspecaoModel.cadastrar(codigo, item_inspecionado, data_inspecao, resultado);
    resposta.status(201).json({mensagem:"Cadastro realizado com sucesso!"});
        } catch (error) {
          resposta.status(500).json({mensagem: "Erro ao cadastrar inspeção!", erro:error.message}) 
        }
    }
   static async ListarTodos(requisicao, resposta){
    try {
        const inspecao = await InspecaoModel.listarTodos()
        if(inspecao.length === 0 ){
            return resposta.status(200).json({mensagem:"Nenhuma inspeção cadastrada!"});
        }
            resposta.status(200).json(inspecao)
    } catch (error) {
        resposta.status(500).json({mensagem: "Erro ao listar as inspeções", erro:error.message})
    }
   } 

   static async listarPorCodigo(requisicao, resposta){
    try {
        const codigo = requisicao.params.codigo
        const inspecao = await InspecaoModel.listarPorCodigo(codigo)
        if(!inspecao){
            return resposta.status(200).json({mensagem:"Inspeção não encontrado"});
        }
        resposta.status(200).json(inspecao)
    } catch (error) {
        resposta.status(500).json({mensagem:"Erro ao listar as inspeções!", erro:error.message})
    }
   }
   static async editarTotal (requisicao, resposta){
    try {
        const codigo = requisicao.params.codigo
        const {item_inspecionado, data_inspecao, resultado} = requisicao.body
        const inspecao = await InspecaoModel.editarTotal(codigo,item_inspecionado, data_inspecao, resultado)
        resposta.status(200).json(inspecao)
    } catch (error) {
         resposta.status(500).json({mensagem:"Erro ao editar as inspeções!", erro:error.message})        
    }
   }
   static async editarParcial (requisicao, resposta){
    try {
        const codigo = requisicao.params.codigo
        const {item_inspecionado, data_inspecao, resultado} = requisicao.body
        const inspecao = await InspecaoModel.editarParcial(codigo, item_inspecionado, data_inspecao, resultado)
        resposta.status(200).json(inspecao)
    } catch (error) {
        resposta.status(500).json({mensagem:"Erro ao editar as inspeção!", erro:error.message})
    }
    }
   static async excluirTodos(requisicao, resposta){
    try {
       await InspecaoModel.excluirTodos()
        resposta.status(200).json({mensagem:"Todas as inspeção foram excluídos!"})    
    } catch (error) {
        resposta.status(500).json({mensagem:"Erro ao excluir todas as inspeções!"})
    }
   }
   static async excluirPorCodigo(requisicao, resposta){
    try {
        const codigo = requisicao.params.codigo
        await InspecaoModel.excluirPorCodigo(codigo)
        resposta.status(200).json({mensagem:"Inspeção excluída com sucesso!"})
    } catch (error) {
        resposta.status(500).json({mensagem:"Erro ao excluir a Inspeção!"})
    }
   }
}

export default InspecaoController