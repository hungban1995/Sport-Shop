import BreadCrumb from "@/components/bread-crumb";
import { IMG_URL } from "@/constant";
import { getData } from "@/libs/fetchData";
import { getLoading } from "@/stores/notifyReducer";
import moment from "moment";
import Head from "next/head";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

function Post(props) {
  const dispatch = useDispatch();

  const [post, setPost] = useState(null);
  useEffect(() => {
    setPost(props.post);
  }, [props.post]);
  //- render Content
  const RenderPostContent = () => {
    return { __html: post && post?.content };
  };
  if (!post) return <div>Post not found!</div>;
  return (
    <>
      <Head>
        <title>{post?.title}</title>
        <meta name="description" content={post?.description} />
      </Head>
      <div className="post-container">
        <BreadCrumb
          value={{
            target: "Post",
            items: [
              { url: "/", name: "Trang chủ" },
              { url: "/blog", name: "Blog" },
            ],
          }}
        />
        <div className="post-content">
          <div className="post-image">
            <img
              src={
                post?.images.length > 0 ? `${IMG_URL}/${post?.images[0]}` : ""
              }
            />
          </div>
          <div className="post-text-content">
            <h2 className="post-title">{post && post?.title}</h2>
            <p style={{ textAlign: "end" }}>
              By{" "}
              <strong style={{ fontWeight: "bold" }}>
                {post && post?.author?.username}
              </strong>{" "}
              on{" "}
              <span style={{ fontStyle: "italic" }}>
                {post && moment(post?.createdAt).format("L")}
              </span>
            </p>
            <br />
            <h5 style={{ textAlign: "center" }}>
              "{post && post?.description}"
            </h5>
            <div dangerouslySetInnerHTML={RenderPostContent()}></div>
            <hr />
          </div>
        </div>
      </div>
    </>
  );
}

export default Post;
export const getServerSideProps = async (req) => {
  let post = {};
  try {
    const { id } = req.query;
    const res = await getData("posts/get-id/" + id);
    post = res.data.post;
  } catch (error) {
    console.log(error.response.data.error);
  }
  return {
    props: {
      post,
    },
  };
};
