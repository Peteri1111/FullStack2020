import React from 'react'
import { useSelector } from 'react-redux'


const NotificationWindow = () => {

  const notification = useSelector(state => state.notification)


  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (notification === null) return null
  return (
    <div className={notification.type} style={style}>
      {notification.text}
    </div>
  )
}
export default NotificationWindow