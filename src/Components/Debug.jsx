import React, { useEffect, useState } from "react";

export default function Debug() {
  const [message, setMessage] = useState();
  const connect = async () => {
    const m = JSON.stringify(message);
    console.log(m);
    const response = await fetch(
      `http://localhost:8888/.netlify/functions/hello/`,
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          method: "post",
          url: `https://sharp-clarke-8f329a.netlify.app/.netlify/functions/hello/`,
          req: m,
        }), // body data type must match "Content-Type" header
      }
    );

    const body = await response.json();
    console.log(body);
    return body;
  };

  useEffect(() => {
    let options = {
      minResults: 20,
      maxResults: 40,
    };

    let params = {
      keywords: "verdun",
      locationId: 1700281, // Same as kijiji.locations.MONTREAL
      categoryId: 34, // Same as kijiji.categories.CARS_AND_VEHICLES
      minPrice: 1000,
      maxPrice: 1050,
      adType: "OFFER",
      sortByName: "priceAsc", // Show the cheapest listings first
    };
    const message = { options, params };
    setMessage(message);
  }, []);
  useEffect(() => {
    console.log(message);
  }, [message]);
  const inputs = () => {
    return Object.keys(message.params).map((el, i) => {
      return (
        <div key={`bw${i}`}>
          <label>{el}</label>
          <input
            value={message["params"][el]}
            onChange={(e) => {
              const newVal = (message["params"][el] = e.target.value);
              const newMes = {
                ...message,
                ["params"]: { ...message["params"], [el]: newVal },
              };
              setMessage(newMes);
            }}
          />
        </div>
      );
    });
  };
  return (
    <div>
      <div>Debug</div>
      <div>{message ? inputs() : null}</div>
      <button onClick={() => connect()}>Fetch</button>
    </div>
  );
}
