const express = require("express");
const sql = require("../db");
const passport = require("passport");

const routes = express.Router();

// retorna todas as vagas
routes.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const results = await sql.query("SELECT * FROM Vaga");
      res.status(200).json(results.recordset);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
);

// retorna todas as vagas ativas e com vagas disponíveis
routes.get(
  "/ativo",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const results = await sql.query(
        "SELECT v.* FROM Vaga v LEFT JOIN (SELECT IdVaga, COUNT(*) AS NumTrabalhadores FROM TrabalhadorVaga GROUP BY IdVaga ) tv ON v.Id = tv.IdVaga WHERE v.ATIVO = 1 AND (tv.NumTrabalhadores IS NULL OR tv.NumTrabalhadores < v.LimiteTrabalhadores) AND tv.IdVaga IS NULL"
      );
      res.status(200).json(results.recordset);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
);

// retorna uma vaga pelo id
routes.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const id = req.params.id;
    try {
      const results = await sql.query(`SELECT * FROM Vaga WHERE Id = '${id}'`);
      res.status(200).json(results.recordset[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
);

// retorna as vagas ativas de uma empresa
routes.get(
  "/empresa/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
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
  }
);

// retorna as vagas e quantidade de trabalhadores em cada uma por empresa
routes.get(
  "/empresa/trabalhador/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const idEmpresa = req.params.id;
    try {
      const results = await sql.query(
        `SELECT v.Id, v.Nome, COUNT(TrabalhadorVaga.IdTrabalhador) AS ContagemTrabalhadores, SUM(v.Remuneracao) as RemuneracaoTotal
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
  }
);

// retorna as vagas atribuidas a um trabalhador
routes.get(
  "/trabalhador/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const idTrabalhador = req.params.id;
    try {
      const results = await sql.query(
        `SELECT v.*,tg.[Status] as TrabalhadorStatus,tg.DataAceite FROM Vaga v
      JOIN TrabalhadorVaga tg ON tg.IdVaga = v.Id
      WHERE tg.IdTrabalhador = '${idTrabalhador}' `
      );
      res.status(200).json(results.recordset);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
);

// adiciona uma vaga nova
routes.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
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
  }
);

// edita uma vaga
routes.put(
  "/editar/:idVaga",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const idVaga = req.params.idVaga;
    const data = req.body;

    try {
      const query = `UPDATE [dbo].[Vaga] SET Nome = '${data.Nome}', Descricao = '${data.Descricao}', Remuneracao = '${data.Remuneracao}', Endereco = '${data.Endereco}', Estado = '${data.Estado}', Cidade = '${data.Cidade}', Ativo = '${data.Ativo}', TipoVaga = '${data.TipoVaga}', DataAtualizacao = '${data.DataAtualizacao}', DataExpiracao =  '${data.DataExpiracao}', LimiteTrabalhadores =  '${data.LimiteTrabalhadores}' WHERE Id ='${idVaga}'`;
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
  }
);

// remove uma vaga
routes.put(
  "/:idVaga",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
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
  }
);

// atribui a vaga a um trabalhador
routes.post("/atribuirVaga", (req, res) => {
  const data = req.body;

  try {
    const query = `INSERT INTO [dbo].[TrabalhadorVaga] (IdVaga,IdTrabalhador,DataAceite) VALUES ('${data.idVaga}', '${data.idTrabalhador}', '${data.dataAceite}')`;
    sql.query(query, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ mensagem: "Você já está cadastrado nessa vaga" });
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

// deletar vaga do trabalhador
routes.delete(
  "/:idTrabalhador/:idVaga",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const idTrabalhador = req.params.idTrabalhador;
    const idVaga = req.params.idVaga;

    try {
      const query = `DELETE FROM TrabalhadorVaga WHERE IdVaga ='${idVaga}' AND IdTrabalhador ='${idTrabalhador}'`;
      sql.query(query, (err, result) => {
        res.status(200).json({
          mensagem: "Vaga excluída com sucesso",
        });
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
);

// alterar status da vaga
routes.put(
  "/status/:idVaga",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const idVaga = req.params.idVaga;
    const data = req.body;

    try {
      const query = `UPDATE Vaga SET [Status]='${data.status}' WHERE Id ='${idVaga}'`;
      sql.query(query, (err, result) => {
        res.status(200).json({
          mensagem: "Vaga excluída com sucesso",
        });
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
);

module.exports = routes;
