
import express from 'express'
import InspecaoController from '../controllers/inspecao.controller.js';

const router = express.Router();

router.get("/inspecao/listar", InspecaoController.ListarTodos)
router.get("/inspecao/listar/:codigo", InspecaoController.listarPorCodigo)
router.post("/inspecao/cadastrar", InspecaoController.cadastrar)
router.put("/inspecao/editar/total/:codigo", InspecaoController.editarTotal)
router.patch("/inspecao/editar/parcial/:codigo", InspecaoController.editarParcial)
router.delete("/inspecao/excluir/:codigo", InspecaoController.excluirPorCodigo)
router.delete("/inspecao/excluir", InspecaoController.excluirTodos)

export default router
