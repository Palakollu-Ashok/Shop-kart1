import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productsFetch } from "../../Reducers/productsSlice";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ShopCardLoading from "../common/ShopCardLoading";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ShopCard = ({ searchResults, filteredData }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.products.items.Products);
  const status = useSelector((state) => state.products.status);

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
        <ul className="md:flex justify-center">
          <div className="md:flex justify-between">
            <span>{dots}</span>
          </div>
        </ul>
      </div>
    ),
    customPaging: () => (
      <div className="mt-2">
        <div className="md:h-[4px] md:w-[4px] w-[2px] h-[2px] bg-black/30 rounded-md active-class"></div>
      </div>
    ),
  };

  const renderProductCard = (item) => {
    const originalPrice = item.price;
    const salePrice = item.sale_price;
    const percentageDiscount =
      ((originalPrice - salePrice) / originalPrice) * 100;
    const dateString = item.createdAt || item.created_at;
    const createdAt = new Date(dateString);
    const currentDate = new Date();
    const daysAgo = new Date(currentDate);
    daysAgo.setDate(currentDate.getDate() - 30);
    const isNew = createdAt > daysAgo;

    return (
      <div
        key={item._id}
        className="relative bg-white pb-3 space-y-2 group md:mb-6 mb-3"
      >
        <Link to={`/viewProducts/${item._id}`}>
          <div className="group-hover:cursor-pointer">
            <div className="relative w-full h-full">
              <img
                src={item.thumbnailImageUrl || item.imageUrl}
                alt={item?.category?.categoryName || "Product Image"}
                className="w-full h-[200px] sm:h-[200px] md:h-[250px] lg:h-[240px] object-top  object-cover transition-transform duration-500 ease-in-out border rounded-md"
              />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 w-full transition-opacity duration-500 ease-in-out">
                <Slider {...settings}>
                  {item?.gallery?.map((image, index) => (
                    <div key={index}>
                      <img
                        src={image.imageUrl}
                        alt={`gallery-image-${index}`}
                        className="w-full h-[200px] sm:h-[200px] md:h-[250px] lg:h-[240px]  object-cover object-top border rounded-md"
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </Link>
        <div className="p-2 space-y-3 font-Nunito ">
          <Link to={`/viewProducts/${item._id}`}>
            <div className=" truncate hover:text-primary">
              <p className="">{item.name}</p>
            </div>
          </Link>
          <div className="md:flex items-center justify-center font-Nunito flex-wrap md:gap-2 gap-1">
            {salePrice && (
              <div>
                <p className="">Rs. {salePrice}</p>
              </div>
            )}
            <p
              className={`${
                salePrice ? "line-through text-xs text-dark/60" : ""
              }`}
            >
              ₹ {originalPrice}
            </p>
            {salePrice && (
              <div className="rounded-2xl text-primary px-2 md:text-[14px] text-[12px]">
                <small>{`(${percentageDiscount.toFixed(2)}% Off)`}</small>
              </div>
            )}
          </div>
          {isNew && (
            <div className="absolute top-3 left-2 rounded-2xl bg-primary text-light md:text-[14px] text-[12px]">
              <small>New</small>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      {status === "Pending" ? (
        <ShopCardLoading />
      ) : status === "Rejected" ? (
        <p>An Error Occurred</p>
      ) : (
        status === "Success" && (
          <>
            {searchResults?.length === 0 && filteredData?.length === 0 ? (
              <ShopCardLoading />
            ) : (
              <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-3 grid-cols-2 gap-4 md:gap-10 2xl:gap-3">
                {(filteredData?.length > 0 ? filteredData : data)?.map(
                  renderProductCard
                )}
              </div>
            )}
          </>
        )
      )}
    </div>
  );
};

ShopCard.propTypes = {
  searchResults: PropTypes.array.isRequired,
  filteredData: PropTypes.array.isRequired,
};

export default ShopCard;
