const listHelper = require('../utils/list_helper')


describe("Author with most likes when", () => {
  const blogs = [
    {
      "title": "kebap",
      "author": "somebody",
      "url": "no.com",
      "likes": 10,
      "id": 101
    },
    {
      "title": "kebap",
      "author": "the best",
      "url": "no.com",
      "likes": 111111,
      "id": 150
    },
    {
      "title": "kebap",
      "author": "nobody",
      "url": "no.com",
      "likes": 10,
      "id": 99
    }
  ]
  const blogs3 = [
    {
      "title": "11111111",
      "author": "ismo",
      "url": "1111???",
      "likes": 5,
      "id": "434343434343"
    },
    {
      "title": "1",
      "author": "1 1",
      "url": "1???",
      "likes": 1,
      "id": "3432432"
    },
    {
      "title": "876",
      "author": "ismo",
      "url": "1456???",
      "likes": 20,
      "id": "3432432"
    }
  ]

  test('Two posts and most likes', () => {
    const result = listHelper.mostLikes(blogs3)
    expect(result).toEqual({ "author": "ismo", "likes": 25 })
  })



  test('One post and most likes with other having 2 posts and less likes', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({ "author": "the best", "likes": 111111 })
  })

})


