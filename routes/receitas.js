const express = require("express");
const router = express.Router();
const {
    findAllReceitas,
    findReceitaById,
    saveReceita,
    updateReceita,
    deleteReceita,
} = require("../database/receitas");


module.exports= {
    router
}
