import React from "react";
import Language from "./Language"


const Country = ({capital,population,languages,flag,name}) => (
        <>
            <h2>{name}</h2>
           
            <p>Capital {capital}</p>
            <p>Population {population}</p>
           
           <h3>Languages</h3>


           <ul>
           {languages.map(({name}, i) => <Language name={name} key={i}/>)}

           </ul>


           <img src={flag} alt={"Flag of " + name} width="200vw"/>


           </>
)

export default Country;