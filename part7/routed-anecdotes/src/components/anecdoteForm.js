import React from 'react'
import { useHistory } from 'react-router-dom'
import { useField } from '../hooks/index'
const AnecdoteForm = (props) => {
  const history = useHistory()
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')


  const resetFields = (e) => {
    e.preventDefault()
    content.setEmpty()
    author.setEmpty()
    info.setEmpty()
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.inputField.value,
      author: author.inputField.value,
      info: info.inputField.value,
      votes: 0
    })
    history.push('/')
    props.setNotification(`Created new anecdote "${content.inputField.value}"`)
    setTimeout(() => {
      props.setNotification('')
    }, 10000)

  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content:
          <input {...content.inputField} />
        </div>
        <div>
          author
          <input {...author.inputField} />
        </div>
        <div>
          url for more info
          <input {...info.inputField} />
        </div>
        <button>create</button>
        <button onClick={resetFields}>reset</button>
      </form>


    </div>
  )

}

export default AnecdoteForm