import React from "react";
import "./filter.scss";
function FilterData({ valueFilter, typeFilter, set_filter_by }) {
  const handleChange = (e) => {
    set_filter_by(e.target.value);
  };
  return (
    <select name="filter-by" className="filter-by" onChange={handleChange}>
      <option value="">Lọc theo: {typeFilter.name} </option>
      {valueFilter &&
        valueFilter.map((item, idx) => {
          return (
            <option
              key={idx}
              value={JSON.stringify({
                [typeFilter.value]: item?.value || item,
              })}
            >
              {item?.name || item}
            </option>
          );
        })}
    </select>
  );
}

export default FilterData;
