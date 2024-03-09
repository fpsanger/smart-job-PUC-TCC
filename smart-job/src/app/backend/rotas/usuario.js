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

routes.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  const trabalhador = await sql.query(
    `SELECT * FROM Trabalhador WHERE Email = '${email}' AND Senha = '${senha}'`
  );

  const empresa = await sql.query(
    `SELECT * FROM Empresa WHERE Email = '${email}' AND Senha = '${senha}'`
  );

  if (trabalhador.recordset.length !== 0) {
    res.json({
      success: true,
      message: "Login feito com sucesso",
      user: trabalhador.recordset[0].CPF,
    });
  } else if (empresa.recordset.length !== 0) {
    res.json({
      success: true,
      message: "Login feito com sucesso",
      user: empresa.recordset[0].CNPJ,
    });
  } else {
    res
      .status(401)
      .json({ success: false, message: "Senha ou usuário inválido" });
  }
});

routes.post("/redefinir-senha", async (req, res) => {
  const { Email, Senha } = req.body;

  const result = await sql.query(
    `UPDATE Trabalhador SET Senha = '${Senha}' WHERE Email = '${Email}' `
  );
  console.log(result);

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
routes.get("/trabalhador", async (req, res) => {
  try {
    const results = await sql.query(`SELECT * FROM Trabalhador`);
    res.status(200).json(results.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// retorna o trabalhador pelo cpf
routes.get("/trabalhador/:cpf", async (req, res) => {
  const data = req.params.cpf;
  try {
    const results = await sql.query(
      `SELECT * FROM Trabalhador WHERE CPF = '${data}'`
    );
    res.status(200).json(results.recordset[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// retorna a empresa pelo cnpj
routes.get("/empresa/:cnpj", async (req, res) => {
  const data = req.params.cnpj;
  try {
    const results = await sql.query(
      `SELECT * FROM Empresa WHERE CNPJ = '${data}'`
    );
    res.status(200).json(results.recordset[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// retorna todas as empresas
routes.get("/empresa", async (req, res) => {
  try {
    const results = await sql.query(`SELECT * FROM Empresa`);
    res.status(200).json(results.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = routes;
