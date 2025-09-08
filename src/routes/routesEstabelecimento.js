import express from "express";
import { criarEstabelecimento, EstabelecimentoSlug, loginEstabelecimento, todosEstabelecimento } from "../controllers/controllerEstabelecimento.js";


const router = express.Router();

// Cadastro
router.post("/estabelecimentos", criarEstabelecimento);

// Login
router.post("/estabelecimentos/login", loginEstabelecimento);

router.get("/estabelecimentos", todosEstabelecimento);

router.get("/estabelecimentos/:slug", EstabelecimentoSlug);


export default router;
