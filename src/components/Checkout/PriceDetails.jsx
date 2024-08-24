import PropTypes from "prop-types";

const PriceDetails = ({ cartLength, getTotalMrp }) => {
  return (
    <div>
      <div>
        <p className="font-Nunito md:px-2  md:mt-16 mt-5  md:py-3">
          <span className="text-dark">Price Details</span>
          <span className="text-dark/70 px-0.5">
            {cartLength > 1 ? `${cartLength} Items` : `${cartLength} Item`}
          </span>
        </p>
        <p className="md:py-2 py-1">
          <hr />
        </p>
        <div className=" md:mt-5 mt-5   items-center">
          <div className="flex  mb-2 justify-between ">
            <p className="font-Nunito">Total MRP</p>
            <p className="font-Nunito">₹{getTotalMrp}</p>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
};

PriceDetails.propTypes = {
  cartLength: PropTypes.number,
  getTotalMrp: PropTypes.number,
};

export default PriceDetails;
