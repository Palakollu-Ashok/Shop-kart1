import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { getSingleOrderDetailsFunction } from "../../Services/Apis";
import Loading from "../common/Loading";

export default function OrdersModel() {
  const [decodedData, setDecodedData] = useState();
  const { orderId } = useParams();
  const [loading, setLoading] = useState(false);
  const getSingleOrderDetails = async () => {
    setLoading(true);
    const response = await getSingleOrderDetailsFunction(orderId);
    if (response.status === 200) {
      setLoading(false);
      setDecodedData(response.data.Order);
    }
  };

  useEffect(() => {
    getSingleOrderDetails();
  }, [orderId]);

  return (
    <div className="">
      {loading ? (
        <div className="md:h-[90vh] h-[45vh]">
          <Loading />
        </div>
      ) : (
        <div className="my-6 font-Nunito mx-auto max-w-2xl ">
          <div className="">
            <div className="p-6 space-y-2 flex-auto">
              <div className="space-y-4 border p-2 ">
                <h3>Ordered items</h3>
                <div className="">
                  <div className="space-y-4 ">
                    {decodedData?.products.map((productItem) => (
                      <div
                        key={productItem.productId._id}
                        className="bg-white border p-2 space-y-4"
                      >
                        <div className="">
                          <div className="flex  items-start space-x-2 p-2 ">
                            <img
                              src={productItem.productId.thumbnailImageUrl}
                              alt={productItem.productId.name}
                              className="w-[100px] border rounded "
                            />

                            <div className="space-y-2">
                              <p className="font-medium">
                                {productItem.productId.name}
                              </p>
                              <p>{productItem.productId.description}</p>
                            </div>
                          </div>
                          <hr />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-2 space-y-2">
                  <h4>Delivery Address</h4>
                  <div className="space-y-1">
                    <div className="w-full flex">
                      <div className="w-1/5">
                        <p className="">Name:</p>
                      </div>
                      <p className="text-dark/55">
                        {decodedData?.addressID?.name}
                      </p>
                    </div>

                    <div className="w-full flex">
                      <div className="w-1/5">
                        <p className="">Mobile:</p>
                      </div>
                      <p className="text-dark/55">
                        {decodedData?.addressID?.phoneNumber}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className=" space-y-2">
                      <h4>Shipping Address:</h4>
                      <div className="space-y-0.5">
                        <div className="w-full flex">
                          <div className="w-1/5">
                            <p className="">Line1:</p>
                          </div>
                          <p className="text-dark/55">
                            {decodedData?.addressID?.buildingAddress}
                          </p>
                        </div>

                        <div className="w-full flex">
                          <div className="w-1/5">
                            <p className="">Line2:</p>
                          </div>
                          <p className="text-dark/55">
                            {decodedData?.addressID?.streetAddress}
                          </p>
                        </div>

                        <div className="w-full flex">
                          <div className="w-1/5">
                            <p className="">City:</p>
                          </div>
                          <p className="text-dark/55">
                            {decodedData?.addressID?.city}
                          </p>
                        </div>

                        <div className="w-full flex">
                          <div className="w-1/5">
                            <p className="">State:</p>
                          </div>
                          <p className="text-dark/55">
                            {decodedData?.addressID?.state}
                          </p>
                        </div>

                        <div className="w-full flex">
                          <div className="w-1/5">
                            <p className=""> Postal Code:</p>
                          </div>
                          <p className="text-dark/55">
                            {decodedData?.addressID?.postalCode}
                          </p>
                        </div>

                        <div className="w-full flex">
                          <div className="w-1/5">
                            <p className=""> Country:</p>
                          </div>
                          <p className="text-dark/55">
                            {decodedData?.addressID?.country}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4>Billing Address:</h4>

                      <div className="space-y-0.5">
                        <div className="w-full flex">
                          <div className="w-1/5">
                            <p className=""> Line1:</p>
                          </div>
                          <p className="text-dark/55">
                            {decodedData?.addressID?.buildingAddress}
                          </p>
                        </div>

                        <div className="w-full flex">
                          <div className="w-1/5">
                            <p className=""> Line2: </p>
                          </div>
                          <p className="text-dark/55">
                            {decodedData?.addressID?.streetAddress}
                          </p>
                        </div>

                        <div className="w-full flex">
                          <div className="w-1/5">
                            <p className=""> Line2: </p>
                          </div>
                          <p className="text-dark/55">
                            {decodedData?.addressID?.streetAddress}
                          </p>
                        </div>

                        <div className="w-full flex">
                          <div className="w-1/5">
                            <p className="">City:</p>
                          </div>
                          <p className="text-dark/55">
                            {decodedData?.addressID?.city}
                          </p>
                        </div>

                        <div className="w-full flex">
                          <div className="w-1/5">
                            <p className="">State: </p>
                          </div>
                          <p className="text-dark/55">
                            {decodedData?.addressID?.state}
                          </p>
                        </div>

                        <div className="w-full flex">
                          <div className="w-1/5">
                            <p className=""> Postal Code:</p>
                          </div>
                          <p className="text-dark/55">
                            {decodedData?.addressID?.postalCode}
                          </p>
                        </div>

                        <div className="w-full flex">
                          <div className="w-1/5">
                            <p className="">Country:</p>
                          </div>
                          <p className="text-dark/55">
                            {decodedData?.addressID?.country}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 w-full">
                      <h4>Payment Information</h4>

                      <div className="w-full flex gap-1">
                        <div className="md:w-1/5">
                          <p className="">Payment Status:</p>
                        </div>
                        <p className="text-dark/55">
                          {decodedData?.paymentStatus}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  <h3>Total Amount: {decodedData?.totalAmount}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

OrdersModel.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    mobileNo: PropTypes.string,
    products: PropTypes.array.isRequired,
    shippingAddress: PropTypes.array.isRequired,
    billingAddress: PropTypes.array.isRequired,
    paymentID: PropTypes.string,
    paymentStatus: PropTypes.string.isRequired,
    receiptUrl: PropTypes.string,
    totalAmount: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    orderStatus: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};
