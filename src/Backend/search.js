const serverless = require("serverless-http");
const express = require("express");
const app = express();
//const port = 5000;
const bodyParser = require("body-parser");
const kAPI = require("./kAPI");
const db = require("./db");

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/search", (req, res) => {
  const params = req.body.params;
  const options = req.body.options;
  //console.log(keywords);
  let query = {
    options: options,
    params: params,
  };
  const searchKijiji = async (query, res) => {
    //Wait for the scraping that returns the object
    const searchResult = await new kAPI(query);
    let links = [];
    for (const key in searchResult) {
      if (searchResult.hasOwnProperty(key)) {
        const element = searchResult[key];
        const adObject = {
          title: element.title,
          url: element.url,
          description: element.description,
          date: element.date,
          image: element.image,
          images: element.images,
          attributes: element.attributes,
        };
        links.push(adObject);
      }
    }
    //Respond with the result

    db.writeUserData("aaspinwall", links);
    res.send(JSON.stringify(links));
  };
  searchKijiji(query, res);
});

module.exports.handler = serverless(app);

//app.listen(port, () => console.log(`Example app listening on port ${port}!`));
