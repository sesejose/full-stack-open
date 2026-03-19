const mostBlogs = require("../utils/most_blogs").mostBlogs;
const mostLikes = require("../utils/most_blogs").mostLikes;
const { test, describe } = require("node:test");
const assert = require("node:assert");

describe("Test of mostBlogs and mostLikes functions", () => {
  const blogs = [
    {
      title: "Understanding Node Streams",
      author: "Jane Doe",
      url: "https://example.com/node-streams",
      likes: 12,
      __v: 0,
    },

    {
      title: "Mastering Express Middleware",
      author: "John Smith",
      url: "https://example.com/express-middleware",
      likes: 7,
      __v: 0,
    },

    {
      title: "Mongoose Tips and Tricks",
      author: "Alex Kim",
      url: "https://example.com/mongoose-tips",
      likes: 25,
      __v: 0,
    },

    {
      title: "Async/Await Patterns in JS",
      author: "Priya Patel",
      url: "https://example.com/async-await-patterns",
      likes: 3,
      __v: 0,
    },

    {
      title: "Another Blog by Priya Patel",
      author: "Priya Patel",
      url: "https://example.com/another-blog-by-priya-patel",
      likes: 1,
      __v: 0,
    },

    {
      title: "Yet Another Blog by Priya Patel",
      author: "Priya Patel",
      url: "https://example.com/yet-another-blog-by-priya-patel",
      likes: 1,
      __v: 0,
    },
  ];

  test("mostBlogs returns author with the most blogs", () => {
    /**
     * The author summary with the highest number of blogs from the provided collection.
     * @type {object}
     */
    const result = mostBlogs(blogs);
    assert.deepStrictEqual(result, { author: "Priya Patel", blogs: 3 });
  });

  test("mostLikes returns the author with the most likes", () => {
    const result = mostLikes(blogs);
    assert.deepStrictEqual(result, { author: "Alex Kim", likes: 25 });
  });
});
