const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const kAPI = require("./kAPI");
const db = require("./db");
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

app.post("/", (req, res) => {
  const query = req.body;
  console.log(query);
  res.send(JSON.stringify("POST received"));
});

app.get("/", (req, res) => {
  const options = { connected: true };
  console.log(req.body);
  res.send(JSON.stringify(options));
});

app.post("/search", (req, res) => {
  let query = {
    params: req.body.params,
    options: req.body.options,
  };

  try {
    //const {params, options} = query.body

    const searchKijiji = async (query, res) => {
      //Wait for the scraping that returns the object
      const searchResult = await new kAPI(query);
      //Clean up the data
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
      db.newSearch("public", { query, results });
      res.send(JSON.stringify(results));
    };
    searchKijiji(query, res);
  } catch (error) {
    console.log("//// error on search");
    res.send(JSON.stringify(error));
  }
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

app.post("/public", (req, res) => {
  const response = async (path = { path: "users/public/searches" }) => {
    //Get the async response from database
    await db.readPublicData(path, (response) =>
      res.send(JSON.stringify(response))
    );
  };
  console.log(req.body);
  response(req.body);
});

app.get("/test", (req, res) => {
  //Get request body
  res.send(JSON.stringify({ message: "You connected!!" }));
});

app.post("/walkscore", (req, res) => {
  const apiKey = "144a9e29e7c6ce77340eb291ef0b23ab";
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
