import React, { useEffect, useState } from "react";
import { BLANK_IMG } from "../../constants/index";
import moment from "moment";
import "./postItem.scss";
function PostItem(props) {
  const [post, setPost] = useState(null);
  useEffect(() => {
    setPost(props.post);
  }, [props.post]);
  if (!post) return <div>No data!</div>;
  return (
    <div className="postItem">
      <div className="left">
        <img alt="img" src={BLANK_IMG} />
      </div>
      <div className="right">
        <div className="headerPost">
          <div className="titlePost">
            <p>{post?.title}</p>
            <span>{post?.author?.username}</span>
          </div>
          <div className="infoPost">
            <span>
              Create at: {moment(post?.createdAt).format("DD/MM/YYYY")}
            </span>
            <span>
              Update at: {moment(post?.updatedAt).format("DD/MM/YYYY")}
            </span>
          </div>
        </div>
        <div className="contentPost">
          <p>{post?.description}</p>
          <span>{post?.content}</span>
        </div>
        <div className="action">
          {/* <AlertMessage  /> */}
          <div
            className="editButton"
            onClick={() => {
              // navigate(`${params.row._id}`);
            }}
          >
            View and Edit
          </div>
          <div
            className="deleteButton"
            // onClick={() => {
            //     dispatch(
            //         getAlert({
            //             open: true,
            //             delete: { id: params.row._id, type: "user" },
            //         })
            //     );
            // }}
          >
            Delete
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostItem;
