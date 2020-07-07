//To router
const fetch = require("axios").default;

exports.handler = async (event, context, callback) => {
  const connect = async (body) => {
    console.log(typeof body, body);
    const { message } = body;

    const request = await fetch.get(message);

    console.log(request.data, typeof request.data);
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
  const bod = await JSON.parse(event.body);
  const bd = await connect(bod);
  return bd;

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: "ok" }),
  };
};
