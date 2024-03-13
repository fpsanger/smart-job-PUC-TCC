const express = require("express");
const cors = require("cors");
const passport = require("passport");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

const usuarioRoute = require("./rotas/usuario");
const vagasRoute = require("./rotas/vagas");
const autenticacaoRoute = require("./rotas/autenticacao");

app.use("/usuario", usuarioRoute);
app.use("/vagas", vagasRoute);
app.use("/autenticacao", autenticacaoRoute);

app.listen(3000, () => {
  console.log("Servidor Express rodando na porta 3000");
});
