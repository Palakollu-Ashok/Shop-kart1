import { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ThumbnailSlider.css";
import PropTypes from "prop-types";
import { LuChevronLeftCircle, LuChevronRightCircle } from "react-icons/lu";
import ZoomableImage from "./ZoomableImage";
import { BsFullscreen, BsFullscreenExit } from "react-icons/bs";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

import { useFullscreen } from "@mantine/hooks";
import { TfiClose } from "react-icons/tfi";


const ThumbnailSlider = ({ data }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const { toggle, fullscreen } = useFullscreen();

  console.log(data);

  const openModal = (index) => {
    setModalOpen(true);
    setSlideIndex(index);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const plusSlides = (n) => {
    const newIndex = (slideIndex + n + data.length) % data.length;
    setSlideIndex(newIndex);
  };

  let sliderRef = useRef(null);
  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: true,
  };

  return (
    <div className="overflow-hidden ">
      <div className="overflow-hidden top-0 sticky">
        <Slider
          Slider
          ref={(slider) => {
            sliderRef = slider;
          }}
          {...settings}
        >
          {data?.map((image, index) => (
            <div key={index} className="w-full md:w-1/4  md:h-screen">
              <img
                src={image?.imageUrl}
                alt={image.name}
                className="w-full hover:shadow cursor-pointer  md:h-screen sm:h-[400px] h-[300px] "
                onClick={() => openModal(index)}
              />
            </div>
          ))}
        </Slider>

        <div
          style={{ textAlign: "center" }}
          className="w-full flex absolute  bottom-[50%] md:px-4 px-2  justify-between"
        >
          <button className="button  -left-6" onClick={previous}>
            <LuChevronLeftCircle className="lg:text-5xl text-3xl text-secondary" />
          </button>
          <button className="button" onClick={next}>
            <LuChevronRightCircle className="lg:text-5xl text-3xl text-secondary" />
          </button>
        </div>
      </div>

      {modalOpen && (
        <div className="modal fixed z-[999] top-0 left-0 w-full h-full bg-white flex justify-center items-center overflow-hidden px-3">
          <div className="">
            <div className="absolute top-5 text-xl  right-[50%]  text-dark">
              {slideIndex + 1} / {data.length}
            </div>
            <button
              onClick={toggle}
              className="absolute top-5 md:right-48  sm:right-32 right-20  text-dark "
            >
              {fullscreen ? (
                <BsFullscreenExit className="text-xl   text-dark" />
              ) : (
                <BsFullscreen className="text-xl text-dark" />
              )}
            </button>
            {/* closeModal */}
            <button
              className="close absolute top-5 md:right-36 sm:right-14 right-7  text-dark     cursor-pointer"
              onClick={closeModal}
            >
              <TfiClose className="text-xl" />
            </button>
          </div>
          <div className="modal-content  relative">
            <div className="mySlides">
              <ZoomableImage
                srcImage={data[slideIndex].imageUrl}
                alt={data[slideIndex].name}
                className=""
              />
            </div>
          </div>

          {/* arrows */}
          <a
            className="prev absolute top-1/2 left-0   text-3xl -translate-y-1/2 text-dark   cursor-pointer p-8"
            onClick={() => plusSlides(-1)}
          >
            <AiOutlineLeft />
          </a>
          <a
            className="next absolute top-1/2 right-0  text-3xl  -translate-y-1/2 text-dark   p-8  cursor-pointer "
            onClick={() => plusSlides(1)}
          >
            <AiOutlineRight />
          </a>
        </div>
      )}
    </div>
  );
};

ThumbnailSlider.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  goToSlide: PropTypes.func.isRequired,
};

export default ThumbnailSlider;
