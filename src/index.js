import express, { response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json())
const porta = process.env.PORTA;

const cursos = [];

// verificar a saude da api
app.get("/", (requisicao, resposta) => {
  try {
    resposta
      .status(200)
      .json({
        mensagem: "API funcionando com sucesso!",
        status: "ok",
        date: new Date.now(),
      });
  } catch (error) {
    resposta
      .status(500)
      .json({ mensagem: "Erro ao listar cursos", erro: error });
  }
});

// Endpoint para listar curso pelo codigo
// http://localhost:3000/listar/a92222
app.get("/listar/:codigo", (requisicao, resposta) => {
  try {
    const codigo = requisicao.params.codigo;
    // const cursos = [{},{},{}]
    const curso_procurado = cursos.find(curso => curso.codigo === codigo);

    // e se o alunocurso que eu estou procurando não existir?
    if(!curso_procurado){
        return resposta.status(200).json({mensagem: "curso não encontrado!"})
    }

    resposta.status(200).json(curso_procurado)
  } catch (error) {
    resposta.status(500).json({mensagem: "Erro ao listar o curso", erro: error})
  }
});

// Endpoint para cadastrar curso 
app.post("/cadastrar", (requisicao, resposta) => {
  try {
    // corpo da requisição com os dados que preciso
    const { codigo, nome, descricao, cargaHoraria, instrutor, modalidade, quantidadeVagas } = requisicao.body
    // Vericando se todos os campos foram preenchidos, caso não retorna erro 400
    if(!codigo || !nome || !descricao || !cargaHoraria || !instrutor || !modalidade || !quantidadeVagas){
      return resposta.status(400).json({mensagem:"Todos os campos são obrigatorios!"})
    }
    // salvando os dados que enviei ao servidor pela req
    const dados = { codigo, nome, descricao, cargaHoraria, instrutor, modalidade, quantidadeVagas }
    // Salvando os dados em array(memoria) via push
    const curso = cursos.push(dados)

    // resposta informando que o curso foi cadastrado
    resposta.status(201).json({mensagem: "Cadastro realizado com sucesso!"})
  } catch (error) {
    resposta.status(500).json({mensagem: "Erro ao cadastrar curso!", erro:error})
  }
})

app.put("/editar/:codigo", (requisicao, resposta) => {
try {
 const codigo = requisicao.params.codigo
 const curso = cursos.find(curso => curso.codigo === codigo)
 if(!curso){
  return resposta.status(400).json({mensage:"curso não encontrado!"})
 }
 //enviado para o servidor novos dados para editar o curso
 const {novonome, novodescricao, novocargaHoraria, novoinstrutor, novomodalidade, novoquantidadeVagas} = requisicao.body
 if(!novonome || !novodescricao || !novocargaHoraria || !novoinstrutor || !novomodalidade || !novoquantidadeVagas){
  return resposta.status(400).json({mensagem:"Todos os campos para edição são obrigatórios!"})
 }

curso.codigo = curso.codigo
curso.nome = novonome
curso.descricao = novodescricao
curso.cargaHoraria = novocargaHoraria
curso.instrutor = novoinstrutor
curso.modalidade = novomodalidade
curso.quantidadeVagas = novoquantidadeVagas

 resposta.status(200).json({mensagem: "curso atualizado com sucesso!"})
} catch (error){
  resposta.status(500).json({mensagem:"Erro ao editar o curso!", erro: error})
}
});

app.patch("/editar/:codigo", (requisicao, resposta) => {
  try {
 const codigo = requisicao.params.codigo
 const curso = cursos.find(curso => curso.codigo === codigo)
 if(!curso){
  return resposta.status(400).json({mensage:"curso não encontrado!"})
 }
 const {novonome, novodescrição, novocargaHoraria, novoinstrutor, novomodalidade, novoquantidadeVagas } = requisicao.body

 curso.nome = novonome || curso.nome
 curso.descrição = novodescrição || curso.descrição
 curso.cargaHoraria = novocargaHoraria || curso.cargaHoraria
 curso.instrutor = novoinstrutor || curso.instrutor
 curso.modalidade = novomodalidade || curso.modalidade
 curso.quantidadeVagas = novoquantidadeVagas || curso.quantidadeVagas

  resposta.status(200).json({mensagem: "curso atualizado com sucesso!"})

 } catch (error){
  resposta.status(500).json({mensagem:"Erro ao editar o aluno!", erro: error})
}
});

app.delete("/excluir/todos", (requisicao, resposta) => {
  try {
cursos.length = 0
resposta.status(200).json({mensagem: "Todos os cursos foram excluídos!"})
  }catch (error){
    resposta.status(500).json({mensagem: "Erro ao excluir os cursos!", erro: error})
  }
});

app.delete("/excluir/:codigo", (requisicao, resposta) => {
  try {
     const codigo = requisicao.params.codigo
    const index = cursos.findIndex(curso => curso.codigo === codigo)
    if(index === -1){
      return resposta.status(400).json({mensagem:"Curso não encontrado!"})
    }
    curso.splice(index,1)
    resposta.status(200).json({mensagem: "Curso excluído com sucesso!"})
  }catch (error) {
resposta.status(500).json({mensagem: "Erro ao excluir os cursos!", erro: error})
  }
})

app.listen(porta, () => {
  console.log(`O servidor está em execução!`);
});