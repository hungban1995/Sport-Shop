import Slider from "react-slick";
import SlideItem from "../itemContent";
function SlideImg() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <Slider {...settings}>
      <SlideItem />
      <SlideItem />
      <SlideItem />
    </Slider>
  );
}

export default SlideImg;
