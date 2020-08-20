import { compareTwoStrings } from "string-similarity";
import isEqual from "lodash/isEqual";
import isEmpty from "lodash/isEmpty";

const formatTitle = (str) => {
  const regex = /[^a-zA-Z0-9 àâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ&\/]/g;
  const cleanStr = str.replace(regex, " ");
  return cleanStr[0] + cleanStr.slice(1).toLowerCase();
};

const removeDuplicates = (arr) => {
  const passSimilarity = (a, b, threshold = 0.7) => {
    const rating = compareTwoStrings(a, b);
    return rating > threshold;
  };

  const filtered = arr.filter((result) => {
    let strikes = 0;
    const reference = result.description;
    const reference2 = result.title;
    if (!reference) {
      console.log(
        "No description on result: ",
        result,
        "Cannot run duplicate filter"
      );
      return;
    }
    arr.forEach((res2) => {
      const comparison = res2.description;
      const comparison2 = res2.title;
      if (
        passSimilarity(comparison, reference) ||
        passSimilarity(comparison2, reference2)
      ) {
        strikes += 1;
      }
    });
    //if (strikes !== 1) console.log("eliminated", result);
    return strikes === 1;
  });

  return filtered;
};

const applyWordFilter = (title, blacklist) => {
  return blacklist.every((word) => {
    //Check if it passes all the filteredWords and doesn't contain special characters
    const noWordFound = title.toLowerCase().search(word) === -1;
    return noWordFound;
  });
};

const checkAttributes = (adObject) => {
  const validKeys = [
    "title",
    "url",
    "description",
    "date",
    "image",
    "images",
    "attributes",
  ].sort();
  const adKeys = Object.keys(adObject).sort();

  //check top level keys
  if (isEqual(validKeys, adKeys)) {
    //check that relevant props aren't empty
    const { date, ...relevantKeys } = adObject;
    return Object.entries(relevantKeys).some(([key, value]) => {
      if (!isEmpty(value)) {
        //check that there are no empty attributes (location, price)
        const { attributes } = relevantKeys;
        if (
          attributes.hasOwnProperty("location") &&
          attributes.hasOwnProperty("price")
        ) {
          return true;
        }
      }
    });
  }
  return false;
};

export const formatResults = (rawResults, blacklist) => {
  //STEP 1. Check that props are valid
  const withValidProps = rawResults.filter((adObject) => {
    return checkAttributes(adObject);
  });

  //STEP 2. Check for words in blacklist
  const passKeywordFilter = withValidProps.filter((adObject) => {
    return applyWordFilter(adObject.title, blacklist);
  });

  //Step 3. Remove duplicates
  const passDuplicates = removeDuplicates(passKeywordFilter);

  //Step 4. Format titles
  const cleanResults = passDuplicates.map((adObject) => {
    return { ...adObject, title: formatTitle(adObject.title) };
  });

  return cleanResults;
};

export const filterAmenities = (amenities) => {
  const arr = ["numberbedrooms", "numberbedrooms", "furnished"];

  const numbered = {};
  const bin = {};
  const rest = {};
  const allKeys = [];
  //prettier-ignore
  const templateKeys = {
    numberbedrooms: { text: "bedrooms", value: "", icon: ""  },
    numberbathrooms: { text: "bathrooms", value: "", icon: ""  },
    petsallowed: { text: "pets allowed", value: "", icon: ""  },
    areainfeet: { text: "area", value: "", icon: ""  },
    furnished: { text: "furnished", value: "", icon: ""  },
    laundryinunit: { text: "laundry inunit", value: "", icon: ""  },
    laundryinbuilding: { text: "laundry in building", value: "", icon: ""  },
    dishwasher: { text: "dishwasher", value: "", icon: ""  },
    fridgefreezer: { text: "fridge", value: "", icon: ""  },
    airconditioning: { text: "air conditioning", value: "", icon: ""  },
    yard: { text: "yard", value: "", icon: ""  },
    balcony: { text: "balcony", value: "", icon: ""  },
    smokingpermitted: { text: "smoking", value: "", icon: ""  },
    gym: { text: "gym", value: "", icon: ""  },
    pool: { text: "pool", value: "", icon: ""  },
    concierge: { text: "concierge", value: "", icon: ""  },
    twentyfourhoursecurity: { text: "security", value: "", icon: ""  },
    bicycleparking: { text: "bicycle parking", value: "", icon: ""  },
    storagelocker: { text: "storagel ocker", value: "", icon: ""  },
    elevator: { text: "elevator", value: "", icon: ""  },
    wheelchairaccessible: { text: "accessible", value: "", icon: ""  },
    braillelabels: { text: "braille labels", value: "", icon: ""  },
    audioprompts: { text: "audio prompts", value: "", icon: ""  },
    visualaids: { text: "visual aids", value: "", icon: ""  },
    hydro: { text: "hydro", value: "", icon: ""  },
    heat: { text: "heat", value: "", icon: ""  },
    water: { text: "water", value: "", icon: ""  },
    cabletv: { text: "cabletv", value: "", icon: ""  },
    internet: { text: "internet", value: "", icon: ""  },
    numberparkingspots: { text: "parking spots", value: "", icon: ""  },
    visits: { text: "visits", value: "", icon: ""  },
  };

  const validKeys = {};

  Object.entries(amenities).forEach(([key, value]) => {
    if (templateKeys.hasOwnProperty(key)) {
      if (value) validKeys[key] = { ...templateKeys[key], value: value };
    }
  });

  console.log(validKeys);
  return validKeys;
};
