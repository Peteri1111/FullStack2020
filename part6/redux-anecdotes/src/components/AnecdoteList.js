import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

import { setNotification } from '../reducers/notificationReducer'


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
    return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase())
    )
  })

  const voteAnecdote = async (anecdote) => {
    dispatch(vote(anecdote))
    await dispatch(setNotification(`You voted "${anecdote.content}"`, 5))
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