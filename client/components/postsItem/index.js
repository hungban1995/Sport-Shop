import React, { useEffect, useState } from "react";
import moment from "moment";
import { IMG_URL } from "@/constant";
import Link from "next/link";

function PostItem(props) {
  const [post, setPost] = useState(null);
  useEffect(() => {
    setPost(props.post);
  }, [props.post]);
  const RenderPostContent = () => {
    return { __html: post && post.content };
  };
  return (
    <div className="postItem">
      <div className="left">
        <img alt="img" src={`${IMG_URL}/${post?.images[0]}`} />
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
          <Link href={"/blog/" + post?._id}>Read more...</Link>
        </div>
      </div>
    </div>
  );
}

export default PostItem;
