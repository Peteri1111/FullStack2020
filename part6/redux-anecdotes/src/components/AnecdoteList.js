import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

import { setNotification } from '../reducers/notificationReducer'

let timeOutId = 0

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <li>
      {anecdote.content} {anecdote.votes} <button onClick={handleClick}>vote</button>
    </li>
  )
}



const Anecdotes = (props) => {


  const voteAnecdote = async (anecdote) => {
    props.vote(anecdote)
    timeOutId = await props.setNotification(`You voted "${anecdote.content}"`, 5, timeOutId)
  }



  return <ul>
    {props.anecdotes.map(anecdote =>
      <Anecdote
        key={anecdote.id}
        anecdote={anecdote}
        handleClick={() => voteAnecdote(anecdote)}


      />)}
  </ul>
}
const mapDispatchToProps = {
  vote, setNotification
}
const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase()))
  }

}

const ConnectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(Anecdotes)
export default ConnectedAnecdotes