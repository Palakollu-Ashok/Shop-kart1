const CardLoadingSkeleton = () => {
  return (
    <div className="w-full grid xl:grid-cols-4 sm:grid-cols-3 grid-cols-2 justify-items-center gap-4">
      {[...Array(16)].map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-md shadow-md xl:w-72 w-40 "
        >
          <div className="bg-dark/5 xl:h-48 h-32 mb-4 animate-pulse rounded-t-md"></div>
          <div className="p-4">
            <div className="bg-dark/15 md:h-6 h-2 w-4/5 mb-3 animate-pulse"></div>
            <div className="bg-dark/10 md:h-6 h-2 w-3/5 animate-pulse"></div>
            <div className="flex items-center space-x-4 mt-4">
              <div className="bg-dark/20 md:h-12 h-2 md:w-12 w-2 rounded-full animate-pulse"></div>
              <div className="bg-dark/25 md:h-8 h-2 md:w-20 w-4 animate-pulse"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardLoadingSkeleton;
