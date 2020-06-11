const stringSimilarity = require("string-similarity");
const data = require("./testData");

data.forEach(element => {
  const ref = data[0].description;
  console.log(stringSimilarity.compareTwoStrings(ref, element.description));
  element;
});
