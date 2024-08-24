import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productsFetch } from "../../Reducers/productsSlice";
import { Link } from "react-router-dom";
import CardLoadingSkeleton from "./CardLoadingSkeleton";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Card = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.products?.items.Products);
  const status = useSelector((state) => state.products.status);

  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    const filtered = data?.filter((products) => products.status === "Active");
    setFilterData(filtered);

    console.log(filterData);
  }, [data]);

  useEffect(() => {
    dispatch(productsFetch());
  }, [dispatch]);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 600,
    autoplaySpeed: 2000,
    arrows: false,
    pauseOnHover: false,
    appendDots: (dots) => (
      <div>
        <ul className="flex justify-center">
          <div className="flex justify-between">
            <span>{dots}</span>
          </div>
        </ul>
      </div>
    ),
    customPaging: () => (
      <div className="">
        <div className="md:h-[4px] md:w-[4px] w-[2px] h-[2px] bg-black/30 rounded-md active-class"></div>
      </div>
    ),
  };

  return (
    <div className="w-full md:px-5 px-3 max-w-7xl mx-auto gap-8  py-8 text-center">
      {status === "Pending" ? (
        <div>
          <CardLoadingSkeleton />
        </div>
      ) : status === "Rejected" ? (
        <p>An Error Occurred</p>
      ) : (
        <div>
          <h2 className="md:mb-10 mb-5">TRENDING NOW</h2>
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 justify-center grid-cols-2 md:place-items-stretch place-items-center 2xl:gap-16 md:gap-6 gap-4">
            {filterData
              ?.slice()
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 8)
              .map((item) => {
                const originalPrice = item.price;
                const salePrice = item.sale_price;
                const percentageDiscount =
                  ((originalPrice - salePrice) / originalPrice) * 100;

                const dateString = item.createdAt;
                const createdAt = new Date(dateString);
                const currentDate = new Date();
                const DaysAgo = new Date(currentDate);
                DaysAgo.setDate(currentDate.getDate() - 30);
                const isNew = createdAt > DaysAgo;

                return (
                  <div
                    key={item._id}
                    className="relative bg-white pb-3 w-full h-full space-y-2 group hover:bg-white"
                  >
                    <Link to={`/viewProducts/${item._id}`}>
                      <div className="group-hover:cursor-pointer">
                        <div className="relative w-full h-[160px] sm:h-[250px] md:h-[280px] lg:w-[240px] lg:h-[240px] rounded-lg">
                          <img
                            src={item.thumbnailImageUrl}
                            alt={item?.category?.categoryName}
                            className="w-full h-[160px] sm:h-[250px] md:h-[280px] lg:w-[240px] lg:h-[240px] object-cover object-top border rounded-md"
                          />
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                            <Slider {...settings}>
                              {item?.gallery?.map((image, index) => (
                                <div
                                  key={index}
                                  className="group-hover:border rounded-md"
                                >
                                  <img
                                    src={image.imageUrl}
                                    alt={`gallery-image-${index}`}
                                    className="w-full h-[160px] sm:h-[250px]  md:h-[280px] lg:w-[240px] lg:h-[240px] object-cover object-top  rounded-md"
                                  />
                                </div>
                              ))}
                            </Slider>
                          </div>
                        </div>
                      </div>
                    </Link>

                    <div className="p-2 space-y-3">
                      <Link to={`/viewProducts/${item._id}`}>
                        <div className="text-center truncate hover:text-primary">
                          <p className="font-medium uppercase mt-10">
                            {item.name}
                          </p>
                        </div>
                      </Link>

                      <div className="md:flex grid place-items-center items-center justify-center flex-wrap md:gap-2 gap-1">
                        {item.sale_price && (
                          <div>
                            <small className="text-dark font-bold">
                              Rs. {item.sale_price}
                            </small>
                          </div>
                        )}
                        <small
                          className={`${
                            item.sale_price
                              ? "line-through text-xs text-primary/60"
                              : ""
                          }`}
                        >
                          ₹ {item.price}
                        </small>
                        {item.sale_price && (
                          <div className=" text-primary  md:text-[14px] text-[12px]">
                            <small>{`(${percentageDiscount.toFixed(
                              2
                            )}% Off)`}</small>
                          </div>
                        )}
                      </div>

                      {isNew && (
                        <div className="absolute top-5 left-2 rounded-2xl bg-primary text-light px-2 md:text-[14px] text-[12px]">
                          <small>New</small>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
