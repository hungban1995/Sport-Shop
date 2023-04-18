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
    activityOrder.forEach((item) => {
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
  const renderColor = (value) => {
    let style = { backgroundColor: "" };
    if (value.status === "WAITING") {
      style.backgroundColor = "#FACC15";
    }
    if (value.status === "SHIPPING") {
      style.backgroundColor = "#60A5FA";
    }
    if (value.status === "SUCCESS") {
      style.backgroundColor = "#34D399";
    }
    if (value.status === "CANCEL") {
      style.backgroundColor = "#F87171";
    }
    return style;
  };
  return (
    <div className="activity">
      <h2 className="activity-title">Order Activity</h2>
      <div className="detail-activity">
        {Object.keys(logItem).map((date, index) => {
          return (
            <div key={index} className="activity-item">
              <p>{date}</p>
              {logItem[date].map((item, idx) => {
                return (
                  <div className="log-item" key={idx}>
                    <div className="log-item-media">
                      <div
                        className="log-point"
                        style={renderColor(item)}
                      ></div>
                      <div
                        className="log-time-line"
                        style={renderColor(item)}
                      ></div>
                    </div>
                    <div className="log-item-content">
                      <p>{item.time} </p>
                      <span>{item.message} </span>
                      <span>status {item.status}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OrderActivity;
