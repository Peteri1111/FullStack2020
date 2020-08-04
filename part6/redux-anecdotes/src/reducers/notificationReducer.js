
const notificationReducer = (state = 'starting message', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'CLEAR':
      return ''
    default: return state
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR'
  }
}
export const setNotification = (notification, timeoutSeconds) => {
  return async dispatch => {

    dispatch({ type: 'SET_NOTIFICATION', notification })

    setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, timeoutSeconds * 1000)

  }
}




export default notificationReducer


