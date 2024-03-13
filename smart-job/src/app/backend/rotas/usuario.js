const express = require("express");
const sql = require("../db");
const bcrypt = require("bcryptjs");
const passport = require("passport");

const routes = express.Router();

// adiciona novo usuário
routes.post("/", (req, res) => {
  const data = req.body;

  if (data.cpf) {
    const hashedSenha = bcrypt.hashSync(data.senha, 10);
    const hashedNumeroDoc = bcrypt.hashSync(data.senha, 10);

    const query = `INSERT INTO [dbo].[Trabalhador] (Nome, Email, CPF, Senha, Telefone, Ativo) VALUES ('${data.nome}', '${data.email}', '${hashedNumeroDoc}', '${hashedSenha}', '${data.telefone}', '${data.ativo}')`;
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
    const hashedSenha = bcrypt.hashSync(data.senha, 10);
    const hashedNumeroDoc = bcrypt.hashSync(data.senha, 10);

    const query = `INSERT INTO [dbo].[Empresa] (Nome, Email, CNPJ, Senha, Telefone, Ativo) VALUES ('${data.nome}', '${data.email}', '${hashedNumeroDoc}', '${hashedSenha}', '${data.telefone}', '${data.ativo}')`;
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

routes.post("/redefinir-senha", async (req, res) => {
  const { Email, Senha } = req.body;

  const hashedPassword = bcrypt.hashSync(Senha, 10);

  const result = await sql.query(
    `UPDATE Trabalhador SET Senha = '${hashedPassword}' WHERE Email = '${Email}' `
  );

  if (result.rowsAffected.length > 0) {
    res.json({ success: true, message: "Senha editada com sucesso" });
  } else {
    res.status(401).json({
      success: false,
      message: "Algo de erro aconteceu, tente novamente",
    });
  }
});

// retorna todos os trabalhadores
routes.get(
  "/trabalhador",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const results = await sql.query(`SELECT * FROM Trabalhador`);
      res.status(200).json(results.recordset);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
);

// retorna o trabalhador pelo id
routes.get(
  "/trabalhador/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const data = req.params.id;
    try {
      const results = await sql.query(
        `SELECT * FROM Trabalhador WHERE Id = '${data}'`
      );
      res.status(200).json(results.recordset[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
);

// retorna a empresa pelo id
routes.get(
  "/empresa/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const data = req.params.id;
    try {
      const results = await sql.query(
        `SELECT * FROM Empresa WHERE Id = '${data}'`
      );
      res.status(200).json(results.recordset[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
);

// // retorna a empresa pelo cnpj
// routes.get("/empresa/:cnpj", async (req, res) => {
//   const data = req.params.cnpj;
//   try {
//     const results = await sql.query(
//       `SELECT * FROM Empresa WHERE CNPJ = '${data}'`
//     );
//     res.status(200).json(results.recordset[0]);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Server error");
//   }
// });

// retorna todas as empresas
routes.get(
  "/empresa",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const results = await sql.query(`SELECT * FROM Empresa`);
      res.status(200).json(results.recordset);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
);

module.exports = routes;
