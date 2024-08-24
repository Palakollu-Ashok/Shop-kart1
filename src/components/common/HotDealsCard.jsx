import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productsFetch } from "../../Reducers/productsSlice";
import { Link } from "react-router-dom";
import CardLoadingSkeleton from "./CardLoadingSkeleton";

export default function HotDealsCard() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);

  useEffect(() => {
    dispatch(productsFetch());
  }, [dispatch]);

  const minSalePrice = 1000;

  const filteredAndSortedData = [...data]
    .filter((item) => item.sale_price >= minSalePrice)
    .sort((a, b) => b.sale_price - a.sale_price);

  const topProducts = filteredAndSortedData.slice(0, 4);

  return (
    <>
      {status === "Pending" ? (
        <CardLoadingSkeleton />
      ) : status === "Rejected" ? (
        <p>An Error Occurred</p>
      ) : (
        <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 place-items-stretch 2xl:gap-16 md:gap-6 gap-4">
          {topProducts.map((item) => {
            const originalPrice = item.price;
            const salePrice = item.sale_price;
            const percentageDiscount =
              ((originalPrice - salePrice) / originalPrice) * 100;
            return (
              <div
                key={item._id}
                className="relative bg-white xl:h-[360px] pb-4 group md:p-4 p-2"
              >
                <div className="relative overflow-hidden group-hover:cursor-pointer">
                  <Link to={`/viewProducts/${item._id}`}>
                    <img
                      src={item.imageUrl}
                      alt={item?.category?.categoryName}
                      className="w-[100%] md:h-[266px] h-[200px]  object-contain transition overflow-hidden group-hover:ease-in-out group-hover:rotate-3 duration-200 group-hover:-translate-y-1 group-hover:scale-110 "
                    />
                  </Link>
                </div>

                <div className="text-center mt-4 space-y-2">
                  <Link to={`/viewProducts/${item._id}`}>
                    <div className="text-center mt-4 space-y-2 truncate hover:text-primary">
                      <p>{item.name}</p>
                    </div>
                  </Link>

                  <div className="flex justify-center items-center gap-2">
                    {item.sale_price && <small>₹ {item.sale_price}</small>}

                    <small
                      className={`${
                        item.sale_price
                          ? "line-through text-xs text-dark/60"
                          : ""
                      }`}
                    >
                      ₹ {item.price}
                    </small>
                  </div>

                  <div className="absolute  top-5 left-2 bg-green-500 text-light px-2 ">
                    {item.sale_price && (
                      <small>{`${percentageDiscount.toFixed(2)}% Off`}</small>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
