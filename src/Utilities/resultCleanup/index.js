import { compareTwoStrings } from "string-similarity";

export const formatTitle = (str) => {
  const regex = /[^a-zA-Z0-9 àâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ&\/]/g;
  const cleanStr = str.replace(regex, " ");
  return cleanStr[0] + cleanStr.slice(1).toLowerCase();
};

export const removeDuplicates = (arr) => {
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

export const applyWordFilter = (title, blacklist) => {
  return blacklist.every((word) => {
    //Check if it passes all the filteredWords and doesn't contain special characters
    const noWordFound = title.toLowerCase().search(word) === -1;
    return noWordFound;
  });
};

export const checkValid = (adObject, blacklist) => {
  //shoud only return true or false after all conditions are checked
  const { title } = adObject;
  console.log(formatTitle(title));
  return applyWordFilter(title, blacklist);
};

export const formatResults = (rawResults, blacklist) => {
  const filtered = rawResults.filter((adObject) => {
    return checkValid(adObject, blacklist);
  });

  const noDuplicates = removeDuplicates(filtered);

  //loop through results

  //
  return rawResults;
  //TODO
  //Get rid of ads with blacklisted words on the title
  //applyWordFilter(adObject, blacklist);

  //Remove duplicates
  //removeDuplicates(adObject);
  //Format titles
};

//Fix titles
