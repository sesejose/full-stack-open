const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  // ********* Most blogs *********

  // Use reduce to count the number of blogs for each author. The reduce function iterates through the list of blogs and builds an object (acc) where the keys are the authors
  // and the values are the counts of blogs for each author.
  // For each blog, it checks if the author already has a count in the acc object; if so, it increments the count, otherwise it initializes it to 1.
  const counts = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + 1;
    return acc;
  }, {});

  // After counting the blogs for each author, we need to find the author with the most blogs.
  // We can iterate through the counts object to find the author with the highest count.
  // We initialize two variables, topAuthor and topCount, to keep track of the author with the most blogs and the count of their blogs.
  // We then loop through the entries of the counts object using Object.entries(), which gives us an array of [author, count] pairs. [['author', count], ['author', count], ...]
  // For each pair, we check if the count is greater than the current topCount; if it is, we update topAuthor and topCount accordingly.
  let topAuthor = null;
  let topCount = 0;

  for (const [author, count] of Object.entries(counts)) {
    if (count > topCount) {
      topAuthor = author;
      topCount = count;
    }
  }

  return { author: topAuthor, blogs: topCount };
};

// *********** Most likes ***********

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const likesByAuthor = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + blog.likes;
    return acc;
  }, {});

  let topAuthor = null;
  let topLikes = 0;

  for (const [author, likes] of Object.entries(likesByAuthor)) {
    if (likes > topLikes) {
      topAuthor = author;
      topLikes = likes;
    }
  }

  return { author: topAuthor, likes: topLikes };
};

exports.mostLikes = mostLikes;

exports.mostBlogs = mostBlogs;
