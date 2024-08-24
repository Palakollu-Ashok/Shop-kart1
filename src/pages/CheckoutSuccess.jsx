import { Link } from "react-router-dom";
import "./CheckoutSuccess.css";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function CheckoutSuccess() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh]">
      <div>
        <div className="success-animation">
          <svg
            className="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              className="checkmark__circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              className="checkmark__check"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
        </div>
      </div>
      <h2>Order placed Successfully</h2>

      <Link to="/" className="text-primary flex items-center space-x-2">
        <FaArrowLeftLong />
        <p>Shop More</p>
      </Link>
    </div>
  );
}
