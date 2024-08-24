import { useEffect, useRef, useState } from "react";
import { getBannerImagesFunction } from "../../Services/Apis";
import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";
import CarouselLoading from "../common/CarouselLoading";
import "./Carousel.css";
import Autoplay from "embla-carousel-autoplay";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Carousels = () => {
  const autoplay = useRef(Autoplay({ delay: 5000 }));
  const status = useSelector((state) => state.products.status);
  const [banner, setBanner] = useState([]);

  const [activeBanner, setActiveBanner] = useState([]);

  const fetchBanner = async () => {
    try {
      const response = await getBannerImagesFunction();
      if (response.status === 200) {
        setBanner(response.data?.banners);
      }
    } catch (error) {
      console.error("Error fetching Banner:", error);
    }
  };

  useEffect(() => {
    const activeBanner = banner?.filter((banner) => banner.status === "Active");
    setActiveBanner(activeBanner);
  }, [banner]);

  useEffect(() => {
    fetchBanner();
  }, []);

  return (
    <>
      {status === "Pending" ? (
        <CarouselLoading />
      ) : status === "Rejected" ? (
        <p>An Error Occurred</p>
      ) : (
        <div className="md:(px-5) px-3 lg:max-w-7xl mx-auto mt-5 ">
          <Carousel
            align="start"
            slideGap="xs"
            controlsOffset="xl"
            controlSize={40}
            loop
            plugins={[autoplay.current]}
            nextControlIcon={
              <MdArrowForwardIos className="text-primary sm:text-3xl text-lg" />
            }
            previousControlIcon={
              <MdArrowBackIosNew className="text-primary sm:text-3xl text-lg" />
            }
            className="responsive-carousel "
          >
            {activeBanner.map((i, index) => (
              <Carousel.Slide key={index}>
                <div>
                  <img
                    src={i.bannerImageUrl}
                    alt="banner image "
                    className="relative rounded-2xl h-full"
                  />
                  <Link className="rounded-full   md:py-4 sm:py-2 p-1 md:px-14 px-7 bg-[#CEDD5E] absolute top-[75%]  md:left-24 left-5  tracking-wider font-Nunito text-lg font-medium text-black hover:bg-white transition duration-500">
                    <p className="flex items-center md:gap-2 gap-1 ">
                      Shop Now
                      <span>
                        <FaArrowRight />
                      </span>
                    </p>
                  </Link>
                </div>
              </Carousel.Slide>
            ))}
          </Carousel>
        </div>
      )}
    </>
  );
};

export default Carousels;
