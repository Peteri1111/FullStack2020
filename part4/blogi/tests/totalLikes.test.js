const listHelper = require('../utils/list_helper')
test('Two authors and total likes 20', () => {
  const blogs = [
    {
      "title": "Sometfdshing",
      "author": "Markfds Rubberton",
      "url": "somethfdsafdsfging???",
      "likes": 5,
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
  const result = listHelper.totalLikes(blogs);
  expect(result).toBe(20)

})
test('Empty list and total likes 0', () => {
  const blogs = []
  const result = listHelper.totalLikes(blogs);
  expect(result).toBe(0)

})

test('One author and total likes 999', () => {
  const blogs = [{
    "title": "Somerfdsthing",
    "author": "Markghfsdhg Rubberton",
    "url": "sometdfsgfdshing???",
    "likes": 999,
    "id": "5f045062bdc06607b0c18022"
  }]
  const result = listHelper.totalLikes(blogs)
  expect(result).toBe(999)

})

