const web = require("./website/web.js");
const webhook = require("./webhook.js");
const parser = require("body-parser");
const express = require("express");
const path = require("path");

const app = express();
app.use(parser.json());
app.use(express.static("website"));

app.get("/config.json", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./config.json"));
});
app.get("/", (req, res) => {
  web.html(res);
});

app.get("/webhook", (req, res) => {
  web.verify(req, res);
});

app.post("/webhook", (req, res) => {
  setTimeout(() => {
    webhook.listen(req.body);
  }, 5000);
  res.sendStatus(200);
});

module.exports = app;
