import React, {useState} from "react";
import Country from "./Country"

const Countries =({countries, filterValue}) => {


    const [shownCountry, setShownCountry] = useState("");
    const handleClick = (country) => {
        setShownCountry(country);
        
    }

    

    
    let matchedCountries = countries
    .filter((country) =>
        country.name.toLowerCase().includes(filterValue.toLowerCase())
        );

        if (matchedCountries.length === 1) {
            let country = matchedCountries[0];
            return (
            <>
                <Country {...country}/>
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
            .map((country, i) => {
                if (country === shownCountry) {
                    return <Country key={i} {...country}/>
                } else {
                return (
                    <div key={i}>
                        <li>{country.name}</li> <button onClick={() => handleClick(country)}>open</button>
                    </div>

                )
                

            }
        }
    
                
      )}
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