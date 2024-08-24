import { useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import ShopCard from "./ShopCard";
import { getCategory } from "../../Services/Apis";
import { productsFetch } from "../../Reducers/productsSlice";
import { useDispatch, useSelector } from "react-redux";

const ProductCards = () => {
  const [categories, setCategories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.products.items);
  const [filteredData, setFilteredData] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  const [filteredCategories, setFilteredCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await getCategory();
      if (response.status === 200) {
        setCategories(response.data.data);

        console.log(response);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  
  useEffect(() => {
    fetchCategories();
    dispatch(productsFetch()).then((action) => {
      setSearchResults(action.payload || []);
    });
  }, [dispatch]);

  useEffect(() => {
    const activeProducts = data?.Products?.filter(
      (product) => product.status === "Active"
    );
    setFilteredData(activeProducts);
    
  }, [data]);

  useEffect(() => {
    const activeCategories = categories?.filter(
      (product) => product.status === "Active"
    );
    setFilteredCategories(activeCategories);
  }, [categories]);

  const handleCategoryClick = (categoryId) => {
    if (categoryId === null) {
      setFilteredData(
        data?.Products?.filter((product) => product.status === "Active")
      );
      setActiveCategory(null);
    } else {
      const filteredProducts = data?.Products?.filter((product) => {
        const category = product.category;
        return (
          category && category._id === categoryId && product.status === "Active"
        );
      });
      setFilteredData(filteredProducts);
      setActiveCategory(categoryId);
    }
  };
  console.log(data);
  return (
    <div className="w-full md:px-5 px-3 max-w-7xl mx-auto gap-8 md:py-16 py-8 text-center">
      <div className="md:flex md:space-x-8">
        <div className="md:w-[20%] mt-8 font-Nunito font-semibold tracking-wide ">
          <div className="space-y-3 md:sticky md:top-32">
            <div className="flex space-x-2">
              <h3>CATEGORY</h3>
              <h3>({categories.length})</h3>
            </div>
            <div>
              <Disclosure>
                <>
                  <Disclosure.Button
                    onClick={() => handleCategoryClick(null)}
                    className={`py-1 w-full text-start ${
                      activeCategory === null ? "font-bold" : ""
                    }`}
                  >
                    <div className="flex justify-between">
                      <p>All</p>
                    </div>
                  </Disclosure.Button>
                </>
              </Disclosure>
              {filteredCategories?.map((category) => (
                <Disclosure key={category._id}>
                  <>
                    <Disclosure.Button
                      onClick={() => handleCategoryClick(category._id)}
                      className={`py-1 w-full text-start ${
                        activeCategory === category._id ? "font-bold" : ""
                      }`}
                    >
                      <div className="flex justify-between">
                        <p>{category.categoryName}</p>
                      </div>
                    </Disclosure.Button>
                  </>
                </Disclosure>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full mt-8">
          <ShopCard searchResults={searchResults} filteredData={filteredData} />
        </div>
      </div>
    </div>
  );
};

export default ProductCards;
