import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { getData } from "../../libs/fetchData";

const DonutChart = () => {
  const [categories, setCategories] = useState([]);
  const [labels, setLabels] = useState([]);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const getCat = async () => {
      try {
        const res = await getData("categories/get-all");
        setCategories(res.data.categories);
      } catch (error) {
        console.log(error);
      }
    };
    getCat();
  }, []);

  useEffect(() => {
    if (categories) {
      let labelArr = [];
      let seriesArr = [];
      categories.forEach((item) => {
        labelArr.push(item.title);
        seriesArr.push(item.numProducts);
      });
      setLabels(labelArr);
      setSeries(seriesArr);
    }
  }, [categories]);

  const data = {
    series: series,
    labels: labels,
  };
  const options = {
    chart: {
      type: "donut",
    },
    labels: data.labels,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <>
      <ReactApexChart
        options={options}
        series={data.series}
        type="donut"
        width="100%"
      />
    </>
  );
};

export default DonutChart;
