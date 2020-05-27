import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CountryFilter from './components/CountryFilter'
import Countries from './components/Countries';




const App = () => {

const [filterValue, setFilterValue] = useState("");
const [countries, setCountries] = useState([]);


const handleFilterValue = (e) => {
  setFilterValue(e.target.value);
}




useEffect(() => {
  axios.get('https://restcountries.eu/rest/v2/all')
  .then(response => {
    setCountries(response.data)
    
  })
}, [])

  return (
   <>
    <CountryFilter value={filterValue} change={handleFilterValue} />
    <>
    <Countries countries={countries} filterValue={filterValue}/>
      
    </>
  </>
  );
}

export default App;
