import { useEffect, useState } from "react";
import { editAddressFunction } from "../../Services/Apis";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";

export default function ModalEdit({ showModal, setShowModal, addressData }) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: addressData?.name || "",
      phoneNumber: addressData?.phoneNumber || "",
      buildingAddress: addressData?.buildingAddress || "",
      streetAddress: addressData?.streetAddress || "",
      city: addressData?.city || "",
      state: addressData?.state || "",
      postalCode: addressData?.postalCode || "",
      country: addressData?.country || "",
    },
  });

  let addressId = addressData?._id;

  const handleUpdateDetails = async (data) => {
    setLoading(true);

    const headers = {
      Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      "Content-Type": "application/json",
    };

    const notifySuccess = () => {
      toast.success("Address Updated successfully!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    };

    const response = await editAddressFunction(data, headers, addressId);
    if (response.status === 200) {
      notifySuccess();
      setShowModal(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    setValue("name", addressData?.name || "");
    setValue("phoneNumber", addressData?.phoneNumber || "");
    setValue("buildingAddress", addressData?.buildingAddress || "");
    setValue("streetAddress", addressData?.streetAddress || "");
    setValue("city", addressData?.city || "");
    setValue("state", addressData?.state || "");
    setValue("postalCode", addressData?.postalCode || "");
    setValue("country", addressData?.country || "");
  }, [addressData, setValue]);

  return (
    <>
      {showModal ? (
        <div className="md:flex justify-center  md:pt-0 pt-[5%]  items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-70  outline-none focus:outline-none p-5">
          <div className="relative w-full my-6 mx-auto max-w-6xl bg-white border border-black/20 shadow-md md:p-6 p-1 rounded-md">
            <div>
              <div className="relative p-6 flex-auto">
                <form
                  onSubmit={handleSubmit(handleUpdateDetails)}
                  className="w-full md:grid  grid-cols-3 md:gap-6 md:space-y-0 space-y-2"
                >
                  <div>
                    <label htmlFor="" className="font-Nunito">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="p-3 font-Nunito rounded-md w-full border"
                      {...register("name", {
                        required: "Name is required",
                        pattern: {
                          value: /^[A-Za-z\s]+$/i,
                          message: "Please enter alphabets only",
                        },
                      })}
                    />
                    {errors.name && (
                      <small className="text-red text-start">
                        {errors.name.message}
                      </small>
                    )}
                  </div>
                  <div>
                    <label htmlFor="" className="font-Nunito">
                      Phone Number
                    </label>
                    <input
                      type="number"
                      name="phoneNumber"
                      id="phoneNumber"
                      className="p-3 font-Nunito rounded-md w-full border"
                      {...register("phoneNumber", {
                        required: "Phone Number is required",
                        pattern: {
                          value: /^\d*(?:\.\d{1,2})?$/,
                          message: "Please enter valid Phone Number",
                        },
                        maxLength: {
                          value: 10,
                          message: "Please enter 10 Digit Phone Number",
                        },
                        minLength: {
                          value: 10,

                          message: "Please enter  10 Digit Phone Number",
                        },
                      })}
                      onKeyUp={() => {
                        trigger("phoneNumber");
                      }}
                    />
                    {errors.phoneNumber && (
                      <small className="text-red text-start">
                        {errors.phoneNumber.message}
                      </small>
                    )}
                  </div>
                  <div>
                    <label htmlFor="" className="font-Nunito">
                      Building Address
                    </label>
                    <input
                      type="text"
                      name="buildingAddress"
                      id="buildingAddress"
                      className="p-3 font-Nunito rounded-md w-full border"
                      {...register("buildingAddress", {
                        required: "Building Address Name is required",
                      })}
                    />
                    {errors.buildingAddress && (
                      <small className="text-red text-start">
                        {errors.buildingAddress.message}
                      </small>
                    )}
                  </div>
                  <div>
                    <label htmlFor="" className="font-Nunito">
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="streetAddress"
                      id="streetAddress"
                      className="p-3 font-Nunito rounded-md w-full border"
                      {...register("streetAddress", {
                        required: "Street Address Name is required",
                      })}
                    />
                    {errors.streetAddress && (
                      <small className="text-red text-start">
                        {errors.streetAddress.message}
                      </small>
                    )}
                  </div>
                  <div>
                    <label htmlFor="" className="font-Nunito">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      className="p-3 font-Nunito rounded-md w-full border"
                      {...register("city", {
                        required: "City Name is required",
                        pattern: {
                          value: /^[A-Za-z\s]+$/i,
                          message: "Please enter alphabets only",
                        },
                      })}
                    />
                    {errors.city && (
                      <small className="text-red text-start">
                        {errors.city.message}
                      </small>
                    )}
                  </div>
                  <div>
                    <label htmlFor="" className="font-Nunito">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      id="state"
                      className="p-3 font-Nunito rounded-md w-full border  "
                      {...register("state", {
                        required: "State Name is required",
                        pattern: {
                          value: /^[A-Za-z\s]+$/i,
                          message: "Please enter alphabets only",
                        },
                      })}
                    />
                    {errors.state && (
                      <small className="text-red text-start">
                        {errors.state.message}
                      </small>
                    )}
                  </div>
                  <div>
                    <label htmlFor="" className="font-Nunito">
                      Postal Code
                    </label>
                    <input
                      type="number"
                      name="postalCode"
                      id="postalCode"
                      className="p-3 font-Nunito rounded-md w-full border"
                      {...register("postalCode", {
                        required: "Postal Code is required",
                      })}
                    />
                    {errors.postalCode && (
                      <small className="text-red text-start">
                        {errors.postalCode.message}
                      </small>
                    )}
                  </div>
                  <div className="">
                    <label htmlFor="" className="font-Nunito">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      id="country"
                      className="p-3 font-Nunito rounded-md w-full border"
                      {...register("country", {
                        required: "Country Name is required",
                        pattern: {
                          value: /^[A-Za-z\s]+$/i,
                          message: "Please enter alphabets only",
                        },
                      })}
                    />
                    {errors.country && (
                      <small className="text-red text-start">
                        {errors.country.message}
                      </small>
                    )}
                  </div>

                  <div className="flex justify-between items-center col-span-3">
                    <button
                      type="submit"
                      className="md:p-3 p-2 rounded-md font-Nunito md:px-4 px-2 bg-dark text-light hover:bg-light hover:text-dark border-2 border-dark duration-500 "
                    >
                      {loading ? "Updating..." : "Update Details"}
                    </button>
                  </div>
                </form>
                <ToastContainer />
              </div>
              <div className="flex  items-center justify-end space-x-6 md:mb-0 md:mr-0 mr-5 mb-5 ">
                <button
                  className="text-red font-semibold font-Nunito "
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

ModalEdit.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  addressData: PropTypes.shape({
    _id: PropTypes.string,
    user: PropTypes.string,
    name: PropTypes.string,
    phoneNumber: PropTypes.string,
    buildingAddress: PropTypes.string,
    streetAddress: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    postalCode: PropTypes.string,
    country: PropTypes.string,
  }),
};
