const findLast = require("./击鼓传花");

test("击鼓传花", () => {
  expect(findLast(["zhao", "qian", "sun", "li"], 1)).toEqual("li");
  expect(findLast(["zhao", "qian", "sun", "li"], 5)).toEqual("qian");
});
