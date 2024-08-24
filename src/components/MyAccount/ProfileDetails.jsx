import { useEffect, useState } from "react";
import { getAddressFunction } from "../../Services/Apis";
import { Link } from "react-router-dom";
import Loading from "../common/Loading";
import { set } from "react-hook-form";

const ProfileDetails = () => {
  const [userData, setUserData] = useState([]);
  const userid = sessionStorage.getItem("userId");
  const mail = sessionStorage.getItem("userMail");
  const token = sessionStorage.getItem("userToken");
  const [loading, setLoading] = useState(false);
  const getAddressDetails = async () => {
    setLoading(true);
    const response = await getAddressFunction(userid);
    if (response.status === 200) {
      setLoading(false);
      setUserData(response.data.data);
    }
  };

  useEffect(() => {
    getAddressDetails();
  }, [userid]);

  return (
    <div className="w-full md:space-y-10 space-y-5 tracking-wide md:ml-14 ml-3 font-Nunito">
      {!token ? (
        <div>
          <h3 className="font-Nunito mb-10  text-dark tracking-wide">
            Account Details
          </h3>
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
          {loading ? (
            <div className="md:h-[50vh] h-[25vh]">
              <Loading />
            </div>
          ) : (
            <div
              key={userData?._id}
              className="space-y-6 tracking-wide font-Nunito"
            >
              <div>
                <p className=" md:text-[16px]">
                  <span className="font-Nunito tracking-wide text-dark/55 font-semibold">
                    Hello,
                  </span>{" "}
                  <span className="text-dark font-Nunito font-semibold tracking-wide">
                    {userData[0]?.name}
                  </span>
                </p>
              </div>

              <h3 className="font-Nunito text-dark tracking-wide">
                Account Details
              </h3>
              <h4 className=" text-dark/80">
                Full Name:{" "}
                <span className="text-dark/55">{userData[0]?.name} </span>
                <hr className="md:mt-4 mt-2" />
              </h4>

              <h4 className="  text-dark/80 ">
                Email Address: <span className="text-dark/55">{mail}</span>
                <hr className="md:mt-4 mt-2" />
              </h4>
              {userData?.length > 0 && (
                <>
                  <h4 className=" text-dark/80">
                    phone Number:{" "}
                    <span className="text-dark/55">
                      {userData[0]?.phoneNumber}{" "}
                    </span>
                    <hr className="md:mt-4 mt-2" />
                  </h4>
                  <h4 className=" text-dark/80">
                    Address:{" "}
                    <span className="text-dark/55">
                      {userData[0]?.buildingAddress}
                      {""} {userData[0]?.streetAddress} <br />
                      {userData[0]?.city}
                      {""} {userData[0]?.state}
                      {""} {userData[0]?.postalCode}
                    </span>
                    <hr className="md:mt-4 mt-2" />
                  </h4>
                  <h4 className="text-dark/80">
                    Country:{" "}
                    <span className="text-dark/55">{userData[0]?.country}</span>{" "}
                    <hr className="md:mt-4 mt-2" />
                  </h4>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileDetails;
