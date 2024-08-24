import React from "react";
import Img from "../../assets/Sale.jpg";
function Sale() {
  return (
    <div className="md:(px-5) px-3 lg:max-w-7xl mx-auto md:mt-8 mt-4 md:h-screen md:mb-14  mb-7">
      <img src={Img} alt="" className="md:h-screen w-full h-[40dvh] rounded-2xl"/>
    </div>
  );
}

export default Sale;
