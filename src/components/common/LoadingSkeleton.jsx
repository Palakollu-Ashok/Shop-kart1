const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="md:flex md:gap-10">
        <div className="md:w-[40%] w-full">
          <div className="h-96 bg-paragraph-color rounded-md mb-4"></div>
          <div className="h-20 bg-paragraph-color rounded-md"></div>
        </div>
        <div className="md:space-y-10 space-y-3">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold bg-paragraph-color h-8 w-2/3"></h3>
            <p className="bg-paragraph-color h-12 w-full"></p>
          </div>
          <div className="flex space-x-4 items-center mt-2">
            <h2 className="text-green-600 font-semibold bg-paragraph-color h-6 w-1/3"></h2>
            <h2 className="text-paragraph-color line-through bg-paragraph-color h-6 w-1/3"></h2>
          </div>
          <div className="flex space-x-6">
            <div className="flex gap-2 border p-3 bg-paragraph-color h-12 w-40">
              <button className="bg-paragraph-color w-8 h-8"></button>
              <div className="px-3 bg-paragraph-color w-8 h-8"></div>
              <button className="bg-paragraph-color w-8 h-8"></button>
            </div>
            <button className="bg-gray-500 text-light px-3 font-semibold cursor-not-allowed h-12 w-40"></button>
          </div>
          <div className="text-red mt-2 bg-paragraph-color h-6 w-1/3"></div>
          <hr className="bg-paragraph-color h-1 w-full" />
          <div className="space-y-4">
            <div className="flex gap-2 items-center">
              <div className="bg-paragraph-color w-6 h-6"></div>
              <p className="bg-paragraph-color h-6 w-3/4"></p>
            </div>
            <div className="flex gap-2 items-center">
              <div className="bg-paragraph-color w-6 h-6"></div>
              <p className="bg-paragraph-color h-6 w-3/4"></p>
            </div>
            <div className="flex gap-2 items-center">
              <div className="bg-paragraph-color w-6 h-6"></div>
              <p className="bg-paragraph-color h-6 w-3/4"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
