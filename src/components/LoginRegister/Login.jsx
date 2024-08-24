import { useState } from "react";
import loginImage from "../../static/assets/Login&Register/login-details.avif";
import { userLoginFunction } from "../../Services/Apis";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RiArrowDropRightLine } from "react-icons/ri";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
const Login = () => {
  const cart = useSelector((state) => state.cart);
  const getLength = cart?.items?.length;
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [serverError, setServerError] = useState("");

  const handleLogin = async (data) => {
    setLoading(true);
    try {
      const response = await userLoginFunction(data);

      if (response.status === 200 && response.data.data.role === "User") {
        const token = response.data.token.replace("Bearer ", "");
        sessionStorage.setItem("userToken", token);
        sessionStorage.setItem("userMail", response.data.data.email);
        sessionStorage.setItem("userId", response.data.data._id);
        setLoading(false);
        if (getLength >= 1) {
          navigate("/checkout/");
        } else {
          navigate("/");
        }
      } else {
        setLoading(false);
        setServerError("Invalid Credentials");
      }
    } catch (error) {
      setLoading(false);
      console.error("Catch Block Error:", error);
      setServerError(
        "There was an error processing your request. Please try again."
      );
    }
  };

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  return (
    <div className=" mx-auto px-10 sm:px-20 lg:px-40 xl:px-60 2xl:px-[400px] font-Nunito ">
      <div className="md:flex md:justify-center md:items-center">
        <div className="w-full mt-3">
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

          <form
            onSubmit={handleSubmit(handleLogin)}
            className="grid grid-cols-1 gap-4"
          >
            <div className="grid">
              <label
                htmlFor=""
                className="py-2 w-fit text-dark  lg:text-[14px] text-[12px] font-medium"
              >
                Your email{" "}
              </label>
              <input
                type="text"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Enter a valid email address",
                  },
                })}
                id="email"
                className="focus:outline-none border rounded-md py-3"
              />
              {errors.email && (
                <small className="text-red">{errors.email.message}</small>
              )}
            </div>
            <div className="grid">
              <label
                htmlFor=""
                className="py-2 w-fit  tracking-wide lg:text-[14px] text-[12px] text-dark font-medium"
              >
                Password
              </label>

              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                id="password"
                className="focus:outline-none border  rounded-md py-3 relative"
              />

              {errors.password && (
                <small className="text-red">{errors.password.message}</small>
              )}
            </div>

            {serverError && (
              <div className="text-red">
                <small>{serverError}</small>
              </div>
            )}

            <div className="flex items-center justify-between mb-4">
              <Link
                to="/forgot-password"
                className="text-dark/80 font-medium lg:text-[14px] text-[12px] "
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-dark hover:border-2 hover:border-dark  text-light font-semibold rounded hover:bg-light hover:text-dark transition duration-500"
            >
              {loading ? "Logging..." : "Login "}
            </button>

            <div class="fter:h-px  flex items-center before:h-px before:flex-1  before:bg-gray-300 before:content-[''] after:h-px after:flex-1 after:bg-gray-300  after:content-['']">
              <button
                type="button"
                class="flex items-center rounded-full border border-gray-300 bg-secondary-50 p-3 text-center font-medium text-gray-900"
              >
                OR
              </button>
            </div>
            <div class="fter:h-px my-4 flex items-center before:h-px before:flex-1  before:bg-gray-300 before:content-[''] after:h-px after:flex-1 after:bg-gray-300  after:content-['']">
              <Link
                to="/register"
                className="w-full py-3 hover:bg-dark border-2  text-center border-dark hover:text-light font-semibold rounded bg-light hover:text-dark transition duration-500"
              >
                Create New Account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
