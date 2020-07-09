//To router
const fetch = require("axios").default;

exports.handler = async (event, context, callback) => {
  const connect = async (body) => {
    let request;
    const { req, method, url } = body;
    if (method === "post") {
      request = await fetch.post(url, req);
    } else if (method === "get") {
      request = await fetch.get(url);
    }

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request.data),
    };
  };
  const body = await JSON.parse(event.body);
  const res = await connect(body);
  return res;
};
