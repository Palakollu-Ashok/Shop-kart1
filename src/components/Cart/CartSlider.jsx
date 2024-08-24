// import "./CartSlider.css";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import PropTypes from "prop-types";
// import { useEffect } from "react";
// import { deleteCartItem, getCartDetails } from "../../Reducers/cartThunk";
// import bag from "../../static/assets/bag_12271368.png";

// const CartSlider = ({ isOpen, setIsOpen }) => {
//   const navigate = useNavigate();
//   const userId = sessionStorage.getItem("userId");
//   const userToken = sessionStorage.getItem("userToken");
//   const id = sessionStorage.getItem("userId");
//   const dispatch = useDispatch();
//   const cart = useSelector((state) => state.cart?.items?.Cart?.products);

//   useEffect(() => {
//     if (userId) {
//       dispatch(getCartDetails(userId));
//     }
//   }, [dispatch, userId]);

//   const handleCheckout = () => {
//     if (userToken) {
//       navigate("/Checkout");
//     } else {
//       navigate("/login/");
//     }
//   };
//   // console.log(cartItem);
//   const handleRemoveFromCart = async (productId) => {
//     await dispatch(deleteCartItem({ id, productId }));
//     await dispatch(getCartDetails(userId));
//   };

//   const renderCartItems = () => {
//     if (!userToken) {
//       return (
//         <>
//           <div className="flex justify-between font-Nunito shadow-md w-full p-2">
//             <h3 className="text-dark font-Nunito">Shopping cart</h3>

//             <button
//               onClick={() => setIsOpen(false)}
//               className="text-dark font-Nunito text-lg"
//             >
//               <MdOutlineClose />
//             </button>
//           </div>
//           <div className="grid items-center justify-center w-full  h-[30vh]">
//             <Link
//               to="/login"
//               className="border-2 border-dark rounded-md font-Nunito p-2   hover:bg-light bg-dark group hover:text-dark text-light hover:duration-500"
//             >
//               <p className="text-light group-hover:text-dark">
//                 Login to see the details
//               </p>
//             </Link>
//           </div>
//         </>
//       );
//     }

//     if (!cart || cart.length === 0) {
//       return (
//         <div className="grid place-items-center h-full w-full place-content-center gap-3">
//           <img src={bag} alt="empty bag" className="w-[80px]" />
//           <h3 className="font-medium text-dark">Hey, it feels so light!</h3>
//           <p>There is nothing in your bag. Let's add some items.</p>
//           <Link
//             to="/allProducts/"
//             className="border-2 border-dark rounded-md font-Nunito p-2  group  hover:bg-light bg-dark group hover:text-dark text-light hover:duration-500"
//           >
//             <p className="text-light group-hover:text-dark group-hover:duration-500">
//               Your cart is empty. Add items to your cart.
//             </p>
//           </Link>
//         </div>
//       );
//     }

//     return (
//       <>
//         <div className="flex justify-between bg-[#f8f9fa] py-3 px-2 font-Nunito shadow-md sticky top-0 w-full">
//           <h3 className="text-dark font-Nunito">Shopping cart</h3>

//           <div className="flex text-dark gap-1 items-center">
//             <p className="font-Nunito">({cart ? cart?.length : "0"})</p>
//             <h4 className="md:mr-10 mr-5 ">Products</h4>
//           </div>

//           <button
//             onClick={() => setIsOpen(false)}
//             className="text-dark font-Nunito text-lg"
//           >
//             <MdOutlineClose />
//           </button>
//         </div>
//         {cart &&
//           cart.map((cartItem) => (
//             <div>
//               <div key={cartItem?._id} className=" "></div>

//               <div className="flex justify-between  font-Nunito  h-full items-start gap-3 p-3 ">
//                 <div className="border md:w-1/3 w-1/2">
//                   <img
//                     src={cartItem?.productId.thumbnailImageUrl}
//                     alt={cartItem?.productId.name}
//                     className="md:h-[100px] h-fit  md:w-full"
//                   />
//                 </div>
//                 <div className="space-y-4 h-full w-full">
//                   <p className="font-Nunito font-semibold">
//                     {cartItem.productId.name}
//                   </p>
//                   <div className="flex items-center space-x-2 h-full">
//                     <p className="font-Nunito font-semibold">
//                       {cartItem.quantity}
//                     </p>
//                     <p className="font-Nunito font-semibold">x</p>
//                     <p className="font-Nunito font-semibold">
//                       {cartItem.productId.sale_price
//                         ? cartItem.productId.sale_price
//                         : cartItem.productId.price}
//                     </p>
//                   </div>
//                 </div>
//                 <div>
//                   <p
//                     onClick={() =>
//                       handleRemoveFromCart(cartItem?.productId._id)
//                     }
//                     className="hover:text-red hover:cursor-pointer"
//                   >
//                     <span>
//                     </span>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//       </>
//     );
//   };

//   const sliderClasses = `
//     fixed top-0 right-0 h-full w-[70%] md:w-[50%] xl:w-[30%]  bg-white shadow-lg
//     transform transition-transform ease-in duration-300
//     ${
//       isOpen
//         ? "translate-x-0 z-[999] overflow-y-scroll openSlider no-scrollbar "
//         : "translate-x-full z-[999]"
//     }
//   `;

//   return (
//     <div className={sliderClasses}>
//       <div className="space-y-4 ">{renderCartItems()}</div>

