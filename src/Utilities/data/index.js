import _ from "lodash";

export const check = (data) => {
  return !(_.isEmpty(data) || data.hasOwnProperty("error"));
};
