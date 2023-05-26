const prisma = require("./prisma");

const findEmail = (email) =>{
    return prisma.users.findUnique({
        where: {
            email,
        }
    });
}

const findUserId = (id)=>{
    return prisma.users.findUnique({
        where:{
            id
        },
        select: {
            id: true,
            name: true,
            email: true,
            senha: false,
        }
    });
}

const saveUser = (user) =>{
    return prisma.users.create({
        data: {
            name: user.name,
            email: user.email,
            senha: user.senha,
        }
    });
}

module.exports ={
    findEmail,
    findUserId,
    saveUser,
}