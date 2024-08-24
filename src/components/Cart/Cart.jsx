import { useState } from "react";
import { BsBagPlus } from "react-icons/bs";
import { useClickOutside } from "@mantine/hooks";
import CartSlider from "./CartSlider";

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useClickOutside(() => setIsOpen(false));

  const toggleSlider = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative ">
      <BsBagPlus className="cursor-pointer text-lg" onClick={toggleSlider} />
      {isOpen && (
        <div ref={ref} className="">
          <CartSlider isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      )}
    </div>
  );
};

export default Cart;
