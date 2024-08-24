import { createAddressFunction } from "../../Services/Apis";
import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ModalPost({ showModal, setShowModal }) {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm();
  const userId = sessionStorage.getItem("userId");
  const [loading, setLoading] = useState(false);

  const notifySuccess = () => {
    toast.success("Address Added successfully!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const response = await createAddressFunction(data);
    if (response.status === 200) {
      notifySuccess();
      setLoading(false);
      setShowModal(false);
      window.location.reload();
    }
  };
  return (
    <>
      {showModal ? (
        <div className="md:flex justify-center md:pt-0 pt-[4%] items-center   overflow-y-auto fixed inset-0 top-0  outline-none focus:outline-none p-5">
          <div className="relative w-full  md:mx-auto md:max-w-6xl bg-white border border-black/20 shadow-md md:p-6 p-2 rounded-md">
            <div className="">
              <div className="md:relative p-6 md:flex-auto">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="w-full md:grid  font-Nunito md:grid-cols-3 grid-cols-1 md:gap-6 md:space-y-0 "
                >
                  <input
                    type="text"
                    value={userId}
                    {...register("userId")}
                    hidden
                  />
                  <div>
                    <label htmlFor="">First Name</label>
                    <input
                      className="p-3  rounded-md w-full border"
                      type="text"
                      {...register("name", {
                        required: "First Name is required",
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
                    <label htmlFor="">Phone Number</label>
                    <input
                      className="p-3  rounded-md w-full border"
                      type="text"
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
                    <label htmlFor="">Building Address</label>
                    <input
                      className="p-3  rounded-md w-full border"
                      type="text"
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
                    <label htmlFor="">Street Address</label>
                    <input
                      className="p-3  rounded-md w-full border"
                      type="text"
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
                    <label htmlFor="">City</label>
                    <input
                      className="p-3  rounded-md w-full border"
                      type="text"
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
                    <label htmlFor="">State</label>
                    <input
                      className="p-3  rounded-md w-full border"
                      type="text"
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
                    <label htmlFor="">Postal Code</label>
                    <input
                      className="p-3  rounded-md w-full border"
                      type="number"
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
                    <label htmlFor="">Country</label>
                    <input
                      className="p-3  rounded-md w-full border"
                      type="text"
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

                  <div className="flex md:mt-0 mt-3 justify-between items-center col-span-3">
                    <button
                      type="submit"
                      className="md:p-3 p-2 rounded-md font-Nunito md:px-4 px-2 bg-dark text-light hover:bg-light hover:text-dark border-2 border-dark duration-500 "
                    >
                      {loading ? "Submitting..." : "Submit Details"}
                    </button>
                  </div>
                </form>
                <ToastContainer />
              </div>
              <div className="flex font-Nunito font-semibold items-center md:mr-0 mr-5 mb-3 md:mb-0 justify-end space-x-6 ">
                <button
                  className="text-red "
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

ModalPost.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
};
