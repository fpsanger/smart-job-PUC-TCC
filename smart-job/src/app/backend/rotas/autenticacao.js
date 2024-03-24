const express = require("express");
const sql = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const routes = express.Router();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "secret",
};

passport.use(
  new JwtStrategy(options, async (payload, done) => {
    const userId = payload.id;

    let user = await sql.query(
      `SELECT * FROM Trabalhador WHERE Id = '${userId}'`
    );

    if (user.recordset.length > 0) {
      return done(null, user.recordset[0]);
    }

    user = await sql.query(`SELECT * FROM Empresa WHERE Id = '${userId}'`);

    if (user.recordset.length > 0) {
      return done(null, user.recordset[0]);
    }

    return done(null, null);
  })
);

routes.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  const trabalhador = await sql.query(
    `SELECT * FROM Trabalhador WHERE Email = '${email}'`
  );

  const empresa = await sql.query(
    `SELECT * FROM Empresa WHERE Email = '${email}'`
  );

  if (trabalhador.recordset.length !== 0) {
    const user = trabalhador.recordset[0];

    if (!user || !bcrypt.compareSync(senha, user.Senha)) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const payload = {
      id: user.Id,
      isTrabalhador: true,
      permissao: "trabalhador",
      nome: user.Nome,
      email: user.Email,
      telefone: user.Telefone,
    };
    const token = jwt.sign(payload, options.secretOrKey);

    res.json({
      success: true,
      message: "Login feito com sucesso",
      token: token,
      user: {
        idUsuario: user.Id,
        isTrabalhador: true,
        permissao: "trabalhador",
      },
    });
  } else if (empresa.recordset.length !== 0) {
    const user = empresa.recordset[0];

    if (!user || !bcrypt.compareSync(senha, user.Senha)) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const payload = {
      id: user.Id,
      isTrabalhador: false,
      permissao: "empresa",
      nome: user.Nome,
      email: user.Email,
      telefone: user.Telefone,
    };
    const token = jwt.sign(payload, options.secretOrKey);

    res.json({
      success: true,
      message: "Login feito com sucesso",
      token: token,
      user: {
        idUsuario: user.Id,
        isTrabalhador: false,
        permissao: "empresa",
      },
    });
  } else {
    res
      .status(401)
      .json({ success: false, message: "Senha ou usuário inválido" });
  }
});

module.exports = routes;
