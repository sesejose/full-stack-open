/* eslint-env node */
const app = require("./app"); // import the express application

const config = require("./utils/config"); // import configuration settings

// const sampleBlogs = [
//   {
//     id: "65b0c1d2e3f4012345678901",
//     title: "Understanding Node Streams",
//     author: "Jane Doe",
//     url: "https://example.com/node-streams",
//     likes: 12,
//   },
//   {
//     id: "65b0c1d2e3f4012345678902",
//     title: "Mastering Express Middleware",
//     author: "John Smith",
//     url: "https://example.com/express-middleware",
//     likes: 7,
//   },
//   {
//     id: "65b0c1d2e3f4012345678903",
//     title: "Mongoose Tips and Tricks",
//     author: "Alex Kim",
//     url: "https://example.com/mongoose-tips",
//     likes: 25,
//   },
//   {
//     id: "65b0c1d2e3f4012345678904",
//     title: "Async/Await Patterns in JS",
//     author: "Priya Patel",
//     url: "https://example.com/async-await-patterns",
//     likes: 3,
//   },
// ];

const PORT = config.PORT || 3001;
app.listen(PORT, () => {
  // start the server
  console.log(`Server running on port ${PORT}`);
});
