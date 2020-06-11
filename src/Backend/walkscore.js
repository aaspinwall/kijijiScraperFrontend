const express = require("express");
const app = express();
const port = 8000;
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
require("dotenv").config();
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const apiKey = process.env.WALKSCORE;
app.post("/", (req, res) => {
  console.log("passed message as", req.body);
  const connect = async (req) => {
    const body = req.body;
    const formattedUrl = `http://api.walkscore.com/score?format=json&address=${body.address}&lat=${body.latitude}&lon=${body.longitude}&transit=1&bike=1&wsapikey=${apiKey}`;
    const request = await fetch(formattedUrl);
    const fetchedBody = await request.json();
    res.send(JSON.stringify(fetchedBody));
  };
  try {
    connect(req);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
