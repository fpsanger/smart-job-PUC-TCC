const sql = require("mssql");

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

module.exports = sql;
