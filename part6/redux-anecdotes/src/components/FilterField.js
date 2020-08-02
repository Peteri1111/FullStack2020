import React from 'react'
import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'


const FilterField = () => {
  const dispatch = useDispatch()



  return (
    <div>
      filter: <input name='filter' onChange={(event) => dispatch(filterChange(event.target.value))} />
    </div>
  )
}


export default FilterField