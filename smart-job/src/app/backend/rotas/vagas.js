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

module.exports = routes;
