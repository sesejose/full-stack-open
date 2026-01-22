/* eslint-env node */
const express = require("express");
const config = require("./utils/config");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

const app = express();

// log when connecting to database
logger.info("connecting to", config.MONGODB_URI);

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const sampleBlogs = [
  {
    id: "65b0c1d2e3f4012345678901",
    title: "Understanding Node Streams",
    author: "Jane Doe",
    url: "https://example.com/node-streams",
    likes: 12,
  },
  {
    id: "65b0c1d2e3f4012345678902",
    title: "Mastering Express Middleware",
    author: "John Smith",
    url: "https://example.com/express-middleware",
    likes: 7,
  },
  {
    id: "65b0c1d2e3f4012345678903",
    title: "Mongoose Tips and Tricks",
    author: "Alex Kim",
    url: "https://example.com/mongoose-tips",
    likes: 25,
  },
  {
    id: "65b0c1d2e3f4012345678904",
    title: "Async/Await Patterns in JS",
    author: "Priya Patel",
    url: "https://example.com/async-await-patterns",
    likes: 3,
  },
];

const Blog = mongoose.model("Blog", blogSchema);

const mongoUrl = config.MONGODB_URI;
mongoose
  .connect(mongoUrl, { family: 4 })
  // log upon successful connection or error
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connection to MongoDB:", error.message);
  });

app.use(express.json());

app.get("/api/blogs", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

app.post("/api/blogs", (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
