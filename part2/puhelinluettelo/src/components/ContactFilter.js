import React from "react";

const ContactFilter = ({ value, change }) => (
  <div>
    filter shown: <input value={value} onChange={change} />
  </div>
);

export default ContactFilter;
