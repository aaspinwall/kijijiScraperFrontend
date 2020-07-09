const fetch = require("axios").default;
const kijiji = require("kijiji-scraper");

let options = {
  minResults: 20,
  maxResults: 40,
};

let params = {
  keywords: "verdun",
  locationId: 1700281, // Same as kijiji.locations.MONTREAL
  categoryId: 34, // Same as kijiji.categories.CARS_AND_VEHICLES
  minPrice: 1000,
  maxPrice: 1500,
  adType: "OFFER",
  sortByName: "priceAsc", // Show the cheapest listings first
};

exports.handler = async (event, context, callback) => {
  const connect = async () => {
    const results = await kijiji.search(params, options);
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(results),
    };
  };

  //const body = await JSON.parse();
  const res = await connect();
  return res;
};
