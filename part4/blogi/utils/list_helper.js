const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }
  return blogs.reduce(reducer, 0)

}

const favoriteBlog = (blogs) => {

  const reducer = ((max, blog) => max.likes > blog.likes ? max : blog)



  return blogs.reduce(reducer, 0)
}

const mostBlogs = (blogs) => {



  let authors = blogs.map((blog) => blog.author)

  let result = _(authors)
    .countBy()
    .entries()
    .maxBy(_.last)
  return result
}


const mostLikes = (blogs) => {

  let values = _(blogs)
    .groupBy('author')
    .map((authors, key) => {
      return {
        'author': key,
        'likes': _.sumBy(authors, 'likes')
      }
    }).value()




  return _.maxBy(values, 'likes')
}


module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}