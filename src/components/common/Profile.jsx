import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";

export default function Profile() {
  const token = sessionStorage.getItem("userToken");

  const handleLogin = () => {
    if (token) {
      sessionStorage.removeItem("userToken");
      sessionStorage.removeItem("userMail");
      sessionStorage.removeItem("userName");
      sessionStorage.removeItem("userId");
    }
  };

  return (
    <Menu as="div" className="relative text-left">
      <div>
        <Menu.Button>
          <div className="grid items-center">
            <FaRegUser className="text-[24px] pt-1" />
          </div>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 md:mt-2 mt-5 md:w-56 w-40  origin-top-right  divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            {token ? (
              <Menu.Item>
                {({ active }) => (
                  <Link to="/profile-details">
                    <button
                      className={`text-dark font-Nunito px-2 py-2 sm:text-sm text-xs ${
                        active
                          ? "text-primary font-Nunito"
                          : "hover:text-primary font-Nunito"
                      }`}
                    >
                      My Account
                    </button>
                  </Link>
                )}
              </Menu.Item>
            ) : (
              <div></div>
            )}
          </div>

          <div className="px-1 py-1">
            <Menu.Item>
              <Link to="/login/">
                <button
                  onClick={handleLogin}
                  className="text-dark px-2 font-Nunito py-2 sm:text-sm text-xs "
                >
                  {token ? "Sign Out" : "Sign In"}
                </button>
              </Link>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
