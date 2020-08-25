export const post = async (url, message, callback) => {
  try {
    const req = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ method: "get", url: message }), // body data type must match "Content-Type" header
    });
    //console.log("req:", req);
    const body = await req.json();
    //console.log("The response was: ", body);
    callback(body);
  } catch (error) {
    console.log(error);
    console.log(`Error connecting to ${url}`);
    callback(error);
  }
};
