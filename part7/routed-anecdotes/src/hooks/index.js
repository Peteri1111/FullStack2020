import { useState } from 'react'
export const useField = (type) => {
  const [value, setValue] = useState('')


  const onChange = (e) => {
    setValue(e.target.value)
  }


  const setEmpty = () => {
    setValue('')
  }

  return {
    setEmpty: setEmpty,
    inputField: {
      type, value, onChange
    }
  }

}
