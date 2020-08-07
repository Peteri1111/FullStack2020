import React from 'react'

const logout = async (setUser, e) => {
  e.preventDefault()
  window.localStorage.clear()
  setUser(null)

}
const LogoutButton = ({ setUser }) => {


  return (
    <>
      <button onClick={(e) => logout(setUser, e)}>logout</button>
    </>
  )

}


export default LogoutButton