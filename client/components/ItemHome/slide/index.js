import Slider from "react-slick";
import SlideItem from "../itemContent";
import { useEffect } from "react";
import { useState } from "react";
import { getData } from "@/libs/fetchData";
import { useDispatch } from "react-redux";
import { getLoading } from "@/stores/notifyReducer";
function SlideImg() {
  const dispatch = useDispatch();
  const [data, setData] = useState({ products: null, posts: null });
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getLoading(true));
        const res = await Promise.all([
          getData(
            "products/get-all?sort_by={%22sold%22:-1}&page=1&page_size=3"
          ),

          getData(`posts/get-all?sort_by=%22-createdAt%22&page=1&page_size=2`),
        ]);
        dispatch(getLoading(false));

        setData({ products: res[0].data.products, posts: res[1].data.posts });
      } catch (error) {
        console.log(error);
        dispatch(getLoading(false));
      }
    };
    fetchData();
  }, []);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    appendDots: (dots) => (
      <div className="slick-dot-container">
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={{
          width: "100%",
          opacity: "0",
        }}
      >
        {i + 1}
      </div>
    ),
  };

  return (
    <Slider {...settings}>
      {data.posts &&
        data.posts.map((item, idx) => {
          return <SlideItem key={idx} name={"blog"} value={item} />;
        })}
      {data.products &&
        data.products.map((item, idx) => {
          return <SlideItem key={idx} value={item} name={"shop"} />;
        })}
    </Slider>
  );
}

export default SlideImg;
