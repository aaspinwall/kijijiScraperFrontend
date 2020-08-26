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

export const get = async (url, callback) => {
  try {
    const req = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
    });
    const body = await req.json();
    callback(body);
  } catch (error) {
    console.log(
      `Error connecting to ${url} / Load operation triggered this error`
    );
    callback(error);
  }
};

export const search = async (
  message,
  resultsToCallback,
  callbackOnComplete = () => {}
) => {
  const { keywords, maxPrice, minPrice, maxResults } = message;

  const searchQuery = {
    params: {
      keywords: keywords,
      maxPrice: maxPrice,
      minPrice: minPrice,
    },
    options: { maxResults: maxResults },
  };

  //Heroku server
  const hostUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://limitless-cove-26677.herokuapp.com";
  const url = `${hostUrl}/search`;
  try {
    const req = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(searchQuery),
    });
    const body = await req.json();
    resultsToCallback(body);
  } catch (error) {
    const message = `Error connecting to ${url} / Search operation triggered this error`;
    resultsToCallback({ message, error });
    console.log(message);
  } finally {
    callbackOnComplete();
  }
};
