const express = require("express");
const sql = require("../db");

const routes = express.Router();

// retorna todas as vagas
routes.get("/", async (req, res) => {
  try {
    const results = await sql.query("SELECT * FROM Vaga");
    res.status(200).json(results.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// retorna todas as vagas ativas
routes.get("/ativo", async (req, res) => {
  try {
    const results = await sql.query("SELECT * FROM Vaga WHERE ATIVO = 1 ");
    res.status(200).json(results.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// retorna uma vaga pelo id
routes.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const results = await sql.query(`SELECT * FROM Vaga WHERE Id = '${id}'`);
    res.status(200).json(results.recordset[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// retorna as vagas ativas de uma empresa
routes.get("/empresa/:id", async (req, res) => {
  const idEmpresa = req.params.id;
  try {
    const results = await sql.query(
      `SELECT * FROM Vaga v 
      WHERE IdEmpresa = '${idEmpresa}' AND ATIVO = 1`
    );
    res.status(200).json(results.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// retorna as vagas e quantidade de trabalhadores em cada uma por empresa
routes.get("/empresa/trabalhador/:id", async (req, res) => {
  const idEmpresa = req.params.id;
  try {
    const results = await sql.query(
      `SELECT v.Id, v.Nome, COUNT(TrabalhadorVaga.IdTrabalhador) AS ContagemTrabalhadores, SUM(v.Remuneracao) as remuneracaoTotal
      FROM Vaga v
      LEFT JOIN TrabalhadorVaga ON v.Id = TrabalhadorVaga.IdVaga
      WHERE v.IdEmpresa = '${idEmpresa}'
      GROUP BY v.Id, v.Nome;`
    );
    res.status(200).json(results.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// retorna as vagas atribuidas a um trabalhador
routes.get("/trabalhador/:id", async (req, res) => {
  const idTrabalhador = req.params.id;
  try {
    const results = await sql.query(
      `SELECT * FROM Vaga v
      JOIN TrabalhadorVaga tg ON tg.IdVaga = v.Id
      WHERE tg.IdTrabalhador = '${idTrabalhador}' `
    );
    res.status(200).json(results.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// adiciona uma vaga nova
routes.post("/", (req, res) => {
  const data = req.body;

  try {
    const query = `INSERT INTO [dbo].[Vaga] (Nome, Descricao, Remuneracao, Endereco, Estado, Cidade, Ativo, TipoVaga, DataAtualizacao, DataExpiracao, IdEmpresa) VALUES ('${data.Nome}', '${data.Descricao}', '${data.Remuneracao}', '${data.Endereco}', '${data.Estado}', '${data.Cidade}', '${data.Ativo}', '${data.TipoVaga}', '${data.DataAtualizacao}', '${data.DataExpiracao}', '${data.IdEmpresa}')`;
    sql.query(query, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ mensagem: "Erro ao adicionar vaga", err });
      }
      res.status(201).json({
        mensagem: "Vaga adicionada com sucesso",
        id: result.insertId,
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// adiciona uma vaga nova
routes.put("/editar/:idVaga", (req, res) => {
  const idVaga = req.params.idVaga;
  const data = req.body;

  try {
    const query = `UPDATE [dbo].[Vaga] SET Nome = '${data.Nome}', Descricao = '${data.Descricao}', Remuneracao = '${data.Remuneracao}', Endereco = '${data.Endereco}', Estado = '${data.Estado}', Cidade = '${data.Cidade}', Ativo = '${data.Ativo}', TipoVaga = '${data.TipoVaga}', DataAtualizacao = '${data.DataAtualizacao}', DataExpiracao =  '${data.DataExpiracao}' WHERE Id ='${idVaga}'`;
    sql.query(query, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ mensagem: "Erro ao adicionar vaga", err });
      }
      res.status(201).json({
        mensagem: "Vaga adicionada com sucesso",
        id: result.insertId,
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// remove uma vaga
routes.put("/:idVaga", (req, res) => {
  const idVaga = req.params.idVaga;

  try {
    const query = ` UPDATE VAGA SET Ativo = 0 WHERE Id ='${idVaga}'`;
    sql.query(query, (err, result) => {
      if (err) {
        return res.status(500).json({ mensagem: "Erro ao apagar vaga", err });
      }
      res.status(201).json({
        mensagem: "Vaga apagada com sucesso",
        id: result.insertId,
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// atribui a vaga a um trabalhador
routes.post("/atribuirVaga", (req, res) => {
  const data = req.body;

  try {
    const query = `INSERT INTO [dbo].[TrabalhadorVaga] (IdVaga,IdTrabalhador,DataAceite) VALUES ('${data.idVaga}', '${data.idTrabalhador}', '${data.dataAceite}')`;
    sql.query(query, (err, result) => {
      if (err) {
        return res.status(500).json({ mensagem: "Erro ao atribuir vaga" });
      }
      res.status(201).json({
        mensagem: "Vaga atribuída com sucesso",
        id: result.insertId,
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = routes;
