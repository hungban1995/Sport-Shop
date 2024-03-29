import React from "react";
import "./sort.scss";
function SortData({ valueSort, set_sort_by }) {
  const handleChange = (e) => {
    set_sort_by(e.target.value);
  };
  return (
    <select name="sort-by" className="sort-by" onChange={handleChange}>
      <option value="">Sắp xếp:</option>
      {valueSort &&
        valueSort.map((value, idx) => {
          return (
            <option key={idx} value={JSON.stringify(value.value)}>
              {value.name}
            </option>
          );
        })}
    </select>
  );
}

export default SortData;
