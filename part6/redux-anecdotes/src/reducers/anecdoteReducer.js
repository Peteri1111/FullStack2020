
import anecdoteService from '../services/anecdotes'




const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToVote = state.find(a => a.id === id)

      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : votedAnecdote).sort((a, b) => a.votes < b.votes ? 1 : -1)
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data

    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })

  }
}

export const vote = (anecdoteToVote) => {
  return async dispatch => {
    const anecdote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 }
    const votedAnecdote = await anecdoteService.update(anecdoteToVote.id, anecdote)
    dispatch({
      type: 'VOTE',
      data: { id: votedAnecdote.id }
    })
  }
}
export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export default reducer