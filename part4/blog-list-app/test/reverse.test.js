// The test defines the keyword test and the library assert, which is used by the tests to check the results of the functions under test.
const { test, describe } = require("node:test");
const assert = require("node:assert");

// the test file imports the function to be tested and assigns it to a variable called reverse:
const reverse = require("../utils/for_testing").reverse;

describe("Test of reverse function", () => {
  test("reverse of a", () => {
    // the test calls the reverse function with the input "a" and stores the result in a variable called result.
    // Then, it uses assert.strictEqual to check if the result is equal to "a". If the assertion fails, an error will be thrown, indicating that the test has failed. If the assertion passes, the test will complete successfully without any output.
    const result = reverse("a");
    assert.strictEqual(result, "a");
  });

  test("reverse of react", () => {
    const result = reverse("react");
    assert.strictEqual(result, "tcaer");
  });

  test("reverse of saippuakauppias", () => {
    const result = reverse("saippuakauppias");
    assert.strictEqual(result, "saippuakauppias");
  });
});
