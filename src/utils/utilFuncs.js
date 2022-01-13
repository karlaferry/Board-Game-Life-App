export const capitaliseString = (str) => {
  return str
    .split("-")
    .map((a) => a[0].toUpperCase() + a.substring(1).toLowerCase())
    .join(" ");
};

export const getFirstName = (str) => {
  if (str) {
    const firstName = str.split(" ")[0];
    return firstName[0].toUpperCase() + firstName.substring(1);
  } else {
    return;
  }
};

export const convertDate = (str) => {
  if (typeof str === "string") {
    const date = str
      .substring(0, 10)
      .split("-")
      .map((string) => Number(string));
    const month = {
      1: "January",
      2: "February",
      3: "March",
      4: "April",
      5: "May",
      6: "June",
      7: "July",
      8: "August",
      9: "September",
      10: "October",
      11: "November",
      12: "December",
    };
    return `${month[date[1]]} ${date[2]}, ${date[0]}`;
  } else {
    return;
  }
};

export const filterTitle = (reviewsArray, title) => {
  return reviewsArray.filter((review) => {
    return review.title.toLowerCase().includes(title.toLowerCase());
  });
};
