const { test, describe } = require("node:test");
const assert = require("node:assert");
const dummy = require("../utils/list_helper").dummy;
const totalLikes = require("../utils/list_helper").totalLikes;
const favoriteBlog = require("../utils/list_helper").favoriteBlog;

describe("Test blogs post total likes and favourites", () => {
  test("dummy returns one", () => {
    const blogs = [];
    const result = dummy(blogs);
    assert.strictEqual(result, 1);
  });

  test("totalLikes returns the total sum of likes", () => {
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
    ];

    const result = totalLikes(blogs);
    assert.strictEqual(result, 47);
  });

  test("favoriteBlog returns the blog with the most likes", () => {
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
    ];
    const result = favoriteBlog(blogs);
    assert.deepStrictEqual(result, {
      title: "Mongoose Tips and Tricks",
      author: "Alex Kim",
      url: "https://example.com/mongoose-tips",
      likes: 25,
      __v: 0,
    });
  });
});
