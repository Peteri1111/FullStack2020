import React from "react";
import Country from "./Country"
import Language from "./Language"

const Countries =({countries, filterValue}) => {
    let matchedCountries = countries
    .filter((country) =>
        country.name.toLowerCase().includes(filterValue.toLowerCase())
        );

        if (matchedCountries.length === 1) {
            let country = matchedCountries[0];
            console.log(country);
        
        
            return (
                <>
            <h2>{country.name}</h2>
           
            <p>Capital {country.capital}</p>
            <p>Population {country.population}</p>
           
           <h3>Languages</h3>


           <ul>
                {country.languages.map(({name}, i) => <Language name={name} key={i}/>)}
           </ul>


           <img src={country.flag} alt={"Flag of " + country.name} />


           </>
            )
        
            }
        else if (matchedCountries.length  <= 10) {
return (
    <ul>
        {countries
        .filter((country) =>
            country.name.toLowerCase().includes(filterValue.toLowerCase())
            )
            .map(({name}, i) => (
          <Country name={name} key={i}/>
      ))}
    </ul>
)
} 
    else {    return (
        <>
            Too many matches, specify another filter
        </>
    )
    }
}

export default Countries;