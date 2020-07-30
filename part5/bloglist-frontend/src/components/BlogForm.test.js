import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'



describe('Blogform testing', () => {
  test('asd', () => {
    const createBlog = jest.fn()

    const component = render(
      <BlogForm createBlog={createBlog} />
    )

    const author = component.container.querySelector('#author')
    const title = component.container.querySelector('#title')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(author, { target: { value: 'Rainer Kuusi' } })
    fireEvent.change(title, { target: { value: 'Miten tulla rikkaaksi yhdessä yössä' } })
    fireEvent.change(url, { target: { value: 'JW.org' } })

    fireEvent.submit(form)

    expect(createBlog.mock.calls.length).toBe(1)

    expect(createBlog.mock.calls[0][0]).toEqual(
      { title: 'Miten tulla rikkaaksi yhdessä yössä', author: 'Rainer Kuusi', url: 'JW.org' })




  })
})