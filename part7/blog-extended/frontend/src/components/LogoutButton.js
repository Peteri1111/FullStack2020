import React from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
const logout = async (dispatch, e) => {
  e.preventDefault()
  window.localStorage.clear()
  dispatch(setUser(null))

}
const LogoutButton = () => {
  const dispatch = useDispatch()


  return (
    <>
      <button onClick={(e) => logout(dispatch, e)}>logout</button>
    </>
  )

}


export default LogoutButton