import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOrderDetailsFunction } from "../../Services/Apis";
import OrdersModel from "./OrdersModel";

import bag from "../../static/assets/670980.png";
import Loading from "../common/Loading";

const MyOrders = () => {
  const [userData, setUserData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const id = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("userToken");
  const [loading, setLoading] = useState(false);
  console.log(userData);

  const getOrderDetails = async () => {
    setLoading(true)
    const response = await getOrderDetailsFunction(id);
    if (response.status === 200) {
      setLoading(false)
      setUserData(response.data.Order);
    }
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  useEffect(() => {
    getOrderDetails();
  }, [id]);

  return (
    <>
      <div className="w-full md:space-y-10 space-y-5 tracking-wide md:ml-14 ml-3 font-Nunito">
        {!token ? (
          <div>
            <div>
              <h3 className="text-dark mb-10 tracking-wide">My Orders</h3>
            </div>
            <div className="grid place-content-center ">
              <Link
                to="/login"
                className=" rounded-md md:p-3 p-2  hover:bg-light hover:text-dark bg-dark text-light font-Nunito border-2 border-dark duration-500"
              >
                Login to see the details
              </Link>
            </div>
          </div>
        ) : (
          <div>
            {loading ? (
              <div className="md:h-[50vh] h-[25vh]">
                <Loading />
              </div>
            ) : (
              <div>
                <div>
                  <h3 className="text-dark mb-10 tracking-wide">Orders</h3>
                </div>
                {userData?.length > 0 ? (
                  userData.map((order) => (
                    <Link key={order._id} to={`/order/details/${order._id}`}>
                      <div className="bg-white  border overflow-hidden shadow-md mb-6">
                        <div className="flex p-4">
                          <div className="flex-shrink-0 w-1/3 flex items-center justify-center space-x-3">
                            {order.products
                              .slice(0, 4)
                              .map((product, index) => (
                                <img
                                  key={product._id}
                                  src={product?.productId?.thumbnailImageUrl}
                                  alt={product.name}
                                  className={`w-20 h-20 bg-slate-100 border p-1  rounded-md object-cover ${
                                    index > 0 ? "ml-[-10px]" : ""
                                  }`}
                                />
                              ))}

                            {order.products.length > 4 && (
                              <div className="w-12 h-12 bg-paragraph-color flex items-center justify-center text-paragraph-color">
                                +{order.products.length - 4}
                              </div>
                            )}
                          </div>
                          <div className="flex-1 p-4">
                            <div className=" flex items-center space-x-4">
                              <h2 className="text-[12px] font-semibold text-paragraph-color truncate">
                                {order.products[0]?.productId.name}
                              </h2>
                              <h2 className="text-[12px] font-semibold text-paragraph-color">
                                {order.products.length > 1 && (
                                  <>
                                    +{order.products.length - 1} more products
                                  </>
                                )}
                              </h2>{" "}
                            </div>
                            <p className="text-[12px] text-paragraph-color">
                              {new Date(order.createdAt).toLocaleString([], {
                                dateStyle: "medium",
                                timeStyle: "short",
                              })}
                            </p>
                            <p className="text-[12px] text-paragraph-color truncate">
                              {order._id}
                            </p>
                            <p className="text-[12px] font-medium text-green-600">
                              {order.paymentStatus}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="grid place-items-center place-content-center gap-3 text-paragraph-color">
                    <img src={bag} alt="empty bag" className="w-[80px]" />
                    <h3 className="font-medium text-dark">No Orders Found</h3>
                    <p>Looks like you haven't made your order yet</p>
                    <Link
                      to="/allProducts/"
                      className="md:p-3 p-2 rounded-md font-Nunito md:px-4 px-2 group bg-dark text-light hover:bg-light hover:text-dark border-2 border-dark duration-500 "
                    >
                      <p className="text-light group-hover:text-dark duration-500">
                        SHOP NOW
                      </p>
                    </Link>
                  </div>
                )}
              </div>
            )}
            {selectedProduct && (
              <div>
                <OrdersModel
                  product={selectedProduct}
                  onClose={handleCloseModal}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};
export default MyOrders;
