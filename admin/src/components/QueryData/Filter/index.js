import React from "react";
import "./filter.scss";
function FilterData({ valueFilter, typeFilter, set_filter_by }) {
  const handleChange = (e) => {
    set_filter_by(e.target.value);
  };
  return (
    <div className="filter">
      <select name="filterBy" className="filterBy" onChange={handleChange}>
        <option value="">Filter at: {typeFilter} </option>
        {valueFilter &&
          valueFilter.map((item, idx) => {
            return (
              <option
                key={idx}
                value={JSON.stringify({ [typeFilter]: item._id })}
              >
                {item.username || item.title}
              </option>
            );
          })}
      </select>
    </div>
  );
}

export default FilterData;
