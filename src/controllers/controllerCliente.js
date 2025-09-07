import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const NovoCliente = async(req, res) => {
    const { nome, telefone, email, senha, estabelecimentoId } = req.body;

    try {
        const cliente = await prisma.cliente.create({
            data: {
                nome,
                telefone,
                email,
                senha,
                estabelecimentoId
            }
        })
    } catch (error) {
        
    }
}


export default NovoCliente;