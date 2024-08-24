import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdRocketLaunch } from "react-icons/md";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3005/contact-form", data, setLoading(true))
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          alert("Form Submitted Successfully");
          reset();
        }
      });
  };

  return (
    <div className="2xl:px-[160px] sm:px-[50px] font-Nunito px-[10px] gap-8 space-y-6 my-[5%]">
      {/* contact from */}

      <div className="text-start space-y-4 font-Nunito  px-[5%]  bg-gray-100 rounded-md p-[5%] w-full border">
        <h3 className="flex items-center gap-2">
          Get In Touch <MdRocketLaunch />
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 w-[100%]">
          <div className=" w-full ">
            <p>
              Your Name <small className="text-red text-sm">*</small>
            </p>

            <input
              id="Name"
              name="Name"
              type="text"
              aria-describedby="Name_error"
              className={`block w-full md:p-3 p-1  border-secondary border rounded-md focus:border-dark focus:outline-none ${
                errors.name ? "border-red" : ""
              }`}
              {...register("name", {
                required: "Name is required",
                pattern: {
                  value: /^[a-zA-Z ]+$/,
                  message: "Please enter valid name",
                },
              })}
              onKeyUp={() => {
                trigger("name");
              }}
            />
            {errors.name && (
              <small className="text-red" id="Name_error">
                {errors.name.message}
              </small>
            )}
          </div>

          <div className=" w-full">
            <p>
              Your Email<small className="text-red text-sm">*</small>
            </p>
            <input
              type="text"
              aria-describedby="Email_error"
              id="Email"
              name="Email"
              className={`block w-full md:p-3 p-1 border-secondary border rounded-md focus:border-dark focus:outline-none ${
                errors.email ? "border-red" : ""
              }`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Please enter valid email address",
                },
              })}
              onKeyUp={() => {
                trigger("email");
              }}
            />

            {errors.email && (
              <small className="text-red" id="Email_error">
                {errors.email.message}
              </small>
            )}
          </div>

          <div className=" w-full">
            <p>
              Phone Number <small className="text-red text-sm">*</small>
            </p>

            <input
              name="number"
              type="number"
              id="number"
              aria-describedby="number"
              className={`block w-full md:p-3 p-1  border-secondary border rounded-md focus:border-dark focus:outline-none ${
                errors.number ? "border-red" : ""
              }`}
              {...register("number", {
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
                trigger("number");
              }}
            />

            {errors.number && (
              <small className="text-red" id="number">
                {errors.number.message}
              </small>
            )}
          </div>

          <div className=" w-full">
            <p>Your message (optional)</p>
            <input
              type="text"
              aria-describedby="message"
              id="message"
              name="message"
              className={`block w-full md:p-3 p-1  border-secondary border rounded-md focus:border-dark focus:outline-none ${
                errors.message ? "border-red" : ""
              }`}
              {...register("message", {})}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || loading}
            aria-live="polite"
            aria-atomic="true"
            className="disabled:bg-yellow-200 disabled:cursor-not-allowed hover:bg-light  hover:text-dark w-fit font-medium mt-4  text-light border-2 border-dark bg-dark rounded-md md:p-3 p-2 px-4  duration-500"
          >
            {isSubmitting || loading ? "Please wait..." : "Submit"}
          </button>
        </form>
      </div>

      {/* map */}

      <div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3805.399056053034!2d78.391965!3d17.488454!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb918d0312d095%3A0xcd53efe929b88315!2sSudharshan%20Fancrafts!5e0!3m2!1sen!2sin!4v1709181035997!5m2!1sen!2sin"
          loading="lazy"
          className="w-full h-[500px]"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactForm;