//       <div className="space-y-[4%] w-full  flex items-end h-full  place-end  px-3">
//         <div className="mb-4 w-full">
//           <button
//             onClick={handleCheckout}
//             className="w-full p-1 hover:bg-light  hover:text-dark bg-dark text-white duration-500 border-2 border-dark rounded-md font-Nunito md:text-xl text-xs"
//           >
//             Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// CartSlider.propTypes = {
//   isOpen: PropTypes.bool.isRequired,
//   setIsOpen: PropTypes.func.isRequired,
// };

// export default CartSlider;

import "./CartSlider.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { deleteCartItem, getCartDetails } from "../../Reducers/cartThunk";
import { MdDeleteForever } from "react-icons/md";

const CartSlider = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");
  const userToken = sessionStorage.getItem("userToken");
  const id = sessionStorage.getItem("userId");
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart?.items?.Cart?.products);

  useEffect(() => {
    if (userId) {
      dispatch(getCartDetails(userId));
    }
  }, [dispatch, userId]);

  const handleCheckout = () => {
    if (userToken) {
      navigate("/Checkout");
      setIsOpen(false);
    } else {
      navigate("/login/");
    }
  };

  const handleRemoveFromCart = async (productId) => {
    await dispatch(deleteCartItem({ id, productId }));
    await dispatch(getCartDetails(userId));
  };

  const cartCheckout = () => {
    if (userToken) {
      return (
        <div
          className="w-full space-y-4 py-6 px-4 sticky bottom-0 bg-white"
          data-scroll-section
        >
          <div className="">
            <button
              onClick={handleCheckout}
              className="w-full p-1 hover:bg-light  hover:text-dark bg-dark text-white duration-500 border-2 border-dark rounded-md font-Nunito md:text-xl text-xs"
            >
              Checkout
            </button>
          </div>
        </div>
      );
    }
  };

  const renderCartItems = () => {
    if (!userToken) {
      return (
        <div className="grid place-content-center h-[50vh]">
          <Link to="/login" className="">
            <button
              onClick={handleCheckout}
              className="w-full p-1 hover:bg-light  hover:text-dark bg-dark text-white duration-500 border-2 border-dark rounded-md font-Nunito md:text-xl text-xs"
            >
              Login
            </button>
          </Link>
        </div>
      );
    }

    if (!cart || cart.length === 0) {
      return (
        <div className="">
          <div className="grid place-items-center place-content-center h-[50vh] gap-5">
            <p>There are no Products in your cart yet</p>
            <Link to="/allproducts">
              <button
                onClick={handleCheckout}
                className="w-full p-1 hover:bg-light  hover:text-dark bg-dark text-white duration-500 border-2 border-dark rounded-md font-Nunito md:text-xl text-xs"
              >
                Checkout
              </button>
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div className="grid sm:space-y-6 space-y-3    px-4 scroll-n ">
        {cart &&
          cart.map((cartItem) => (
            <div key={cartItem._id} className="space-y-4 bg-light rounded-md">
              <div className="flex  md:gap-4 gap-2 md:p-4 p-2">
                <img
                  src={cartItem.productId?.thumbnailImageUrl}
                  alt={cartItem.productId?.name}
                  width="100px"
                />
                <div className=" flex justify-between w-full">
                  <div className=" items-center">
                    <p>{cartItem.productId?.name}</p>
                    <div className="flex gap-1">
                      <p>{cartItem?.quantity}</p>
                      <p>x</p>
                      <p>
                        {cartItem.productId?.sale_price
                          ? cartItem.productId.sale_price
                          : cartItem.productId?.price}
                      </p>
                    </div>
                  </div>
                  <div className="flex self-start">
                    <button
                      onClick={() =>
                        handleRemoveFromCart(cartItem.productId?._id)
                      }
                      className=""
                    >
                      <MdDeleteForever className=" rounded-full w-7 p-1 h-7 border-2 text-dark" />

                      {/* <div className=" h-[2px] w-full group-hover:w-0 transition-all duration-500"></div> */}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  };

  const sliderClasses = `
    fixed top-0 right-0 h-full md:w-[40%] sm:w-[50%] w-[90%] bg-white shadow-lg 
    transform transition-transform ease-in duration-300
    ${
      isOpen
        ? "translate-x-0 z-[999] overflow-y-scroll openSlider no-scrollbar"
        : "translate-x-full z-[999]"
    }
  `;

  return (
    <div className={sliderClasses}>
      <div className="flex flex-col h-full">
        <div className="flex justify-between font-Nunito  text-active-green font-bold items-center mb-4 px-8 py-6 sticky top-0   bg-white text-xl">
          <p className="text-lg !text-black w-1/2 flex items-center gap-2">
            <span>Cart</span>
          </p>
          {userToken ? (
            <div className="flex text-dark gap-1 items-center">
              <p className="font-Nunito">({cart ? cart?.length : "0"})</p>
              <h4 className="md:mr-10 mr-5 ">Products</h4>
            </div>
          ) : (
            <div></div>
          )}
          <button onClick={() => setIsOpen(false)} className="!text-black/60">
            x
          </button>
        </div>

        <div className="flex-1 space-y-4 bg-yalla py-2">
          {renderCartItems()}
        </div>

        <div className="sticky bottom-0 w-full">{cartCheckout()}</div>
      </div>
    </div>
  );
};

CartSlider.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default CartSlider;
