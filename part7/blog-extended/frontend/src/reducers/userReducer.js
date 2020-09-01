import userService from '../services/resources'

const baseUrl = '/api/users'

const reducer = (state = { users: [], activeUser: null }, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state.users, activeUser: action.data }
    case 'INIT_USERS':
      return {
        activeUser: state.activeUser, users: action.data
      }
    default:
      return state
  }

}


export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll(baseUrl)

    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }

}

export const setUser = (user) => {
  return async dispatch => {
    dispatch({
      type: 'SET_USER',
      data: user
    })
  }

}


export default reducer