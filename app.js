const express = require("express");
const { v4 } = require("uuid");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const url = "https://bank.gov.ua/NBU_Exchange/exchange?json";

app.use(express.json());
app.use(cors());

app.get("/api", (req, res) => {
  const path = `/api/item/${v4()}`;
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

app.get("/api/item/:slug", (req, res) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
});

app.get("/api/currency/nbu", async (req, res) => {
  const response = await fetch(url);
  const data = await response.text();

  // res.send(`<div>${data}</div> `);
  return res.send(data);
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json(err.message || { message: "Server Internal Error" });
});

module.exports = app;
