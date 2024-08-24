import { RiFacebookFill } from "react-icons/ri";
import { GrInstagram } from "react-icons/gr";
import { Link } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";
import { LuPhone } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import img from "../../assets/logo.webp";
const Footer = () => {
  const token = sessionStorage.getItem("userToken");

  return (
    <div className="md:p-2  md:(px-5) md:px-3 max-w-7xl mx-auto mt-5 gap-8 text-[#848382] font-semibold    p-4 space-y-3">
      <div className="md:flex justify-between md:space-y-0 space-y-6">
        <div className="md:w-[20%] space-y-3">
          <Link to="/">
            <img
              src={img}
              alt=""
              className=" bg-primary  rounded-[5px] p-2 md:w-36 w-16"
            />
          </Link>
          <p className=" tracking-wider">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            quod voluptatibus explicabo repellat magnam modi architecto fuga
            iusto labore temporibus quasi ducimus vero amet illo nulla, ipsa
            tempore tempora nostrum?
          </p>
        </div>
        <div className="space-y-3 tracking-wider">
          <h4>QUICK LINKS</h4>
          <ul className="space-y-1 ">
            <li>
              <Link to="/allProducts/" className="">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/wishlist/" className="">
                Wishlist
              </Link>
            </li>
            <li>
              <Link to="/contact/" className="">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3 tracking-wider">
          <h4>MY ACCOUNT</h4>
          <ul className="space-y-1">
            <li>
              <Link to="/profile-details" className="">
                My Account
              </Link>
            </li>
            <li>
              <Link to="/address-book" className="">
                Address
              </Link>
            </li>
            <li>
              <Link to="/my-orders" className="">
                My Orders
              </Link>
            </li>
            <Link to="/login/" className="">
              <li>{!token ? "Login" : ""}</li>
            </Link>
          </ul>
        </div>

        <div className="space-y-3 tracking-wider">
          <h4>POLICIES</h4>
          <ul className="space-y-1">
            <li>
              <Link to="/privacy-policy" className="">
                privacy policy
              </Link>
            </li>
            <li>
              <Link to="/terms-and-conditions" className="">
                Terms and Conditions
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:w-[20%] space-y-3 tracking-wider">
          <div className="space-y-3">
            <h4> CONTACT US</h4>
            <ul className="space-y-1 ">
              <li className="md:text-[14px] text-[10px] flex items-center gap-2">
                {" "}
                <span>
                  <LuPhone className="md:text-xl" />
                </span>
                Phone: 1234567890
              </li>
              <li className="md:text-[14px] text-[8px] flex items-center gap-2">
                <span>
                  <MdOutlineEmail className="lg:text-xl" />
                </span>{" "}
                Email: email@gmail.com
              </li>
            </ul>
          </div>

          <div className="space-y-3 tracking-wider">
            <h4>Follow Us</h4>

            <div className="flex gap-3 text-2xl">
              <a className="" href="#" target="_blank" rel="noreferrer">
                <RiFacebookFill className="text-2xl" />
              </a>

              <a className="" href="#" target="_blank" rel="noreferrer">
                <FaXTwitter className="text-2xl" />
              </a>
              <a className="" href="#" target="_blank" rel="noreferrer">
                <GrInstagram className="text-2xl" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className=" text-center py-4 tracking-wider">
        <div className="w-full flex justify-end">
          <div className="w-[78%] sm:w-full">
            © {new Date().getFullYear()}
            <a href="/" className=" text-dark  text-[14px]">
              {" "}
              Company Name.
            </a>
            All Rights Reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
