const kijijiScraper = require("./kijijiScraper");
const kijiji = require("./kijiji");

const url =
  "https://www.kijiji.ca/b-ville-de-montreal/verdun/k0l1700281?ll=45.501689%2C-73.567256&address=Montr%C3%A9al%2C+QC&radius=20.0&dc=true";

const runScraper = async () => {
  const getData = async list => {
    return Promise.all(
      list.map((item, i) => {
        if (i < list.length) {
          return kijiji(item);
        }
      })
    );
  };
  const scraper = new kijijiScraper(url);
  const body = await scraper.getBody();
  const links = await scraper.getLinks();
  console.log(`Fetched ${links.length} links`);
  const scrapedResults = await getData(links).then(data => {
    //console.log(data);
    return data;
  });
  return Promise.resolve(scrapedResults);
};

//const bigresult = runScraper();
