import { useCallback, useEffect, useRef, useState } from "react";
import ThumbnailSlider from "./ThumbnailSlider";

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addWishlistFunction,
  getWishlistFunction,
  removeWishlistFunction,
  singleProductGetFunction,
} from "../../Services/Apis";
import {
  addToCart,
  deleteCartItem,
  getCartDetails,
  updateCartItem,
} from "../../Reducers/cartThunk";
import LoadingSkeleton from "../common/LoadingSkeleton";
import Modal from "../common/Modal";
import ProductDetails from "./ProductDetails";

const ViewProduct = () => {
  const [counter, setCounter] = useState(0);
  const [data, setData] = useState();
  const [wishlistData, setWishlistData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const sliderRef = useRef();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("userToken");
  const userId = sessionStorage.getItem("userId");
  const cartDetails = useSelector((state) => state.cart.items.Cart);
  const isProductInCart = cartDetails?.products?.some(
    (item) => item.productId?._id === id
  );

  const [img, setImg] = useState();

  const hoverHandler = (image) => {
    setImg(image);
  };

  const closeModal = useCallback(() => {
    setModalIsOpen(false);
  }, []);

  const fetchData = useCallback(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const fetchWishlistData = useCallback(async () => {
    const response = await getWishlistFunction(userId);
    if (response.status === 200) {
      setWishlistData(response.data?.Wishlist.products);
    }
  }, [userId]);

  const getSingleDetails = useCallback(async () => {
    const response = await singleProductGetFunction(id);
    if (response.status === 200) {
      setData(response.data?.Product);
      setImg(response?.data?.Product?.gallery[0]?.imageUrl);
    }
  }, [id]);

  useEffect(() => {
    const productInCart = cartDetails?.products?.find(
      (item) => item.productId?._id === id
    );
    if (productInCart) {
      setCounter(productInCart.quantity || 0);
    }
    getSingleDetails();
  }, [cartDetails, id, getSingleDetails]);

  useEffect(() => {
    if (userId) {
      dispatch(getCartDetails(userId));
      fetchWishlistData();
    }
  }, [userId, dispatch, fetchWishlistData]);

  const handleRemoveItem = useCallback(
    async (productId) => {
      const response = await removeWishlistFunction(userId, productId);
      if (response.status === 200) {
        setModalTitle("Wishlist");
        setModalMessage("Product Removed From Wishlist");
        setModalIsOpen(true);
        await fetchWishlistData();
      }
    },
    [userId, fetchWishlistData]
  );

  const handleIncrease = useCallback(async () => {
    setLoading(true);
    if (isProductInCart) {
      if (cartDetails) {
        const cartInfo = cartDetails?.products?.find(
          (item) => item.productId._id === id
        );
        if (cartInfo) {
          const updatedQuantity = cartInfo.quantity + 1;
          const availableStock = cartInfo?.productId?.stock || 0;

          if (updatedQuantity <= availableStock) {
            const productId = cartInfo.productId._id;
            const userId = sessionStorage.getItem("userId");

            await dispatch(
              updateCartItem({
                id: userId,
                productId: productId,
                quantity: updatedQuantity,
              })
            );
            setLoading(false);
            await dispatch(getCartDetails(userId));
          } else {
            setModalTitle("Stock Availability");
            availableStock > 1
              ? setModalMessage(
                  `Sorry, only ${availableStock} items are available.`
                )
              : setModalMessage(
                  `Sorry, only ${availableStock} item is available.`
                );

            setModalIsOpen(true);
            setLoading(false);
          }
        }
      }
    } else {
      setCounter((prevCounter) => prevCounter + 1);
      setLoading(false);
    }
  }, [cartDetails, dispatch, id, isProductInCart]);

  const handleDecrease = useCallback(async () => {
    setLoading(true);

    if (isProductInCart) {
      if (cartDetails) {
        const cartInfo = cartDetails?.products?.find(
          (item) => item.productId._id === id
        );
        if (cartInfo && cartInfo.quantity === 1) {
          const productId = cartInfo.productId._id;

          await dispatch(deleteCartItem({ id: userId, productId }));
          await dispatch(getCartDetails(userId));
        } else if (cartInfo && cartInfo.quantity > 1) {
          const updatedQuantity = cartInfo.quantity - 1;
          const productId = cartInfo.productId._id;

          await dispatch(
            updateCartItem({
              id: userId,
              productId,
              quantity: updatedQuantity,
            })
          );
          setLoading(false);
          await dispatch(getCartDetails(userId));
        }
      }
    } else {
      if (counter > 0) {
        setCounter((prevCounter) => prevCounter - 1);
      }
    }
  }, [cartDetails, dispatch, id, isProductInCart, userId, counter]);

  const goToSlide = useCallback((index) => {
    sliderRef.current.slickGoTo(index);
  }, []);

  const handleAddToCart = useCallback(async () => {
    setLoading(true);

    if (!token) {
      navigate("/login");
      return;
    }

    if (data?.stock === 0 || data?.stock === null) {
      setModalTitle("Stock Availability");
      setModalMessage("Sorry, this product is out of stock.");
      setModalIsOpen(true);
      setLoading(false);
      return;
    }

    const availableStock = data?.stock || 0;
    const selectedQuantity = counter === 0 ? 1 : counter;

    if (selectedQuantity > availableStock) {
      setModalTitle("Stock Availability");
      availableStock > 1
        ? setModalMessage(`Sorry, only ${availableStock} items are available.`)
        : setModalMessage(`Sorry, only ${availableStock} item is available.`);
      setModalIsOpen(true);
      setLoading(false);
      return;
    }

    const cartData = {
      userId: sessionStorage.getItem("userId") || "",
      product: {
        productId: data?._id,
        quantity: selectedQuantity,
      },
    };

    await dispatch(addToCart(cartData));
    await dispatch(getCartDetails(userId));
    setLoading(false);
  }, [counter, data, dispatch, navigate, token, userId]);

  const handleAddWishlist = useCallback(async () => {
    if (token) {
      const wishlistData = {
        userId: sessionStorage.getItem("userId") || "",
        product: {
          productId: data?._id,
        },
      };
      const response = await addWishlistFunction(wishlistData);
      if (response.status === 200) {
        setModalTitle("Wishlist");
        setModalMessage("Product Added to Wishlist");
        setModalIsOpen(true);
        await fetchWishlistData();
      }
    } else {
      navigate("/login");
    }
  }, [data, fetchWishlistData, token, navigate]);

  return (
    <div className="md:p-2 p-1 md:(px-5)  max-w-7xl mx-auto sm:px-[50px] px-[10px] md:py-10 ">
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <div className="md:flex md:gap-10  ">
          <div className="md:w-1/2 relative w-full rounded-lg">
            {Array.isArray(data?.gallery) && data?.gallery?.length > 0 ? (
              <ThumbnailSlider data={data?.gallery} goToSlide={goToSlide} />
            ) : (
              <p>No valid gallery data available.</p>
            )}
          </div>

          <ProductDetails
            id={id}
            data={data}
            isProductInCart={isProductInCart}
            counter={counter}
            loading={loading}
            handleDecrease={handleDecrease}
            handleIncrease={handleIncrease}
            handleAddToCart={handleAddToCart}
            handleAddWishlist={handleAddWishlist}
            wishlistData={wishlistData}
            handleRemoveItem={handleRemoveItem}
          />
        </div>
      )}

      {/* <AttributeTable data={data} /> */}

      <Modal
        isOpen={modalIsOpen}
        onClose={closeModal}
        title={modalTitle}
        message={modalMessage}
      />
    </div>
  );
};

export default ViewProduct;
