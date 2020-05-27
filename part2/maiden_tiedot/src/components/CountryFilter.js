import React from "react";

const CountryFilter = ({ value, change }) => (
  <div>
    filter shown: <input value={value} onChange={change} />
  </div>
);

export default CountryFilter;
