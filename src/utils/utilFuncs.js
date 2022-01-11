export const capitaliseString = (str) => {
  return str
    .split("-")
    .map((a) => a[0].toUpperCase() + a.substring(1).toLowerCase())
    .join(" ");
};
