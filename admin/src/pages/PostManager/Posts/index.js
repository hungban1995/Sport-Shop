import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PostItem from "../../../components/PostItem";
import { getData } from "../../../libs/fetchData";
import "./posts.scss";
function Posts() {
  const { refreshPosts } = useSelector((state) => state.posts);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await getData("posts/get-all");
        setPosts(res.data.posts);
      } catch (error) {
        console.log(error);
      }
    };
    getPosts();
  }, [refreshPosts]);
  if (!posts) return <div>Post not found</div>;
  return (
    <div className="posts">
      <div className="title">
        <span>Danh sách bài viết:</span>
        <Link to="new-post">Thêm mới</Link>
      </div>
      <div className="body">
        {posts &&
          posts.map((post, idx) => {
            return <PostItem key={idx} post={post} />;
          })}
      </div>
    </div>
  );
}
export default Posts;