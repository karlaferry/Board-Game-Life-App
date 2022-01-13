export const capitaliseString = (str) => {
  return str
    .split("-")
    .map((a) => a[0].toUpperCase() + a.substring(1).toLowerCase())
    .join(" ");
};

export const getFirstName = (str) => {
  const firstName = str.split(" ")[0];
  return firstName[0].toUpperCase() + firstName.substring(1);
};
