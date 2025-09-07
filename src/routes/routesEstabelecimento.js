import express from "express";
import { criarEstabelecimento, loginEstabelecimento, todosEstabelecimento } from "../controllers/controllerEstabelecimento.js";


const router = express.Router();

// Cadastro
router.post("/estabelecimentos", criarEstabelecimento);

// Login
router.post("/estabelecimentos/login", loginEstabelecimento);

router.get("/estabelecimentos", todosEstabelecimento);

export default router;
