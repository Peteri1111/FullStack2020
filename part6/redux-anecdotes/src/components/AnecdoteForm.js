import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

let timeOutId = 0

const NewAnecdote = (props) => {


  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    timeOutId = await props.setNotification(`Created new anecdote "${content}"`, 5, timeOutId)


  }

  return (
    <form onSubmit={addAnecdote}>
      <input name='anecdote' />
      <button type='submit'>create</button>
    </form>
  )
}
export default connect(
  null, { createAnecdote, setNotification }
)(NewAnecdote)
