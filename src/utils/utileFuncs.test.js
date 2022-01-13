import { capitaliseString, getFirstName } from "./utilFuncs";

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
