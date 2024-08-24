import { useState } from "react";
import { Link } from "react-router-dom";
import {
  getWishlistFunction,
  removeWishlistFunction,
} from "../../Services/Apis";
import { useEffect } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";

import bag from "../../static/assets/5630080.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loading from "../common/Loading";
const WishlistItems = () => {
  const userToken = sessionStorage.getItem("userToken");
  const id = sessionStorage.getItem("userId");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(data);

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
      <div className="mt-2">
        <div className="h-[4px] w-[4px] bg-black/30 rounded-md active-class"></div>
      </div>
    ),
  };

  const fetchWishlistData = async () => {
    setLoading(true);
    const response = await getWishlistFunction(id);

    if (response.status === 200) {
      setLoading(false);
      setData(response.data.Wishlist);
    }
  };

  const handleRemoveItem = async (productId) => {
    const response = await removeWishlistFunction(id, productId);
    if (response.status === 200) {
      fetchWishlistData();
    }
  };

  useEffect(() => {
    fetchWishlistData();
  }, [id]);

  const renderWishlistItems = () => {
    if (!userToken) {
      return (
        <div className="grid place-content-center font-Nunito py-10">
          <div className="md:mb-20 mb-10 ">
            <h4 className="text-center mb-4">PLEASE LOG IN</h4>
            <p>Login to view items in your wishlist.</p>
          </div>
          <Link
            to="/login"
            className="border-2 bg-dark rounded-md text-center font-Nunito text-light border-dark md:p-3 p-2 hover:bg-light hover:text-dark duration-500"
          >
            Login to see the details
          </Link>
        </div>
      );
    }
    return (
      <div>
        {loading ? (
          <div className="md:h-[90vh] h-[45vh]">
            <Loading />
          </div>
        ) : (
          <div>
            {data && data.products && data.products.length > 0 ? (
              <div className="md:mt-14 mt-7">
                <div className="text-start gap-1 flex items-center  font-Nunito mt-4 ">
                  {" "}
                  <span className="text-dark font-semibold">My Wishlist</span>
                  <span className=" text-dark/70 font-Nunito">
                    {data.products.length}
                  </span>
                  <span className="text-dark/70 font-Nunito">items</span>
                </div>
                <div className=" lg:grid-cols-4 sm:grid-cols-3  2xl:gap-16 grid grid-cols-2 md:gap-6 gap-4 mb-10 mt-5">
                  {data.products?.map((item) => (
                    <div
                      key={item?.productId?._id}
                      className="relative border shadow-sm  bg-white md:w-[230px] space-y-2   hover:bg-white hover:shadow-md hover:shadow-primary/10"
                    >
                      <div className="cursor-pointer">
                        <div className="relative w-full h-full">
                          <Link to={`/viewProducts/${item.productID}`}>
                            <img
                              src={item.productId?.thumbnailImageUrl}
                              alt={item?.category?.categoryName}
                              className="w-full lg:h-[280px] h-[200px]  object-cover transition-transform duration-500 ease-in-out"
                            />
                          </Link>
                          {/* <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                          <Slider {...settings}>
                            {item?.productId?.gallery?.map((image, index) => (
                              <div key={index}>
                                <img
                                  src={image.imageUrl}
                                  alt={`gallery-image-${index}`}
                                  className="w-[230px] md:h-[280px] h-[150px] object-cover"
                                />
                              </div>
                            ))}
                          </Slider>
                        </div> */}

                          <div
                            onClick={() =>
                              handleRemoveItem(item?.productId?._id)
                            }
                            className="absolute flex justify-center border items-center  top-2 md:w-8 md:h-8 w-4 h-4 p-0.5 md:p-0 bg-light/90  rounded-full right-3 hover:cursor-pointer"
                          >
                            <RiDeleteBin5Line className="" />
                          </div>
                        </div>
                      </div>
                      <div className="">
                        <div className="py-3">
                          <h4 className="mt-4 px-3 truncate hover:text-primary">
                            {item?.productId?.name}
                          </h4>
                          {item?.productId?.sale_price && (
                            <div className=" grid gap-2 p-1 justify-center font-Nunito items-center w-full h-full">
                              <p className="md:flex gap-2 p-1 justify-center items-center">
                                <h5 className="text-dark text-center ">
                                  Rs.{item?.productId?.sale_price}
                                </h5>
                                <span className="line-through mt-0.5 text-xs text-dark/60">
                                  ₹{item?.productId?.price}
                                </span>
                                <span className="text-orange-500 ">
                                  (<span className="p-0.5">Save</span>
                                  {calculatePercent(
                                    item?.productId?.price,
                                    item?.productId?.sale_price
                                  )}
                                  %)
                                </span>
                              </p>
                            </div>
                          )}
                          {!item?.productId?.sale_price && (
                            <p>{item?.productId?.price}</p>
                          )}
                        </div>
                        <div>
                          <div className="w-full font-Nunito  text-center cursor-pointer border-t py-3 relative inline-flex group items-center justify-start overflow-hidden transition-all bg-white  hover:bg-white">
                            <span className="w-0 h-0  bg-dark absolute left-0 bottom-0 ease-out duration-500 transition-all group-hover:w-full group-hover:h-full -z-1"></span>

                            <h6 className="w-full text-red transition-colors font-semibold duration-300 ease-in-out group-hover:text-white z-10">
                              Move to Bag
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid place-items-center place-content-center md:h-[60vh] h-[40vh] w-full gap-3">
                <img
                  src={bag}
                  alt="empty bag"
                  className="md:w-[300px] w-[100px]"
                />
                <h3 className="font-medium text-dark">
                  Your wishlist is Empty!
                </h3>
                <p>Explore more and shortlist some items</p>

                <Link to="/allProducts" className="hover:cursor-pointer">
                  <p className="border-2 p-3 text-light bg-dark hover:text-dark hover:bg-light font-Nunito font-medium border-dark duration-500">
                    Start Shopping
                  </p>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const calculatePercent = (originalPrice, salePrice) => {
    const percentageDiscount =
      ((originalPrice - salePrice) / originalPrice) * 100;
    return Math.round(percentageDiscount);
  };

  return (
    <div className="2xl:px-[160px] sm:px-[50px] px-[10px] gap-8">
      {renderWishlistItems()}
    </div>
  );
};

export default WishlistItems;
