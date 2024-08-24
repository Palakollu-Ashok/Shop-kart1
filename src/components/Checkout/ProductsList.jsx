import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  clearCart,
  deleteCartItem,
  getCartDetails,
} from "../../Reducers/cartThunk";
import { MdDeleteForever } from "react-icons/md";

export default function ProductsList({ cartItems }) {
  const userId = sessionStorage.getItem("userId");
  const id = sessionStorage.getItem("userId");
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      dispatch(getCartDetails(userId));
    }
  }, [dispatch, userId]);

  const handleRemoveFromCart = async (productId) => {
    await dispatch(deleteCartItem({ id, productId }));
    await dispatch(getCartDetails(userId));
  };

  const handleClearCart = async (userId) => {
    setLoading(true);
    await dispatch(clearCart(userId));
    await dispatch(getCartDetails(userId));
    setLoading(false);
  };

  return (
    <div className="w-full h-fit font-Nunito  px-2  md:mt-9 mt-5  md:py-5 py-2">
      <div className="py-4 flex justify-between items-center ">
        <p className="font-medium">Cart Items ({cartItems?.length})</p>
        <p
          className="font-medium border border-red-400 rounded-md shadow-sm  p-1 text-red bg-light hover:cursor-pointer"
          onClick={() => handleClearCart(userId)}
        >
          {loading ? "Clearing Cart..." : "Clear Cart"}
        </p>
      </div>

      <hr />

      <div className="flex justify-between items-center py-4 ">
        <h4>Product</h4>
        <h4>Total</h4>
      </div>
      <hr />
      <div className="space-y-3 my-4">
        {cartItems?.map((cartItem) => (
          <div
            key={cartItem.productId._id}
            className="flex items-center justify-between  p-4"
          >
            <div className="flex items-center  gap-4">
              <div className="relative">
                <img
                  src={cartItem.productId.thumbnailImageUrl}
                  alt={cartItem.productId.name}
                  className="sm:w-[70px] sm:h-[70px] h-[80px] rounded-lg overflow-hidden  w-[80px] p-1  border"
                />

                <p className="absolute grid place-content-center -top-3  -right-2 bg-[#6C6E70] text-secondary rounded-full w-6 h-6 text-xs">
                  {cartItem.quantity}
                </p>
              </div>
              <div className="grid w-1/3">
                <small className="font-medium truncate">
                  {cartItem.productId.name}
                </small>

                <div className="flex gap-3 w-full items-center mt-2">
                  <p
                    className={`${
                      cartItem.productId.sale_price
                        ? "text-green-600 space-x-1"
                        : "text-paragraph-color"
                    } font-semibold`}
                  >
                    <span>₹</span>
                    <span>
                      {cartItem.productId.sale_price
                        ? `${cartItem.productId.sale_price}`
                        : `${cartItem.productId.price}`}
                    </span>
                  </p>
                  {cartItem.productId.sale_price && (
                    <small className="text-paragraph-color flex items-center   line-through">
                      ₹ <small>{cartItem.productId.price}</small>
                    </small>
                  )}
                </div>
                {cartItem.productId.stock > 0 &&
                  cartItem.productId.stock <= 10 && (
                    <p className="text-red mt-2">
                      Only {cartItem.productId.stock} {cartItem.productId.name}{" "}
                      left! Hurry up!
                    </p>
                  )}
              </div>
            </div>

            <div className="self-start">
              <h3
                onClick={() => handleRemoveFromCart(cartItem.productId._id)}
                className="hover:text-red text-dark hover:cursor-pointer"
              >
                <MdDeleteForever className="w-7 h-7 bg-light shadow-sm p-1  rounded-full border border-dark/20"/>
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

ProductsList.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      productId: PropTypes.shape({
        imageUrl: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        sale_price: PropTypes.number,
        price: PropTypes.number.isRequired,
      }).isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
};
