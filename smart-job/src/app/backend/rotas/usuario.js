const express = require("express");
const sql = require("../db");

const routes = express.Router();

// adiciona novo usuário
routes.post("/", (req, res) => {
  const data = req.body;

  if (data.cpf) {
    const query = `INSERT INTO [dbo].[Trabalhador] (Nome, Email, CPF, Senha, Telefone, Ativo) VALUES ('${data.nome}', '${data.email}', '${data.cpf}', '${data.senha}', '${data.telefone}', '${data.ativo}')`;
    sql.query(query, (err, result) => {
      if (err) {
        console.error("Erro ao inserir usuário:", err);
        return res.status(500).json({ mensagem: "Erro ao inserir usuário" });
      }
      res.status(201).json({
        mensagem: "Usuário inserido com sucesso",
        id: result.insertId,
      });
    });
  } else {
    const query = `INSERT INTO [dbo].[Empresa] (Nome, Email, CNPJ, Senha, Telefone, Ativo) VALUES ('${data.nome}', '${data.email}', '${data.cnpj}', '${data.senha}', '${data.telefone}', '${data.ativo}')`;
    sql.query(query, (err, result) => {
      if (err) {
        console.error("Erro ao inserir usuário:", err);
        return res.status(500).json({ mensagem: "Erro ao inserir usuário" });
      }
      res.status(201).json({
        mensagem: "Usuário inserido com sucesso",
        id: result.insertId,
      });
    });
  }
});

module.exports = routes;
