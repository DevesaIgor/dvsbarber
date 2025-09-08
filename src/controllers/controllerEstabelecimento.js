import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import slugify from "slugify";

const prisma = new PrismaClient();

// Criar um novo estabelecimento
const criarEstabelecimento = async (req, res) => {
  try {
    const { nome, email, senha, telefone, endereco } = req.body;

    // Gerar slug único a partir do nome
    let slug = slugify(nome, { lower: true, strict: true });

    // Verificar se já existe algum estabelecimento com o mesmo slug
    const slugExistente = await prisma.estabelecimento.findUnique({
      where: { slug },
    });

    if (slugExistente) {
      // Adicionar sufixo numérico para garantir unicidade
      const random = Math.floor(Math.random() * 1000);
      slug = `${slug}-${random}`;
    }

    // Gerar hash da senha
    const senhaHash = await bcrypt.hash(senha, 10);

    // Criar estabelecimento no banco
    const estabelecimento = await prisma.estabelecimento.create({
      data: {
        nome,
        slug,
        email,
        senhaHash,
        telefone,
        endereco,
      },
    });

    res.status(201).json({
      id: estabelecimento.id,
      nome: estabelecimento.nome,
      slug: estabelecimento.slug,
      email: estabelecimento.email,
    });
    console.log(error);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao criar estabelecimento" });
  }
};

// Login do estabelecimento
const loginEstabelecimento = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const estab = await prisma.estabelecimento.findUnique({
      where: { email },
    });

    if (!estab) return res.status(404).json({ error: "Email não encontrado" });

    const senhaValida = await bcrypt.compare(senha, estab.senhaHash);
    if (!senhaValida) return res.status(401).json({ error: "Senha incorreta" });

    // Aqui você poderia gerar um JWT
    res.json({ message: "Login realizado com sucesso", slug: estab.slug });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro no login" });
  }
};

const todosEstabelecimento = async (req, res) => {
    try {
        const estabelecimentos = await prisma.estabelecimento.findMany();

        res.status(200).json(estabelecimentos);
    } catch (error) {
        res.status(404).json(error)
    }
};


// GET /api/estabelecimentos/:slug
const EstabelecimentoSlug = async (req, res) => {
  const { slug } = req.params;
  const estabelecimento = await prisma.estabelecimento.findUnique({
    where: { slug }
  });

  if(!estabelecimento) return res.status(404).json({ error: "Estabelecimento não encontrado" });

  res.json(estabelecimento);
};

// POST /api/clientes
/*app.post("/api/clientes", async (req, res) => {
  const { nome, email, senha, estabelecimentoId } = req.body;

  const cliente = await prisma.cliente.create({
    data: {
      nome,
      email,
      senha, // ideal hash com bcrypt
      estabelecimentoId
    }
  });

  res.json(cliente);
});*/


export { loginEstabelecimento, criarEstabelecimento, todosEstabelecimento, EstabelecimentoSlug };