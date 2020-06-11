const cheerio = require("cheerio");
const fetch = require("node-fetch");

class Scraper {
  constructor(url) {
    this.url = url;
    this.links = [];
    //this.getBody(this.url);
  }
  async getBody(self) {
    let bodyText = await fetch(this.url);
    let body = await bodyText.text();
    this.body = body;
    console.log("Fetched successfully");
    return body;
  }
  getLinks(self) {
    const url = this.url;
    function conditions(string) {
      const filteredWords = ["wanted", "swap", "cherche"];
      return [
        //It starts with the term
        string.startsWith("/v-appart"),
        //It does not include the term
        !filteredWords.some(bannedWord => string.includes(bannedWord)),
      ].every(x => x);
    }
    const $ = cheerio.load(this.body);
    const query = $("a").attr("class", "title");
    for (let i = 0; i < query.length; i++) {
      const element = query[i];
      if ("href" in element.attribs) {
        let link = element.attribs.href;
        if (conditions(link)) {
          link = "https://www.kijiji.ca" + link;
          this.links.push(link);
          //console.log(link);
        }
      }
    }
    return this.links;
  }
}

module.exports = Scraper;
