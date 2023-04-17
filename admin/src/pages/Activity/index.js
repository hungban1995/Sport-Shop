import React, { useEffect, useState } from "react";
import "./activity.scss";
import { getData } from "../../libs/fetchData";
import { BLANK_AVT, IMG_URL } from "../../constants";
import moment from "moment";
function Activity() {
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    getData("notifications/")
      .then((res) => setActivity(res.data.notifications))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="activity">
      <h2>Activity Log</h2>
      <div className="list-activity">
        {activity &&
          activity.map((item, idx) => {
            return (
              <div key={idx} className="item-message">
                <div className="item-message-img">
                  <img
                    src={
                      item.sender
                        ? `${IMG_URL}/${item.sender?.avatar}`
                        : BLANK_AVT
                    }
                    alt="avatar"
                  />
                </div>
                <div className="item-message-content">
                  <p>
                    {item.sender?.username || "some one"} has been{" "}
                    {item.message}
                  </p>
                  <span>{moment(item.createdAt).fromNow()}</span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Activity;
