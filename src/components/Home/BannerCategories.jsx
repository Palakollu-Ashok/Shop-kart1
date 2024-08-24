import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getCategory } from "../../Services/Apis";
import { useEffect, useState } from "react";

const BannerCategories = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await getCategory();
      if (response.status === 200) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  var settings = {
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    swipeToSlide: true,
    autoplay: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="shadow-md   ">
      <div
        data-scroll
        data-scroll-section
        data-scroll-speed="0.1"
        className="md:(px-5) px-3 max-w-7xl mx-auto   py-2 "
      >
        <Slider {...settings} className="md:space-x-14 space-x-4 ">
          {categories?.map((d) => (
            <div key={d._id} className="flex ">
              <div className="flex flex-col items-center ">
                <div className="md:hidden block cursor-pointer">
                  <img
                    src={d.categoryImageUrl}
                    alt=""
                    className="w-12   h-12 rounded-full"
                  />
                </div>
                <small className="md:text-[18px] cursor-pointer font-Nunito md:p-2 p-1 text-[10px]  group ">
                  {d.categoryName}

                  <div class="bg-dark h-[2px] hidden md:block w-0  group-hover:w-full transition-all duration-500"></div>
                </small>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BannerCategories;
