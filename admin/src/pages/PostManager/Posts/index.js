import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "../../../components/QueryData/Pagination";
import PostItem from "../../../components/PostItem";
import { getData } from "../../../libs/fetchData";
import "./posts.scss";
import SortData from "../../../components/QueryData/Sort";
import FilterData from "../../../components/QueryData/Filter";
function Posts() {
  const { refreshPosts } = useSelector((state) => state.posts);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [count, setCount] = useState(null);
  const [sort_by, set_sort_by] = useState("");
  const [filter_by, set_filter_by] = useState("");
  const [sortValues, setSortValues] = useState([
    { name: "Ngày đăng Tăng dần", value: "createdAt" },
    { name: "Ngày đăng Giảm dần", value: "-createdAt" },
  ]);
  useEffect(() => {
    const getUsers = async () => {
      const filter = { role: "admin" };
      try {
        const res = await getData(
          `users/get-all?filter_by=${JSON.stringify(filter)}`
        );
        setUser(res.data.users);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);
  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await getData(
          `posts/get-all?page=${pageNum}&page_size=${pageSize}&sort_by=${sort_by}&filter_by=${filter_by}`
        );
        setPosts(res.data.posts);
        setCount(res.data.count);
      } catch (error) {
        console.log(error);
      }
    };
    getPosts();
  }, [refreshPosts, pageSize, pageNum, sort_by, filter_by]);

  if (!posts) return <div>Post not found</div>;
  return (
    <div className="posts">
      <div className="title">
        <span>Danh sách bài viết:</span>
        <Link to="new-post">Thêm mới</Link>
        <div style={{ display: "inline-flex" }}>
          <SortData valueSort={sortValues} set_sort_by={set_sort_by} />
          <FilterData
            valueFilter={user}
            typeFilter={"author"}
            set_filter_by={set_filter_by}
          />
        </div>
      </div>
      <div className="body">
        {posts &&
          posts.map((post, idx) => {
            return <PostItem key={idx} post={post} />;
          })}
      </div>

      <Pagination
        count={count}
        pageSize={setPageSize}
        pageNum={setPageNum}
        lengthItem={posts?.length}
      />
    </div>
  );
}
export default Posts;
