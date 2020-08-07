const listHelper = require('../utils/list_helper')

describe("Most blog posts", () => {
  const blogs3 = [
    {
      "title": "11111111",
      "author": "ismo",
      "url": "1111???",
      "likes": 1,
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
      "likes": 1,
      "id": "3432432"
    }
  ]

  test('One has higher frequency than others', () => {
    const result = listHelper.mostBlogs(blogs3)
    expect(result).toEqual(["ismo", 2])


  })


})