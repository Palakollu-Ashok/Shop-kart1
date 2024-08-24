import loginImage from "../../static/assets/Login&Register/login-page.jpg";
import { userRegisterFunction } from "../../Services/Apis";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiArrowDropRightLine } from "react-icons/ri";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const notifySuccess = () => {
    toast.success("You have successfully registered. Please log in", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await userRegisterFunction(data);

      if (response.status === 200) {
        notifySuccess();
        setLoading(false);
        navigate("/login/");
      } else if (response.response.status === 400) {
        setLoading(false);
        setErrorMessage(response.response.data);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  return (
    <div className="mx-auto  sm:px-20 lg:px-40 xl:px-60 2xl:px-[400px] ">
      <div className="md:flex md:justify-center md:items-center">
        <div className="w-full p-4 ">
          <div className="grid place-items-center md:mb-8 mb-4 space-y-5">
            <h1 className="text-5xl text-dark">Register</h1>
            <div className="flex justify-center items-center">
              <Link to="/">
                <span className="text-dark/60 font-Nunito ">Home</span>
              </Link>
              <span className="">
                <RiArrowDropRightLine className="text-xl text-dark/60 font-Nunito" />
              </span>
              <h6 className="text-dark/60 font-Nunito text-sm">
                Create Account
              </h6>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-4"
          >
            <div className="grid">
              <label
                htmlFor=""
                className="py-2 w-fit text-dark  lg:text-[14px] text-[12px] font-medium"
              >
                Full name
              </label>
              <input
                type="text"
                {...register("name", {
                  required: "Full Name is required",
                  pattern: {
                    value: /^(?=.*[a-zA-Z])([a-zA-Z\s0-9]+)$/,
                    message: "Should contain alphabetic character.",
                  },
                })}
                className="focus:outline-none  py-3 border rounded-md"
              />
              {errors.name && (
                <small className="text-red text-start">
                  {errors.name.message}
                </small>
              )}
            </div>

            <div className="grid">
              <label
                htmlFor=""
                className="py-2 w-fit text-dark  lg:text-[14px] text-[12px] font-medium"
              >
                Email{" "}
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                className="focus:outline-none py-3 border rounded-md"
              />
              {errors.email && (
                <small className="text-red text-start">
                  {errors.email.message}
                </small>
              )}
            </div>
            <div className="grid">
              <label
                htmlFor=""
                className="py-2 w-fit text-dark  lg:text-[14px] text-[12px] font-medium"
              >
                Password
              </label>
              <input
                type="password"
                autoComplete=""
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  pattern: {
                    value: passwordPattern,
                    message:
                      "containing at least one uppercase letter, one lowercase letter, one numeric digit, and one special character",
                  },
                })}
                className="focus:outline-none  py-3 border rounded-md"
              />
              {errors.password && (
                <small className="text-red text-start">
                  {errors.password.message}
                </small>
              )}
            </div>
            <input type="text" value="User" {...register("role")} hidden />

            {errorMessage && (
              <div>
                <small className="text-red text-center">{errorMessage}</small>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 text-center  bg-dark hover:border-2 hover:border-dark text-[14px] tracking-wide text-light font-semibold rounded hover:bg-light hover:text-dark transition duration-500"
            >
              {loading ? "Registering..." : "Register"}
            </button>

            <Link
              to="/login"
              className="w-full py-3 hover:bg-dark border-2  text-center border-dark hover:text-light font-semibold rounded bg-light hover:text-dark transition duration-500"
            >
              {loading ? "Logging..." : "Login "}
            </Link>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Register;
