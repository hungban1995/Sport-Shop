import { getData } from "@/libs/fetchData";
import moment from "moment";
import React, { useEffect, useState } from "react";

function OrderActivity({ orderId }) {
  const [activityOrder, setActiveOrder] = useState([]);
  const [logItem, setLogItem] = useState([]);
  const [id, setId] = useState("");
  useEffect(() => {
    setId(orderId);
  }, [orderId]);
  useEffect(() => {
    const getActivityOrder = async () => {
      if (id) {
        try {
          const res = await getData("notifications/order/" + orderId);
          setActiveOrder(res.data.activity);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getActivityOrder();
  }, [id]);

  useEffect(() => {
    const statusByDate = {};
    activityOrder.forEach((item, idx) => {
      const date = moment(item.createdAt).format("L");
      if (!statusByDate[date]) {
        statusByDate[date] = [];
      }
      statusByDate[date].push({
        time: moment(item.createdAt).format("LT"),
        message: item.message,
        status: item.details.status,
      });
    });
    setLogItem(statusByDate);
  }, [activityOrder]);

  return (
    <div className="activity">
      <h2>Order Activity</h2>
      <div className="detail-activity">
        {Object.keys(logItem).map((date, index) => {
          return (
            <div key={index}>
              <p>{date}</p>
              <div>
                {logItem[date].map((item, idx) => {
                  return (
                    <p key={idx}>
                      <span>{item.time} </span>
                      <span>{item.message} </span>
                      <span>status {item.status}</span>
                    </p>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OrderActivity;
