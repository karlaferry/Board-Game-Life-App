import {
  capitaliseString,
  getFirstName,
  convertDate,
  filterTitle,
} from "./utilFuncs";

describe("capitaliseString()", () => {
  const input = "push-your-luck";
  const actual = capitaliseString(input);
  it("returns a string", () => {
    expect(typeof actual).toBe("string");
  });
  it("replaces dashes with spaces", () => {
    expect(actual).toBe("Push Your Luck");
  });
  it("each word has an uppercase first letter", () => {
    actual.split(" ").forEach((word) => {
      expect(word[0] === word[0].toUpperCase()).toBe(true);
    });
  });
});

describe("getFirstName()", () => {
  const input = "firstName lastName";
  const actual = getFirstName(input);
  it("returns a string", () => {
    expect(typeof actual).toBe("string");
  });
  it("returns the first word with uppercase first letter in a string", () => {
    expect(actual).toBe("FirstName");
  });
});

describe("convertDate()", () => {
  const input = "2022-01-12T22:29:27.580Z";
  const actual = convertDate(input);
  it("returns a string", () => {
    expect(typeof actual).toBe("string");
  });
  it("returns only the year, month, and date of a timestamp string", () => {
    expect(actual).toBe("January 12, 2022");
  });
});

describe("filterTitle()", () => {
  const array = [{ title: "ab" }, { title: "ac" }, { title: "cd" }];
  it("returns an a filtered array of reviews that includes the title argument", () => {
    let title = "a";
    let actual = filterTitle(array, title);
    expect(Array.isArray(actual)).toBe(true);
    expect(actual).toHaveLength(2);
    title = "b";
    actual = filterTitle(array, title);
    expect(actual).toHaveLength(1);
  });
  it("returns an empty array if nothing matches", () => {
    const actual = filterTitle(array, "e");
    expect(actual).toEqual([]);
  });
});
