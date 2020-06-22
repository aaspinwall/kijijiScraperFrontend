const serverless = require("serverless-http");
const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const kAPI = require("./kAPI");
const db = require("./db");
require("dotenv").config();

const local = true;

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/", (req, res) => {
  const query = req.body;
  console.log(query);
  res.send(JSON.stringify("POST received"));
});

app.get("/", (req, res) => {
  const options = { scrape: "scrape" };
  console.log(req.body);
  res.send(JSON.stringify(options));
});

app.post("/search", (req, res) => {
  let query = {
    params: req.body.params,
    options: req.body.options,
  };
  const searchKijiji = async (query, res) => {
    //Wait for the scraping that returns the object
    const searchResult = await new kAPI(query);
    const results = Object.keys(searchResult).map((key) => {
      const element = searchResult[key];
      const {
        title,
        url,
        description,
        date,
        image,
        images,
        attributes,
      } = element;

      return { title, url, description, date, image, images, attributes };
    });
    //Respond with the result
    db.writeUserData("aaspinwall", results);
    res.send(JSON.stringify(results));
  };
  searchKijiji(query, res);
});

app.post("/users", (req, res) => {
  const response = async () => {
    //Get the async response from database
    const dbValues = await db.readUserData(username);
    res.send(JSON.stringify(dbValues));
  };
  console.log(req.body);
  const username = req.body.username;
  response();
});

app.get("/test", (req, res) => {
  //Get request body
  res.send(JSON.stringify({ message: "You connected!!" }));
});

app.post("/walkscore", (req, res) => {
  const apiKey = process.env.WALKSCORE;
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

local
  ? app.listen(port, () =>
      console.log(`Example app listening on port ${port}!`)
    )
  : (module.exports.handler = serverless(app));
