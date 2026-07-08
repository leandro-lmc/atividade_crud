
import express from 'express'
import CursoController from '../controllers/curso.controller.js';

const router = express.Router();

router.get("/listar", CursoController.ListarTodos)
router.get("/listar/:codigo", CursoController.listarPorCodigo)
router.post("/cadastrar", CursoController.cadastrar)
router.put("/editar/total/:codigo", CursoController.editarTotal)
router.patch("/editar/parcial/:codigo", CursoController.editarParcial)
router.delete("/excluir/:matricula", CursoController.excluirPorCodigo)
router.delete("/excluir/todos", CursoController.excluirTodos)

export default router
