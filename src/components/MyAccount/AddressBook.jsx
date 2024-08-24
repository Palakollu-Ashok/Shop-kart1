import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ModalEdit from "./ModalEdit";
import ModalPost from "./ModalPost";
import { deleteDetailsFunction, getAddressFunction } from "../../Services/Apis";
import { AiOutlinePlusCircle } from "react-icons/ai";
import AreYouSureModal from "./AreYouSureModal";
import address from "../../static/assets/138890.png";
import Loading from "../common/Loading";

const AddressBook = () => {
  const [data, setData] = useState(null);
  const token = sessionStorage.getItem("userToken");
  const userid = sessionStorage.getItem("userId");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [addressCount, setAddressCount] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleLinkClick = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
    setIsAdding(false);
  };

  const handleClick = () => {
    if (addressCount < 5) {
      setModalVisible(true);
      setIsAdding(true);
    } else {
      alert(
        "You have reached the maximum address limit (5). Delete an address to add a new one."
      );
    }
  };
  const getAddressDetails = async () => {
    setLoading(true);
    const response = await getAddressFunction(userid);

    if (response.status === 200) {
      setLoading(false);
      setData(response.data.data);

      setAddressCount(response.data.data.length);
    }
  };

 

  const deleteUserDetails = async (addressId) => {
    if (!modalIsOpen) {
      console.error("Modal is not open. Deletion canceled.");
      return;
    }

    setModalIsOpen(false);

    if (!addressId) {
      console.error("Invalid addressId:", addressId);
      return;
    }

    const headers = {
      Authorization: `${sessionStorage.getItem("userToken")}`,
    };

    const deleteResponse = await deleteDetailsFunction(headers, addressId);
    if (deleteResponse.status === 200) {
      getAddressDetails();
    }
  };

  useEffect(() => {
    getAddressDetails();
  }, [userid]);

  return (
    <div className="w-full md:space-y-10 space-y-5 tracking-wide md:ml-14 ml-3 font-Nunito ">
      {!token ? (
        <div>
          <div>
            <h3 className="mb-10 text-dark font-Nunito ">Address Book</h3>
          </div>
          <div className="grid place-content-center ">
            <Link
              to="/login"
              className=" rounded-md md:p-3 p-2   hover:bg-light hover:text-dark bg-dark text-light font-Nunito border-2 border-dark duration-500"
            >
              Login to see the details
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div>
            {loading ? (
              <div className="md:h-[40vh] h-[20vh]">
                <Loading />
              </div>
            ) : (
              <div className="grid  md:gap-4 gap-2 font-Nunito">
                <div className="md:space-y-4 space-y-2">
                  <div>
                    <h3>Your adressess({addressCount})</h3>
                  </div>
                  <button
                    onClick={() => handleClick()}
                    className="flex items-center rounded-md space-x-1 w-fit bg-dark group  border-2 border-dark   p-3 hover:bg-light  duration-500"
                  >
                    <p className="text-light group-hover:text-dark  duration-500">
                      Add New Address
                    </p>
                    <AiOutlinePlusCircle className="text-light group-hover:text-dark duration-500" />
                  </button>
                </div>
                <div>
                  <h3 className="md:mt-4 mt-2 text-dark font-Nunito ">
                    Address Book
                  </h3>
                </div>
                {data ? (
                  data.map((item, index) => (
                    <div key={item._id} className="grid  ">
                      <div className="space-y-1 font-Nunito">
                        <p className="tracking-wide">
                          {item.name}
                          {","}
                          {item.phoneNumber}
                        </p>

                        <p className="tracking-wide">{item.buildingAddress}</p>
                        <p className="tracking-wide">{item.streetAddress}</p>

                        <p className="tracking-wide">
                          {item.city}

                          {item.state}
                        </p>

                        <p className="tracking-wide">
                          {item.postalCode}
                          {","}
                          {item.country}
                        </p>
                      </div>
                      <div className="md:space-x-2 tracking-wide flex gap-3    md:space-y-0 mt-4">
                        <button
                          onClick={() => handleLinkClick(item)}
                          className="bg-black rounded-md p-3 px-5 font-Nunito  border-2 border-dark  text-light hover:cursor-pointer hover:text-dark hover:bg-light duration-500"
                        >
                          Edit
                        </button>
                        {index !== 0 && (
                          <button
                            onClick={() => {
                              setSelectedUser(item._id);
                              setModalIsOpen(true);
                              setModalTitle("Are You Sure Want To Delete?");
                              setModalMessage("Confirm To Delete Address");
                            }}
                            className="hover:bg-dark md:p-3 p-2 font-Nunito duration-500 border border-red-500  rounded-md text-dark hover:cursor-pointer hover:text-light bg-white"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="grid place-items-center place-content-center  w-full gap-3">
                    <img src={address} alt="empty bag" className="w-[80px]" />
                    <h3
                      onClick={() => handleClick()}
                      className="font-medium text-dark"
                    >
                      Add Addresses
                    </h3>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
      {isAdding ? (
        <ModalPost
          showModal={modalVisible}
          setShowModal={setModalVisible}
          getAddressDetails={getAddressDetails}
        />
      ) : (
        <ModalEdit
          showModal={modalVisible}
          setShowModal={setModalVisible}
          addressData={selectedUser}
          getAddressDetails={getAddressDetails}
        />
      )}

      <AreYouSureModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        onConfirm={deleteUserDetails}
        title={modalTitle}
        message={modalMessage}
        id={selectedUser}
      />
    </div>
  );
};

export default AddressBook;
