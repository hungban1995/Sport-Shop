import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "../../../components/QueryData/Pagination";
import PostItem from "../../../components/PostItem";
import { getData } from "../../../libs/fetchData";
import "./posts.scss";
import SortData from "../../../components/QueryData/Sort";
import FilterData from "../../../components/QueryData/Filter";
import { valueSortPost } from "../../../constants";
import { getLoading } from "../../../stores/notifyReducer";
function Posts() {
  const { refreshPosts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const [posts, setPosts] = useState(null);
  const [user, setUser] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [count, setCount] = useState(null);
  const [sort_by, set_sort_by] = useState("");
  const [filter_by, set_filter_by] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      const filter = { role: "admin" };
      try {
        const res = await getData(
          `users/get-all?filter_by=${JSON.stringify(filter)}`
        );
        let usersData = res.data.users;
        const newUsers = usersData.map((item) => ({
          name: item.username,
          value: item._id,
        }));
        setUser(newUsers);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);
  useEffect(() => {
    const getPosts = async () => {
      try {
        dispatch(getLoading(true));

        const res = await getData(
          `posts/get-all?page=${pageNum}&page_size=${pageSize}&sort_by=${sort_by}&filter_by=${filter_by}`
        );
        setPosts(res.data.posts);
        setCount(res.data.count);
        dispatch(getLoading(false));
      } catch (error) {
        console.log(error);
        dispatch(getLoading(false));
      }
    };
    getPosts();
  }, [refreshPosts, pageSize, pageNum, sort_by, filter_by]);

  return (
    <div className="posts">
      <div className="title">
        <span>Danh sách bài viết:</span>
        <Link to="new-post">Thêm mới</Link>
        <div className="select">
          <SortData valueSort={valueSortPost} set_sort_by={set_sort_by} />
          <FilterData
            valueFilter={user}
            typeFilter={{ name: "Người đăng", value: "author" }}
            set_filter_by={set_filter_by}
          />
        </div>
      </div>
      <div className="body">
        {posts ? (
          posts.map((post, idx) => {
            return <PostItem key={idx} post={post} />;
          })
        ) : (
          <div>Post not fount</div>
        )}
      </div>
      <Pagination
        count={count}
        pageSize={setPageSize}
        pageNum={setPageNum}
        lengthItem={posts?.length}
        values={[10, 20, 30]}
      />
    </div>
  );
}
export default Posts;
