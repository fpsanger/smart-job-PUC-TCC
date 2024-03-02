const express = require("express");

const routes = express.Router();

// adiciona novo usuário
routes.post("/", (req, res) => {
  const dados = req.body;

  res
    .status(201)
    .json({
      mensagem: "Usuário adicionado com sucesso",
      dadosRecebidos: dados,
    });
});

module.exports = routes;
