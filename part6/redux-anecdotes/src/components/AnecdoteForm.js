import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const NewAnecdote = (props) => {
  const dispatch = useDispatch()


  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value

    dispatch(setNotification(`Created new anecdote "${content}"`))
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
  }

  return (
    <form onSubmit={addAnecdote}>
      <input name='anecdote' />
      <button type='submit'>create</button>
    </form>
  )
}

export default NewAnecdote