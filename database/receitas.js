const prisma = ("./prisma");

const findAllReceitas = (more_than) =>{
    return prisma.receitas.findMany({
        where: {
            tempoPreparo: {
                gt: more_than
            }
        }
    })
}

const findReceitaById = (id) =>{
    return prisma.receitas.findFirst({
        where: {
            id: id,
        }
    });
}

const saveReceita = (receita) =>{
    return prisma.receitas.create({
        data: receita
    })
}

const updateReceita = (id,receita) =>{
    return prisma.receitas.update({
        where: {
            id,
        },
        data: receita
    })
}

const deleteReceita = (id)=>{
    return prisma.receitas.delete({
        where: {
            id: id
        }
    })
}

module.exports = {
    findAllReceitas,
    findReceitaById,
    saveReceita,
    updateReceita,
    deleteReceita,
}