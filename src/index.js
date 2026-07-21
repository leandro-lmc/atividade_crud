import express from "express";
import dotenv from "dotenv";
import router from "./modules/inspecao/routes/inspecao.route.js";
dotenv.config();

const app = express();
app.use(express.json())

app.use(router)

const porta = process.env.PORTA;


// verificar a saude da api
app.get("/", (requisicao, resposta) => {
  try {
    resposta
      .status(200)
      .json({
        mensagem: "API funcionando com sucesso!",
        status: "ok",
        date: new Date().toLocaleString("pt-BR", {timeZone: "America/Recife"})
      });
  } catch (error) {
    resposta
      .status(500)
      .json({ mensagem: "Erro na API", erro: error });
  }
});

app.listen(porta, () => {
  console.log(`O servidor está em execução!`);
});