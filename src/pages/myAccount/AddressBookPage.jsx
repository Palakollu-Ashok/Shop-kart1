import { Link, useLocation } from "react-router-dom";
import AddressBook from "../../components/MyAccount/AddressBook";

const AddressBookPage = () => {
  const data = [
    {
      id: 1,
      name: "My Details",
      link: "/profile-details",
    },
    {
      id: 2,
      name: "Change Password",
      link: "/change-password",
    },
    {
      id: 3,
      name: "Address Book",
      link: "/address-book",
    },
    {
      id: 4,
      name: "My Orders",
      link: "/my-orders",
    },
  ];

  const location = useLocation();
  const currentPath = typeof window === "undefined" ? "/" : location?.pathname;
  return (
    <div className="mt-6 2xl:px-[160px] sm:px-[50px] px-[10px] gap-8 md:mb-10 mb-4 ">
      <div className="md:mb-4 mb-1">
        <h2 className="font-Nunito">Account</h2>
        <hr className="bg-primary " />
      </div>

      <div className="md:py-16 py-6">
        <div className="flex md:space-x-[4%]  divide-x-[1px]">
          <div className="grid w-[200px] h-8 p-1 space-y-4 text-dark ">
            {data.map((category, idx) => (
              <Link
                to={category.link}
                key={idx}
                className={`${
                  currentPath === category.link && " !text-dark "
                }  font-semibold text-dark/55 font-Nunito uppercase w-fit pt-2 `}
              >
                {category.name}
              </Link>
            ))}
          </div>

          <div className="md:p-4 p-2 w-full">
            <AddressBook />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressBookPage;
