import PropTypes from "prop-types";
import { FaEdit } from "react-icons/fa";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";

export default function ShippingAddress({
  data,
  selectedAddress,
  handleAddressSelection,
  handleClick,
  handleLinkClick,
  deleteUserDetails,
}) {
  return (
    <div className="space-y-2  ">
      <div className="flex justify-between font-Nunito items-center">
        <button
          onClick={() => handleClick()}
          className="flex items-center group hover:text-dark border-dark hover:bg-light space-x-1 border-2 px-2 p-3 rounded-md bg-dark group text-light duration-500  "
        >
          <p
            className="
          group-hover:text-dark   text-light duration-500"
          >
            Add New Address
          </p>
          <AiOutlinePlusCircle className="group-hover:text-dark text-light duration-500" />
        </button>
      </div>
      <div className="flex space-x-2  overflow-hidden overflow-x-scroll scroll-container py-4">
        {data ? (
          data.map((item, index) => (
            <div
              key={item._id}
              className={`grid border p-2 font-Nunito ${
                selectedAddress === item._id ? "border-dark rounded-sm" : ""
              }`}
              style={{ cursor: "pointer" }}
            >
              <div className="flex  gap-0.5 items-start ">
                <input
                  type="checkbox"
                  name="address"
                  checked={selectedAddress === item._id}
                  onChange={() => handleAddressSelection(item._id)}
                  class="accent-dark mt-1.5"
                />
                <div className="">
                  <p className="w-full">
                    {item.name} , {item.phoneNumber}
                  </p>
                  <p>{item.buildingAddress},</p>
                  <p>{item.streetAddress},</p>
                  <p>
                    {item.city}, {item.state}
                  </p>
                  <p>
                    {item.postalCode}, {item.country}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-end space-x-2 mt-1  md:space-y-1 ">
                <button
                  onClick={() => handleLinkClick(item)}
                  className="bg-black px-2 w-fit h-fit border p-1  duration-500 border-black text-light hover:cursor-pointer hover:text-dark hover:bg-white"
                >
                  <FaEdit />
                </button>
                {index !== 0 && (
                  <button
                    onClick={() => {
                      deleteUserDetails(item._id);
                    }}
                    className=" px-2 w-fit h-fit border p-1 hover:bg-red hover:text-white border-red-500 hover:cursor-pointer text-red "
                  >
                    <MdDeleteForever />
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No data found</p>
        )}
      </div>
    </div>
  );
}

ShippingAddress.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      phoneNumber: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.number.isRequired,
      ]),
      buildingAddress: PropTypes.string.isRequired,
      streetAddress: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      postalCode: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
    })
  ),
  selectedAddress: PropTypes.string,
  handleAddressSelection: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleLinkClick: PropTypes.func.isRequired,
  deleteUserDetails: PropTypes.func.isRequired,
};
