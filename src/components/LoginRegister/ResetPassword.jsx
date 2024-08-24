import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPasswordFunction } from "../../Services/Apis";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loginImage from "../../static/assets/Login&Register/forgot-password.avif";

export default function ResetPassword() {
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const { userId } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors },
  } = useForm();

  const notifySuccess = () => {
    toast.success("Password Reset successfully!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  const notifyError = (errorMessage) => {
    toast.error(errorMessage, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const expirationTime = params.get("expires");

    if (new Date() > new Date(expirationTime)) {
      notifyError("Reset link has expired. Please request a new one.");
      navigate("/forgot-password");
    }
  }, [navigate]);

  const handleResetPassword = async (data) => {
    setLoading(true);
    try {
      const response = await resetPasswordFunction(userId, data);
      if (response.status === 200) {
        notifySuccess();
        navigate("/login");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      notifyError(
        "There was an error processing your request. Please try again."
      );
      setServerError(
        "There was an error processing your request. Please try again."
      );
    }
  };

  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  return (
    <div className="mx-auto px-10 sm:px-20 lg:px-40 xl:px-60 2xl:px-[400px]">
      <div className="md:flex md:justify-center md:items-center">
        <div className="w-full md:mb-8 mb-4">
          <h2>Reset Password</h2>
          <form
            className="grid gap-3 pb-4"
            onSubmit={handleSubmit(handleResetPassword)}
          >
            <div className="grid">
              <label
                htmlFor=""
                className="py-2 w-fit text-dark  lg:text-[14px] text-[12px] font-medium"
              >
                New Password
              </label>
              <input
                className="focus:outline-none py-3"
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
                onKeyUp={() => {
                  trigger("password");
                }}
                placeholder="Enter Your New Password"
              />
              {errors.password && (
                <small className="text-red text-start">
                  {errors.password.message}
                </small>
              )}
            </div>

            <div className="grid">
              <label
                htmlFor=""
                className="py-2 w-fit text-dark  lg:text-[14px] text-[12px] font-medium"
              >
                Confirm New Password
              </label>
              <input
                className="focus:outline-none py-3"
                type="password"
                autoComplete=""
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  pattern: {
                    value: passwordPattern,
                    message:
                      "containing at least one uppercase letter, one lowercase letter, one numeric digit, and one special character",
                  },
                  validate: (value) =>
                    value === getValues("password") || "Passwords do not match",
                })}
                onKeyUp={() => {
                  trigger("confirmPassword");
                }}
                placeholder="Confirm Your New Password"
              />
              {errors.confirmPassword && (
                <small className="text-red text-start">
                  {errors.confirmPassword.message}
                </small>
              )}
            </div>

            {serverError && (
              <div className="text-red text-center">
                <p>{serverError}</p>
              </div>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-dark text-light font-semibold rounded hover:bg-light hover:text-dark transition duration-300"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}
