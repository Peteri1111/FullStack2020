
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
export const setNotification = (notification, timeoutSeconds, timeOutId) => {
  return async dispatch => {
    clearTimeout(timeOutId)

    dispatch({ type: 'SET_NOTIFICATION', notification })

    const newTimeOutId = setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, timeoutSeconds * 1000)

    return newTimeOutId
  }
}




export default notificationReducer


