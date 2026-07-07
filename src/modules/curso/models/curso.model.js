import cursos from "../../../config/database.js"

class CursoModel{
   //Metodo especial do javascript
    constructor(codigo, nome, descricao, cargaHoraria, instrutor, modalidade, quantidadeVagas){
        //inicialização dos parametros
        this.codigo = codigo
        this.nome = nome
        this.descricao = descricao
        this.cargaHoraria = cargaHoraria
        this.instrutor = instrutor
        this.modalidade = modalidade
        this.quantidadeVagas = quantidadeVagas
   } 
   static cadastrar(codigo, nome, descricao, cargaHoraria, instrutor, modalidade, quantidadeVagas){
        const dados = {codigo, nome, descricao, cargaHoraria, instrutor, modalidade, quantidadeVagas}
        cursos.push(dados)
   }
   static listarTodos(){
        return cursos
   }
   static listarPorCodigo(codigo){
        const curso = curso.find(curso => curso.codigo === codigo)
        return curso
   }
   static editarTotal (novonome, novodescricao, novocargaHoraria, novoinstrutor, novomodalidade, novoquantidadeVagas){
         const curso = CursoModel.listarPorCodigo(codigo)
         curso.nome = novonome
         curso.descricao = novodescricao
         curso.cargaHoraria = novocargaHoraria
         curso.instrutor = novoinstrutor
         curso.modalidade = novomodalidade
         curso.quantidadeVagas = novoquantidadeVagas
         return curso
   }

    static editarParcial (novonome, novodescricao, novocargaHoraria, novoinstrutor, novomodalidade, novoquantidadeVagas){
         const curso = CursoModel.listarPorCodigo(codigo)
         curso.nome || novonome
         curso.descricao || novodescricao
         curso.cargaHoraria || novocargaHoraria
         curso.instrutor || novoinstrutor
         curso.modalidade || novomodalidade
         curso.quantidadeVagas || novoquantidadeVagas
         return curso
   }
   static excluirTodos(){
    cursos.length = 0
   }
   
}

export default CursoModel