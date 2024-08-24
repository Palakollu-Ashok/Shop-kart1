import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const YouAlsoMayLike = () => {
  var settings = {
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    swipeToSlide: true,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  return (
    <div className="2xl:px-72 py-8">
      {/* <h2>You Might Also Like</h2> */}
      <Slider {...settings} className=" space-x-14 ">
        {/* {data.map((d, i) => ( */}
        {/* <div className=""> */}
        {/* <div className="grid gap-4 place-items-center text-8xl text-light font-extralight"> */}
        {/* <img
                src={d.icon}
                alt=""
                className="m-4 w-36 h-36 border border-black rounded-full "
              /> */}
        {/* <Card /> */}

        {/* </div> */}
        {/* </div> */}
        {/* ))} */}
      </Slider>
    </div>
  );
};

export default YouAlsoMayLike;
