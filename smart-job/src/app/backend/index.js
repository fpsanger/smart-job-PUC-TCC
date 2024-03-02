const express = require("express");
const sql = require("mssql");

const app = express();

const config = {
  server: "CGL-SP-WK082",
  database: "Smart_Job",
  user: "smartJob",
  password: "123456",
  options: {
    trustServerCertificate: true,
  },
};

sql
  .connect(config)
  .then(() => {
    console.log("Conexão bem-sucedida ao banco de dados SQL Server");
  })
  .catch((err) => {
    console.error("Erro ao conectar ao banco de dados:", err);
  });

const usuarioRoute = require("./rotas/usuario");

app.use("/usuario", usuarioRoute);

app.use(express.json());

app.listen(3000, () => {
  console.log("Servidor Express rodando na porta 3000");
});
