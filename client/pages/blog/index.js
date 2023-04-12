import Pagination from "@/components/Pagination";
import SidebarCat from "@/components/SidebarCat";
import BreadCrumb from "@/components/bread-crumb";
import PostItem from "@/components/postsItem";
import ProductItem from "@/components/productItem";
import { getData } from "@/libs/fetchData";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
function Product(props) {
  const router = useRouter();
  const [posts, setProducts] = useState([]);
  const [categoriesPosts, setCategoriesPosts] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [count, setCount] = useState(null);
  const [sort_by, set_sort_by] = useState("");
  const [filter_by, set_filter_by] = useState("");
  useEffect(() => {
    setCategoriesPosts(props.categoriesPosts);
    setProducts(props.posts);
    setCount(props.count);
  }, [props]);
  useEffect(() => {
    router.push(
      `?page=${pageNum}&page_size=${pageSize}&sort_by=${sort_by}&filter_by=${filter_by}`
    );
  }, [pageNum, pageSize, sort_by, filter_by]);
  return (
    <>
      <Head>
        <title>Shops</title>
        <meta name="description" content="Blogs posts" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="blog">
        <BreadCrumb
          value={{ target: "Blog", items: [{ url: "/", name: "Trang chủ" }] }}
        />
        <div className="body">
          <div className="sidebarContainer">
            <SidebarCat categories={categoriesPosts} />
          </div>
          <div className="blog-container">
            <div className="sort">
              <div className="sort-value"></div>
            </div>
            <div className="items">
              {posts.length > 0 ? (
                posts.map((item, idx) => {
                  return <PostItem key={idx} post={item} />;
                })
              ) : (
                <div>Post not found</div>
              )}
            </div>
            <div>
              <Pagination
                count={count}
                pageSize={setPageSize}
                pageNum={setPageNum}
                lengthItem={posts?.length}
                values={[10, 20, 30]}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export async function getServerSideProps({ query }) {
  let categoriesPosts = [];
  let posts = [];
  let count = 0;
  const filter_by = query.filter ? query.filter : "";
  const sort_by = query.sort_by ? query.sort_by : "";
  const pageNum = query.page ? query.page : "";
  const page_size = query.page_size ? query.page_size : "";

  try {
    const categoriesRes = await getData("categories-posts/get-all");
    categoriesPosts = categoriesRes.data.categories;
  } catch (error) {
    console.log(error);
  }

  try {
    const postsRes = await getData(
      `posts/get-all?page=${pageNum}&page_size=${page_size}&sort_by=${sort_by}&filter_by=${filter_by}`
    );
    posts = postsRes.data.posts;
    count = posts.data.count;
  } catch (error) {
    console.log(error);
  }

  return { props: { categoriesPosts, posts, count } };
}
export default Product;
