import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

import { setNotification, clearNotification } from '../reducers/notificationReducer'


const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <li>
      {anecdote.content} {anecdote.votes} <button onClick={handleClick}>vote</button>
    </li>
  )
}



const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {

    return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
  })


  const voteAnecdote = ({ content, id }) => {
    dispatch(vote(id))
    dispatch(setNotification(`You voted "${content}"`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }



  return <ul>
    {anecdotes.map(anecdote =>
      <Anecdote
        key={anecdote.id}
        anecdote={anecdote}
        handleClick={() => voteAnecdote(anecdote)}


      />)}
  </ul>
}

export default Anecdotes