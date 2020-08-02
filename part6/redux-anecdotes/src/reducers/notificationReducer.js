
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
export const setNotification = (notification) => {
  return { type: 'SET_NOTIFICATION', notification }



}




export default notificationReducer


