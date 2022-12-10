/* eslint-disable */
export default function isValidDomain(string) {
  let regex = new RegExp(
    /^(?!-)[A-Za-z0-9-]+([\-\.]{1}[a-z0-9]+)*\.[A-Za-z]{2,6}$/
  );

  if (regex.test(string)) {
    return true;
  } else {
    return false;
  }
}
