import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { getData } from "../../libs/fetchData";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart() {
  const [categories, setCategories] = useState([]);
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
  const data = (categories) => {
    let labels = categories?.map((item) => item.title);
    // let data= categories.map
    const dataField = {
      labels: labels,
      datasets: [
        {
          label: "# of Votes",
          data: [12, 19, 3],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            // "rgba(75, 192, 192, 0.2)",
            // "rgba(153, 102, 255, 0.2)",
            // "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            // "rgba(75, 192, 192, 1)",
            // "rgba(153, 102, 255, 1)",
            // "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
    return dataField;
  };

  return (
    <>
      {categories ? <Doughnut data={data(categories)} /> : <span>No data</span>}
    </>
  );
}
