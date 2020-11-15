export const isNullOrEmpty = (string) => {
  return string === undefined || string === null || string.trim() === "";
};

export function tryParseInt(str, defaultValue) {
  var retValue = defaultValue;
  if (str !== null) {
    if (str.length > 0) {
      if (!isNaN(str)) {
        retValue = parseInt(str);
      }
    }
  }
  return retValue;
}
