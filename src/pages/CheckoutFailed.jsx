import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function CheckoutFailed() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh]">
      <svg
        className="h-20 w-20 text-red mb-8"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="4" y1="4" x2="16" y2="16" />
        <line x1="16" y1="4" x2="4" y2="16" />
      </svg>
      <div className="text-red text-4xl mb-8">Failure, Network Error!</div>

      <Link to="/" className="text-primary flex items-center space-x-2">
        <FaArrowLeftLong />
        <p>Back To Home</p>
      </Link>
    </div>
  );
}
