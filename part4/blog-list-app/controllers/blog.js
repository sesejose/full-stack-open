// create a router for handling blog-related routes
// this file defines the routes for handling blog-related requests, such as fetching all blogs, creating a new blog, updating a blog, and deleting a blog. It uses the Blog model to interact with the MongoDB database and includes error handling for potential issues that may arise during database operations.
// app.js imports this router and mounts it at the /api/blogs path, allowing the application to handle requests to that endpoint using the defined routes in this file.
const blogsRouter = require("express").Router();
// const blog = require("../models/blog");
const Blog = require("../models/blog");

// notesRouter object must only define the relative parts of the routes, i.e. the empty path / or just the parameter /:id. The app.js file will take care of the rest of the path, i.e. /api/blogs. This way, the router can be easily reused in different contexts if needed.

blogsRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouter.get("/:id", (request, response, next) => {
  Blog.findById(request.params.id)
    .then((blog) => {
      if (blog) {
        response.json(blog);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

blogsRouter.post("/", (request, response, next) => {
  const body = request.body;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  });
  blog
    .save()
    .then((savedBlog) => {
      response.json(savedBlog);
    })
    .catch((error) => next(error));
});

blogsRouter.delete("/:id", (request, response, next) => {
  Blog.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

blogsRouter.put("/:id", (request, response, next) => {
  const body = request.body;
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };
  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then((updatedBlog) => {
      response.json(updatedBlog);
    })
    .catch((error) => next(error));
});

module.exports = blogsRouter;
