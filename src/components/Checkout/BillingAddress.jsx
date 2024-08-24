import { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartDetails } from "../../Reducers/cartThunk";
import { useNavigate } from "react-router";
import ModalPost from "../MyAccount/ModalPost";
import ModalEdit from "../MyAccount/ModalEdit";
import Modal from "../common/Modal";
import ProductsList from "./ProductsList";
import ShippingAddress from "./ShippingAddress";
import PriceDetails from "./PriceDetails";
import {
  deleteDetailsFunction,
  getAddressFunction,
  makePaymentFunction,
  verifyPaymentFunction,
} from "../../Services/Apis";
import EmptyCart from "./EmptyCart";

const BillingAddress = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [addressCount, setAddressCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [addressMessage, setAddressMessage] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const userId = sessionStorage.getItem("userId");
  const cartDetails = useSelector((state) => state.cart.items);
  const cart = cartDetails?.Cart?.products;
  const dispatch = useDispatch();
  const cartLength = cart?.length;

  const headers = useMemo(
    () => ({
      Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      "Content-Type": "application/json",
    }),
    []
  );

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleLinkClick = useCallback((user) => {
    setSelectedUser(user);
    setModalVisible(true);
    setIsAdding(false);
  }, []);

  const handleClick = () => {
    if (addressCount < 5) {
      setModalVisible(true);
      setIsAdding(true);
    } else {
      setModalMessage(
        "You have reached the maximum address limit (5). Delete an address to add a new one."
      );
      setModalIsOpen(true);
    }
  };

  const handleAddressSelection = useCallback((addressId) => {
    setSelectedAddress(addressId);
  }, []);

  const getAddressDetails = useCallback(async () => {
    const response = await getAddressFunction(userId);
    if (response.status === 200) {
      setData(response.data.data);
      setAddressCount(response.data.data.length);
    }
  }, [userId]);

  const deleteUserDetails = useCallback(
    async (addressId) => {
      if (!addressId) {
        console.error("Invalid addressId:", addressId);
        return;
      }

      const deleteResponse = await deleteDetailsFunction(headers, addressId);
      if (deleteResponse.status === 200) {
        getAddressDetails();
      }
    },
    [headers, getAddressDetails]
  );

  const TotalAmount = useMemo(() => {
    return cart?.reduce((total, cartItem) => {
      const cartPrice = cartItem.productId.sale_price
        ? cartItem.productId.sale_price
        : cartItem.productId.price;
      const itemTotal = cartPrice * cartItem.quantity;
      return total + itemTotal;
    }, 0);
  }, [cart]);

  const checkStockAvailability = useCallback(() => {
    const outOfStockProducts = [];

    for (const cartItem of cart) {
      const availableStock = cartItem.productId.stock || 0;
      if (cartItem.quantity > availableStock) {
        outOfStockProducts.push(cartItem.name);
      }
    }

    return outOfStockProducts;
  }, [cart]);

  useEffect(() => {
    if (userId) {
      getAddressDetails();
    }
  }, [userId, getAddressDetails]);

  useEffect(() => {
    if (userId) {
      dispatch(getCartDetails(userId));
    }
  }, [dispatch, userId]);

  const handlePlaceOrder = useCallback(
    async (e) => {
      setLoading(true);

      if (!selectedAddress) {
        setLoading(false);
        setAddressMessage("Please select a shipping address.");
        return;
      }

      const outOfStockProducts = checkStockAvailability();

      if (outOfStockProducts.length > 0) {
        const errorMessage = `The following products are out of stock: ${outOfStockProducts.join(
          ", "
        )}. Please update your cart.`;
        setModalMessage(errorMessage);
        setModalIsOpen(true);
        setLoading(false);
        return;
      }

      try {
        const paymentData = {
          id: userId,
          cart: cart.map((item) => ({
            productId: item.productId._id,
            quantity: item.quantity,
          })),
          addressID: data.find((item) => item._id === selectedAddress),
        };

        const paymentResponse = await makePaymentFunction(paymentData, headers);

        const options = {
          key: import.meta.env.VITE_RAZOR_PAY_KEY,
          amount: paymentResponse.data.paymentInfo.amount * 100,
          currency: paymentResponse.data.paymentInfo.currency,
          order_id: paymentResponse.data.paymentInfo.id,
          handler: async function (response) {
            const body = {
              ...response,
            };

            const verifyPayResponse = await verifyPaymentFunction(
              body,
              headers
            );

            if (verifyPayResponse.status === 200) {
              setLoading(false);
              navigate("/success");
            } else {
              setLoading(false);
              navigate("/cancel");
            }
          },
          theme: {
            color: "#3399cc",
          },
        };
        const razorPay = new window.Razorpay(options);
        razorPay.open();
        e.preventDefault();
      } catch (error) {
        console.error("Error placing order:", error);
      }
    },
    [
      userId,
      headers,
      selectedAddress,
      data,
      cart,
      navigate,
      checkStockAvailability,
    ]
  );

  return (
    <div className="  md:p-2 p-1 md:(px-5) md:px-3 font-Nunito max-w-7xl mx-auto gap-8 md:flex md:space-x-8 ">
      {cart && cart.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="w-full space-y-4  ">
          <div className="md:flex grid   ">
            <div className="w-full">
              <ProductsList cartItems={cart} />
            </div>

            <div className=" md:border-l-2  px-2 w-screen      h-fit  space-y-3">
              <div className="">
                <PriceDetails
                  cartLength={cartLength}
                  getTotalMrp={TotalAmount}
                />
              </div>

              <div className="flex font-Nunito  justify-between items-center">
                <p>Shipping</p>
                <p className="text-active-green font-semibold">Free shipping</p>
              </div>

              <div className="py-4">
                <div className="space-y-6 ">
                  <p className="font-Nunito">Shipping Address</p>
                  <ShippingAddress 
                  
                    data={data}
                    selectedAddress={selectedAddress}
                    handleAddressSelection={handleAddressSelection}
                    handleClick={handleClick}
                    handleLinkClick={handleLinkClick}
                    deleteUserDetails={deleteUserDetails}
                  />
                  <small className="text-red">{addressMessage}</small>
                </div>
              </div>

              <hr />
              <div className="flex justify-between items-center">
                <h4>Total Amount</h4>
                <h3 className="text-dark">₹{TotalAmount}</h3>
              </div>

              <div>
                <button
                  onClick={handlePlaceOrder}
                  className="hover:text-dark  border-2 border-dark bg-dark text-light rounded-md duration-500 font-Nunito hover:bg-light w-full p-2"
                >
                  {loading ? "Loading..." : "Place order"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isAdding ? (
        <ModalPost
          showModal={modalVisible}
          setShowModal={setModalVisible}
          getAddressDetails={getAddressDetails}
        />
      ) : (
        <ModalEdit
          showModal={modalVisible}
          setShowModal={setModalVisible}
          addressData={selectedUser}
          getAddressDetails={getAddressDetails}
        />
      )}
      <Modal
        isOpen={modalIsOpen}
        onClose={closeModal}
        title="Stock Availability"
        message={modalMessage}
      />
    </div>
  );
};

export default BillingAddress;
