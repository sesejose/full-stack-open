// this file sets up the Mongoose model for blog posts and connects to MongoDB database using configuration from config.js
const config = require("../utils/config"); // import configuration settings
const logger = require("../utils/logger"); // import logger for logging info and errors

const mongoose = require("mongoose"); // mongoose for MongoDB interactions

mongoose.set("strictQuery", false);

// Schema definition for blog posts
const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

// Model for blog posts
const Blog = mongoose.model("Blog", blogSchema);

// app.get("/api/blogs", (request, response) => {
//   Blog.find({}).then((blogs) => {
//     response.json(blogs);
//   });
// });

// app.post("/api/blogs", (request, response) => {
//   const blog = new Blog(request.body);

//   blog.save().then((result) => {
//     console.log("Blog saved!");
//     response.status(201).json(result);
//   });
// });

// Transforming the returned object when toJSON is called
blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
