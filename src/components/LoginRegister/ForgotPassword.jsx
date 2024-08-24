import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgotPasswordFunction } from "../../Services/Apis";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loginImage from "../../static/assets/Login&Register/forgot-password.avif";
import { useForm } from "react-hook-form";
import { RiArrowDropRightLine } from "react-icons/ri";

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const notifySuccess = () => {
    toast.success("Mail Sent successfully!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  const handleForgotPassword = async (data) => {
    setLoading(true);

    const response = await forgotPasswordFunction(data);
    if (response.status === 200) {
      setLoading(false);
      notifySuccess();
      navigate("/login");
    }
  };

  return (
    <div className="mx-auto px-10 sm:px-20 lg:px-40 xl:px-60 2xl:px-[300px] py-10">
      <div className="md:flex md:justify-center md:items-center">
        <div className="md:w-full">
          <div className="grid place-items-center md:mb-8 mb-4 space-y-5">
            <h1 className=" text-dark">Login</h1>

            <div className="flex justify-center items-center">
              <Link to="/">
                <span className="text-dark/60 font-Nunito ">Home</span>
              </Link>
              <span className="">
                <RiArrowDropRightLine className="text-xl text-dark/60 font-Nunito" />
              </span>
              <h6 className="text-dark/60 font-Nunito text-sm">Account</h6>
            </div>
          </div>

          <h2 className="text-center text-dark md:mb-8 mb-4">
            Forgot Password
          </h2>
          <form
            className="grid gap-3 "
            onSubmit={handleSubmit(handleForgotPassword)}
          >
            <label
              htmlFor=""
              className="py-2 w-fit text-dark  lg:text-[14px] text-[12px] font-medium"
            >
              Your email
            </label>
            <input
              className="focus:outline-none py-3 border rounded-md"
              type="text"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Enter a valid email address",
                },
              })}
              name="email"
              id="email"
            />
            {errors.email && (
              <small className="text-red">{errors.email.message}</small>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-dark text-light font-semibold rounded hover:bg-light hove hover:text-dark hover:border-2 hover:border-dark transition duration-300"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
            <button
              type="submit"
              className="w-full py-3 bg-dark text-light font-semibold rounded hover:bg-light hover:border-2 hover:border-dark hover:text-dark transition duration-300"
            >
              Cancel
            </button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}
