const listHelper = require('../utils/list_helper')

describe('Highest likes', () => {

  const blogs = [
    {
      "title": "Sometfdshing",
      "author": "Markfds Rubberton",
      "url": "somethfdsafdsfging???",
      "likes": 50,
      "id": "5f04506s2bdc06607b0c18022"
    },
    {
      "title": "Somerfdsthing",
      "author": "Markghfsdhg Rubberton",
      "url": "sometdfsgfdshing???",
      "likes": 15,
      "id": "5f045062bdc06607b0c18022"
    }
  ]
  const blogs2 = [
  ]
  const blogs3 = [
    {
      "title": "11111111",
      "author": "11111 Rubberton",
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
      "author": "1 4561",
      "url": "1456???",
      "likes": 1,
      "id": "3432432"
    }
  ]

  test('when the first has higher likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual({
      "title": "Sometfdshing",
      "author": "Markfds Rubberton",
      "url": "somethfdsafdsfging???",
      "likes": 50,
      "id": "5f04506s2bdc06607b0c18022"
    })
  })

  test('when the list is empty', () => {

    const result = listHelper.favoriteBlog(blogs2)

    expect(result).toBe(0)

  })
  test('Everyone has the same likes', () => {
    const result = listHelper.favoriteBlog(blogs3).likes
    expect(result).toBe(1)
  })
})

