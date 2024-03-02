const express = require("express");
const cors = require("cors");
const app = express();

const usuarioRoute = require("./rotas/usuario");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/usuario", usuarioRoute);

app.listen(3000, () => {
  console.log("Servidor Express rodando na porta 3000");
});
