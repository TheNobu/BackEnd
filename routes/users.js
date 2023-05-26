const express = require("express");
const router = express.Router();
const {
    findEmail, 
    findUserId, 
    saveUser,
} = require("../database/users");
const z = require("zod")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = z.object({
    name: z.string().min(),
    email: z.string().email(),
    senha: z.string().min(),
  });


router.get("/users/:id",async(req,res)=>{
    const user = await findUserId(req.user.id);
    res.json({
        user,
    })
})

router.post("/register",async(req,res)=>{
    try {
        const user = userSchema.parse(req.body);
        const isEmailUsed = await findEmail(user.email);
        if(isEmailUsed)
            return res.status(400).json({
                message: "Email already is being used"
            });
        const hashSenha = bcrypt.hashSync(req.body.senha);
        user.senha = hashSenha;
        const savedUser = await saveUser(user);
        delete savedUser.senha;
        res.status(201).json({
            user: savedUser,
        });
    } catch (err) {
      if(err instanceof z.ZodError)
        return res.status(422).json({
            message: err.errors,
        });
        res.status(500).json({
            message: "Server Error"
        });
    }  
});

module.exports = {
    router
}