import { commonRequest } from "./Apicall";
import { BASE_URL } from "./Helper";

// Register User Function

export const userRegisterFunction = async (data) => {
  return await commonRequest("POST", `${BASE_URL}/user/register`, data);
};

// Login User Function

export const userLoginFunction = async (data) => {
  return await commonRequest("POST", `${BASE_URL}/user/login`, data);
};

// User Change Password

export const userChangePassword = async (id, data, header) => {
  return await commonRequest(
    "POST",
    `${BASE_URL}/user/password-change/${id}`,
    data,
    header
  );
};

// Forgot Password

export const forgotPasswordFunction = async (data) => {
  return await commonRequest("POST", `${BASE_URL}/user/forgot-password`, data);
};

// Reset Password

export const resetPasswordFunction = async (userId, data) => {
  return await commonRequest(
    "POST",
    `${BASE_URL}/user/reset/password/${userId}`,
    data
  );
};

// Get Products Function

export const getProductsFunction = async () => {
  return await commonRequest("GET", `${BASE_URL}/product/get`, "");
};

// Get Single Product Function

export const singleProductGetFunction = async (id) => {
  return await commonRequest("GET", `${BASE_URL}/product/get/${id}`, "");
};

//Get Category Function

export const getCategory = async (data, header) => {
  return await commonRequest("GET", `${BASE_URL}/category/get`, data, header);
};

// Get Banner Images

export const getBannerImagesFunction = async () => {
  return await commonRequest("GET", `${BASE_URL}/banner/get`);
};

// Get Order Details Based on User

export const getOrderDetailsFunction = async (userId) => {
  return await commonRequest("GET", `${BASE_URL}/order/get/${userId}`, "");
};

// Create Address Per User

export const createAddressFunction = async (data, header) => {
  return await commonRequest("POST", `${BASE_URL}/address/add`, data, header);
};

// Get Address Per Logged User

export const getAddressFunction = async (userId) => {
  return await commonRequest("GET", `${BASE_URL}/address/get/${userId}`, "");
};

// Update Address Details

export const editAddressFunction = async (data, header, addressId) => {
  return await commonRequest(
    "PUT",
    `${BASE_URL}/address/update/${addressId}`,
    data,
    header
  );
};

// Delete Address Details

export const deleteDetailsFunction = async (header, addressId) => {
  return await commonRequest(
    "DELETE",
    `${BASE_URL}/address/delete/${addressId}`,
    header
  );
};

// Add Cart Items

export const addCartItemsFunction = async (data, headers) => {
  return await commonRequest("POST", `${BASE_URL}/cart/add`, data, headers);
};

// Get CartItems Based on User

export const getCartItemsFunction = async (userId) => {
  return await commonRequest("GET", `${BASE_URL}/cart/get/${userId}`, "");
};

// Update Cart Items

export const updateCartItemsFunction = async (data, userId, productId) => {
  return await commonRequest(
    "PUT",
    `${BASE_URL}/cart/update/${userId}/${productId}`,
    data
  );
};

// Delete Cart Items

export const deleteCartItemsFunction = async (userId, productId) => {
  return await commonRequest(
    "DELETE",
    `${BASE_URL}/cart/delete/${userId}/${productId}`
  );
};

// Clear Cart items

export const clearCartFunction = async (userId) => {
  return await commonRequest("DELETE", `${BASE_URL}/cart/clear/${userId}`);
};

// Add Wishlist Items

export const addWishlistFunction = async (data) => {
  return await commonRequest("POST", `${BASE_URL}/wishlist/add`, data);
};

// Get Wishlist By User

export const getWishlistFunction = async (userId) => {
  return await commonRequest("GET", `${BASE_URL}/wishlist/get/${userId}`);
};

// Remove Items from Wishlist

export const removeWishlistFunction = async (userId, productId) => {
  return await commonRequest(
    "DELETE",
    `${BASE_URL}/wishlist/delete/${userId}/${productId}`
  );
};

// Payment Gateway Function

export const makePaymentFunction = async (data, header) => {
  return await commonRequest("POST", `${BASE_URL}/order/add`, data, header);
};

// Payment Verification Function

export const verifyPaymentFunction = async (data, header) => {
  return await commonRequest("POST", `${BASE_URL}/order/verify`, data, header);
};

// Get Single Ordered Items

export const getSingleOrderDetailsFunction = async (orderId) => {
  return await commonRequest("GET", `${BASE_URL}/order/details/${orderId}`, "");
};

// comments

export const getCommentsByBlogName = async (blogName) => {
  return await commonRequest("GET", `${BASE_URL}/blog/comment/get/${blogName}`);
};

// Blogs

export const getBlogsFunction = async () => {
  return await commonRequest("GET", `${BASE_URL}/blog/get`);
};

// Add Comments to Blog

export const addCommentToBlogFunction = async (data) => {
  return await commonRequest("POST", `${BASE_URL}/blog/comment/add`, data);
};

// Add Reply to Comment

export const addReplyToComment = async (data, id) => {
  return await commonRequest(
    "POST",
    `${BASE_URL}/blog/comment/reply/add/${id}`,
    data
  );
};
