import { useState, useEffect, useRef } from "react";
import { TbMenu2 } from "react-icons/tb";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { RxCross2 } from "react-icons/rx";
import { useLocation } from "react-router-dom";
import Cart from "../Cart/Cart";
import Profile from "./Profile";
import { useDispatch, useSelector } from "react-redux";
import { getCartDetails } from "../../Reducers/cartThunk";
import { FaRegHeart } from "react-icons/fa";
import logo from "../../assets/logo.webp";
const Navigation = () => {
  const [opened, setOpened] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpened(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleNav = () => {
    setOpened(!opened);
  };

  const cart = useSelector((state) => state.cart.items.Cart);

  const id = sessionStorage.getItem("userId");
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getCartDetails(id));
    }
  }, [dispatch, id]);

  return (
    <div className="sticky top-0 z-50  bg-primary w-full">
      <div className="flex justify-between items-center md:p-2 p-1 md:(px-5) md:px-3 max-w-7xl mx-auto">
        <div className="hidden md:flex md:items-center space-x-6 text-light">
          <NavLink to="/">Home</NavLink>

          <NavLink to="/allProducts">Shop</NavLink>

          <NavLink to="/contact">Contact Us</NavLink>
        </div>

        <div className="md:hidden md:ml-4">
          <button onClick={handleNav} className="text-light">
            {opened ? (
              <RxCross2 size={28} className="text-[36px]" />
            ) : (
              <TbMenu2 size={28} className="text-[36px] mt-2" />
            )}
          </button>
        </div>

        <a href="/">
          <img src={logo} alt="Template logo" className="md:h-10 h-6 w-fit " />
        </a>

        <div className="flex items-center md:space-x-6 space-x-3   text-light">
          <div>
            <NavLink to="/wishlist">
              <FaRegHeart className="text-[24px] pt-1" />
            </NavLink>
          </div>
          <div>
            <Profile className="text-[24px]"/>
          </div>
          <div className="relative">
            <Cart />
            <p className="absolute grid place-content-center  text-[24px] -top-2 left-3 bg-secondary text-primary rounded-full w-[80%] h-[80%] text-xs">
              {cart ? cart?.products?.length : "0"}
            </p>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {opened && (
          <motion.div
            ref={menuRef}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ stiffness: 200, damping: 20 }}
            className="fixed top-0 left-0 w-2/3 h-screen md:hidden block  bg-primary  text-lg  space-y-6"
          >
            <div className="flex bg-dark text-light p-2 justify-between w-full font-Nunito">
              <button>Menu</button>
              <button onClick={handleNav}>
                <RxCross2 size={28} />
              </button>
            </div>
            <div className="flex flex-col text-dark  px-2  space-y-4 font-Nunito">
              <NavLink to="/" className="text-dark">
                Home
              </NavLink>
              <NavLink to="/allProducts">Shop</NavLink>
              <NavLink to="/contact">Contact Us</NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const NavLink = ({ to, children }) => {
  const location = useLocation();
  const currentPath = typeof window === "undefined" ? "/" : location?.pathname;

  return (
    <a href={to}>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.2 }}
        className={`${
          currentPath === to && " !text-secondary rounded-md"
        }  hover:!text-secondary font-semibold text-light uppercase `}
      >
        {children}
      </motion.p>
    </a>
  );
};

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Navigation;
