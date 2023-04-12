import React, { useEffect, useState } from "react";
import { MdOutlineArrowLeft, MdOutlineArrowRight } from "react-icons/md";
function Pagination({ count, pageSize, pageNum, values }) {
  const [size, setSize] = useState(0);
  const [numPage, setNumPage] = useState(1);
  const [countItem, setCountItem] = useState(0);
  const [pageList, setPageList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    setCountItem(count);
    if (values && values.length > 0) {
      setSize(values[0]);
    }
  }, [count, values]);
  useEffect(() => {
    let num = 1;
    if (countItem > size) {
      num = Math.ceil(countItem / size);
    }
    setNumPage(num);
  }, [countItem, size, pageSize]);
  const handleChange = (e) => {
    setSize(e.target.value);
    pageSize(e.target.value);
  };
  useEffect(() => {
    const pageArr = [];
    for (let i = 1; i <= numPage; i++) {
      pageArr.push(i);
    }
    setPageList(pageArr);
  }, [numPage, size]);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      pageNum(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < numPage) {
      setCurrentPage(currentPage + 1);
      pageNum(currentPage + 1);
    }
  };
  return (
    <div className="pagination">
      <div className="left">
        <MdOutlineArrowLeft
          className={"icon " + (currentPage === 1 ? "disable" : "")}
          onClick={handlePrev}
        />
        {pageList.map((item) => {
          return (
            <button
              className={currentPage === item ? "active" : ""}
              onClick={() => {
                pageNum(item);
                setCurrentPage(item);
              }}
              key={item}
            >
              {item}
            </button>
          );
        })}
        <MdOutlineArrowRight
          className={
            "icon " + (currentPage === pageList?.length ? "disable" : "")
          }
          onClick={handleNext}
        />
      </div>
      <div className="right">
        <select name="pageSize" className="pageSize" onChange={handleChange}>
          {values &&
            values.map((item, idx) => {
              return (
                <option value={item} key={idx}>
                  {item} / Page
                </option>
              );
            })}
        </select>
      </div>
    </div>
  );
}

export default Pagination;
