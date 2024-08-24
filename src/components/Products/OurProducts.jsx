import { useState } from "react";
import { Tab } from "@headlessui/react";
import Card from "../common/Card";
import HotDealsCard from "../common/HotDealsCard";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function OurProducts() {
  let [categories] = useState({
    "New Arrivals": [
      {
        id: 1,
        title: <Card />,
      },
    ],
    "Best Sellers": [
      {
        id: 2,
        title: <Card />,
      },
    ],
    "Hot Deals": [
      {
        id: 3,
        title: <HotDealsCard />,
      },
    ],
  });

  return (
    <div className="text-center mt-6">
      <h2>Our Products</h2>

      <div className="w-full 2xl:px-[160px] sm:px-[50px] px-[10px] gap-8 md:py-16 py-8">
        <Tab.Group>
          <Tab.List className="flex justify-center space-x-6 p-1 text-dark ">
            {Object.keys(categories).map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  classNames(
                    "w-fit md:text-[18px] text-[10px]  font-semibold leading-5 text-dark",

                    selected ? "text-primary" : "text-dark "
                  )
                }
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            {Object.values(categories).map((posts, idx) => (
              <Tab.Panel key={idx} className={classNames("rounded-xl mt-8")}>
                <ul>
                  {posts.map((post) => (
                    <li key={post.id} className="relative rounded-md">
                      {post.title}
                    </li>
                  ))}
                </ul>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
