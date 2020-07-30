import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


let component;
let mockHandler = jest.fn()
let blog;
beforeEach(() => {
  blog = {
    author: 'Rikimauru',
    title: 'How to feed 101',
    url: 'drinkvodkaplaydotka.com',
    likes: '100'
  }
  component = render(<Blog blog={blog} incrementLike={mockHandler} />)
})
describe('Blog renders correct things', () => {


  test('only title and author by default', () => {


    expect(component.container).toHaveTextContent(
      'How to feed 101' && 'Rikimauru')
    expect(component.container).not.toHaveTextContent('drinkvodkaplaydotka.com')
  })

  test('url and likes also shown when pressed', () => {


    expect(component.container).toHaveTextContent(
      'How to feed 101' && 'Rikimauru')
    expect(component.container).not.toHaveTextContent(blog.url && blog.likes)
    const button = component.getByText(blog.title)

    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
      blog.title && blog.author && blog.url && blog.likes)
  })
})
describe('Blog likes button functions', () => {
  test('Like button is clicked twice', () => {
    const openBlogButton = component.getByText(blog.title)
    fireEvent.click(openBlogButton)

    const button = component.getByText('like')

    expect(component.container).toHaveTextContent(100)

    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandler.mock.calls).toHaveLength(2)





  })
})

