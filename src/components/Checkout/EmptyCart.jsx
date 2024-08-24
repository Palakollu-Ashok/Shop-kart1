import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="grid place-items-center place-content-center h-[50vh] w-full gap-3">
      <h3 className="font-medium text-dark">Hey, it feels so light!</h3>
      <p>There is nothing in your bag. Let's add some items.</p>

      <Link to="/allProducts" className="hover:cursor-pointer">
        <p className="border p-3 text-primary font-medium border-primary">
          ADD ITEMS FROM SHOP
        </p>
      </Link>
    </div>
  );
};

export default EmptyCart;
