import { FaRegHeart, FaHeart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Loading from "../common/Loading";
import PropTypes from "prop-types";

export default function ProductDetails({
  id,
  data,
  isProductInCart,
  counter,
  loading,
  handleDecrease,
  handleIncrease,
  handleAddToCart,
  handleAddWishlist,
  wishlistData,
  handleRemoveItem,
}) {
  const discountPercentage =
    data?.sale_price && data?.price
      ? ((data.price - data.sale_price) / data.price) * 100
      : 0;
  return (
    <div className="md:space-y-10 space-y-3 md:w-1/2 mt-4 md:mt-0">
      <div className="space-y-2">
        <h3 className="text-dark tracking-wide font-Nunito">{data?.name}</h3>

        <div className="grid gap-2 mt-2">
          <div className="flex space-x-4 mt-5 items-center">
            <h4 className="text-red font-Nunito text-lg tracking-wider">
              {`-${discountPercentage.toFixed(0)}% Off`}
            </h4>
            <h4
              className={`${
                data?.sale_price
                  ? "text-dark text-xl   font-Nunito"
                  : "text-paragraph-color font-Nunito text-xl"
              } font-semibold`}
            >
              {data?.sale_price ? `₹ ${data?.sale_price}` : `₹ ${data?.price}`}
            </h4>
          </div>
          {data?.sale_price && (
            <div className="flex items-center mt-1 font-Nunito gap-1">
              <h3 className="text-paragraph-color text-sm font-normal">MRP</h3>
              <h4 className="text-paragraph-color line-through text-sm font-normal">
                ₹ {data?.price}
              </h4>
            </div>
          )}
        </div>
      </div>

      {data?.stock > 0 && data?.stock <= 10 && (
        <div className="text-red mt-2">
          Only {data?.stock} {data?.name} left! Hurry up!
        </div>
      )}

      <div className="sm:space-x-6 space-y-3">
        <div className="space-y-3">
          {isProductInCart ? (
            <div className="grid h-24  w-1/5 ">
              <h3 className="text-dark text-start ">Quanity</h3>
              <div className="flex items-center gap-3   justify-center border rounded-md">
                <button onClick={handleDecrease} className="">
                  -
                </button>
                <div className="">{counter}</div>
                <button onClick={handleIncrease} className="">
                  +
                </button>
              </div>
            </div>
          ) : (
            <>
              <div
                className={`${
                  data?.stock === 0 || data?.stock === null
                    ? "hidden"
                    : " gap-3  h-24 mb-1   flex  items-end "
                } `}
              >
                <div className="grid md:h-24   md:w-1/5 ">
                  <h4 className="text-dark text-start p-1">Quanity</h4>
                  <div className="flex items-center gap-3 p-2  justify-center border rounded-md">
                    <button onClick={handleDecrease} className="">
                      {loading ? (
                        <Loading />
                      ) : counter === 1 ? (
                        <MdDelete className="mt-1" />
                      ) : (
                        "-"
                      )}
                    </button>
                    <div className="">{counter}</div>
                    <button onClick={handleIncrease} className="">
                      {loading ? <Loading /> : "+"}
                    </button>
                  </div>
                </div>
                <div className="flex mb-0.5 sm:mb-0  w-full justify-end items-end">
                  <button
                    onClick={() => handleAddToCart()}
                    className={`${
                      data?.stock === 0 || data?.stock === null
                        ? "bg-gray-500 cursor-not-allowed w-full  text-xs md:text-lg"
                        : "bg-active-green  hover:bg-dark  text-light font-Nunito duration-500 rounded-md text-xs md:text-lg w-full p-3"
                    } text-light px-3 font-semibold`}
                    disabled={data?.stock === 0 || data?.stock === null}
                  >
                    {data?.stock === 0 || data?.stock === null
                      ? "Out of Stock"
                      : "Add to Cart"}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div>
        {wishlistData &&
        wishlistData.length > 0 &&
        wishlistData?.some((item) => item?.productId?._id === id) ? (
          <div
            onClick={() => handleRemoveItem(id)}
            className="flex items-center justify-center rounded-md space-x-2 p-3 px-4 border-2 border-red-500 text-[10px] md:text-lg hover:cursor-pointer"
          >
            <FaHeart className="text-red font-Nunito" />
            <h4 className="text-red text-[10px] font-Nunito md:text-lg">
              Added to wishlist
            </h4>
          </div>
        ) : (
          <div
            className="flex items-center justify-center rounded-md space-x-2 p-3 text-center px-4 border-2 hover:cursor-pointer text-xs md:text-lg"
            onClick={handleAddWishlist}
          >
            <FaRegHeart className="hover:text-red" />
            <h4 className="text-[10px] md:text-lg">Add to wishlist</h4>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h3>Product Description</h3>
        <p className="font-Nunito">{data?.description}</p>
      </div>

      {/* <div className="space-y-2 pt-1">
        <h3>PRODUCT DETAILS</h3>
        {data?.descriptionList.map((item) => (
          <ul key={item._id} className="list-disc ml-8">
            <li>{item}</li>
          </ul>
        ))}
      </div> */}
    </div>
  );
}

ProductDetails.propTypes = {
  id: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
  isProductInCart: PropTypes.bool.isRequired,
  counter: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  handleDecrease: PropTypes.func.isRequired,
  handleIncrease: PropTypes.func.isRequired,
  handleAddToCart: PropTypes.func.isRequired,
  handleAddWishlist: PropTypes.func.isRequired,
  handleRemoveItem: PropTypes.func.isRequired,
  wishlistData: PropTypes.array.isRequired,
};
