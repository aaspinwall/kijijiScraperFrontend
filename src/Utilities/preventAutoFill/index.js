export const preventAutoFill = () => {
  const inputs = document.getElementsByTagName("input");
  Object.values(inputs).forEach((v) => {
    v.autocomplete = "off";
    v.ariaAutoComplete = "off";
  });
};
