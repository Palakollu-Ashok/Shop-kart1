import { Link } from "react-router-dom";
import { userChangePassword } from "../../Services/Apis";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [oldPasswordError, setOldPasswordError] = useState();
  const token = sessionStorage.getItem("userToken");
  const id = sessionStorage.getItem("userId");

  const notifySuccess = () => {
    toast.success("Password Changed successfully!", {
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

  const onSubmit = async (data) => {
    setLoading(true);
    const response = await userChangePassword(id, data);

    if (response.status === 200) {
      notifySuccess();
      setLoading(false);
      reset();
    } else {
      notifyError(response?.response?.data.message);
      setLoading(false);
      setOldPasswordError(response?.response?.data.message);
    }
  };

  return (
    <div className="w-full md:space-y-10 space-y-5 tracking-wide md:ml-14 ml-3 font-Nunito">
      {!token ? (
        <div>
          <div>
            <h3 className="text-dark mb-10 tracking-wide">Change Password</h3>
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
          <div>
            <h3 className="text-dark mb-10 tracking-wide">Change Password</h3>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
            <div>
              <label htmlFor="oldPassword">Old Password</label>
              <input
                type="password"
                autoComplete="off"
                {...register("oldPassword", {
                  required: "Old Password is required",
                })}
                id="oldPassword"
                className="md:p-3 p-2 rounded-md w-full border"
              />
              <div className="grid">
                {oldPasswordError && (
                  <small className="text-red text-start">
                    {oldPasswordError}
                  </small>
                )}
                {errors.oldPassword && !oldPasswordError && (
                  <small className="text-red text-start">
                    {errors.oldPassword.message}
                  </small>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                autoComplete="off"
                {...register("newPassword", {
                  required: "New Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                id="newPassword"
                className="md:p-3 p-2 rounded-md w-full border"
              />
              {errors.newPassword && (
                <small className="text-red text-start">
                  {errors.newPassword.message}
                </small>
              )}
            </div>
            <div>
              <label htmlFor="confirmNewPassword">Confirm New Password</label>
              <input
                type="password"
                autoComplete="off"
                {...register("confirmNewPassword", {
                  required: "Confirm New Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  validate: (value) =>
                    value === getValues("newPassword") ||
                    "Passwords do not match",
                })}
                id="confirmNewPassword"
                className="md:p-3 p-2 rounded-md w-full border"
              />
              {errors.confirmNewPassword && (
                <small className="text-red text-start">
                  {errors.confirmNewPassword.message}
                </small>
              )}
            </div>

            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="p-3 md:text-md text-xs w-fit rounded-md bg-dark duration-500 font-Nunito border-2 border-dark    hover:bg-light text-light hover:text-dark"
              >
                {loading ? "Saving New Password..." : "Save New Password"}
              </button>
            </div>
          </form>
          <ToastContainer />
        </div>
      )}
    </div>
  );
};

export default ChangePassword;
