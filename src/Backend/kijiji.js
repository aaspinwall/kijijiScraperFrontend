const kijiji = require("kijiji-scraper");

// Scrape using returned promise
async function getAdd(url) {
  let ad = await kijiji.Ad.Get(url);
  return {
    title: ad.title,
    description: ad.description,
    date: ad.date,
    images: ad.images,
    attributes: ad.attributes,
  };
}
module.exports = getAdd;
