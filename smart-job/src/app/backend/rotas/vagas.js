const express = require("express");
const sql = require("../db");

const routes = express.Router();

routes.get("/", async (req, res) => {
  try {
    const results = await sql.query("SELECT * FROM Vaga");
    res.status(200).json(results.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

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
