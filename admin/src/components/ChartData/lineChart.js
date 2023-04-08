import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { getData } from "../../libs/fetchData";

const LineChart = () => {
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
    series: [
      {
        name: "orders",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: "Order Trends by Month",
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
        ],
      },
    },
  };
  return (
    <>
      <ReactApexChart
        options={data.options}
        series={data.series}
        type="line"
        height={350}
      />
    </>
  );
};

export default LineChart;
