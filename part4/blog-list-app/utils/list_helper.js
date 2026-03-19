const dummy = (blogs) => {
  return 1;
};

// Define a new totalLikes function that receives a list of blog posts as a parameter. The function returns the total sum of likes in all of the blog posts.
const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  let favorite = blogs[0];
  for (let blog of blogs) {
    if (blog.likes > favorite.likes) {
      favorite = blog;
    }
  }
  return favorite;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
