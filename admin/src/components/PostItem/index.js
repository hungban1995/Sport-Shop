import React, { useEffect, useState } from "react";
import { BLANK_IMG, IMG_URL } from "../../constants/index";
import moment from "moment";
import "./postItem.scss";
import { useDispatch } from "react-redux";
import { getAlert } from "../../stores/notifyReducer";
import AlertMessage from "../notifications/alert";
import { useNavigate } from "react-router-dom";
function PostItem(props) {
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    setPost(props.post);
  }, [props.post]);
  const RenderPostContent = () => {
    return { __html: post && post.content };
  };
  return (
    <div className="postItem">
      <div className="left">
        <img
          alt="img"
          src={
            post?.images.length > 0 ? `${IMG_URL}/${post.images[0]}` : BLANK_IMG
          }
        />
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
          <p className="description">{post?.description}</p>
          <div
            className="content"
            dangerouslySetInnerHTML={RenderPostContent()}
          ></div>
        </div>
        <div className="action">
          <AlertMessage idItem={post?._id} />
          <div
            className="editButton"
            onClick={() => {
              navigate(`${post?._id}`);
            }}
          >
            View and Edit
          </div>
          <div
            className="deleteButton"
            onClick={() => {
              dispatch(
                getAlert({
                  open: true,
                  delete: { id: post?._id, type: "posts" },
                  style: { top: "-85px", right: "unset" },
                })
              );
            }}
          >
            Delete
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostItem;
