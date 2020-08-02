import React from 'react'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import FilterField from './components/FilterField'

const App = () => {


  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <FilterField />
      <AnecdoteForm />
      <AnecdoteList />

    </div>
  )
}

export default App