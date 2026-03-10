import React from "react";
import TrendingItem from "./TrendingItem";

const Trending = ({
  trendingMovies = [],
  trendingShows = [],
  loading = false,
}) => {
  // Combine trending movies and shows, limit to 10 items
  const combinedTrending = [
    ...(trendingMovies || []),
    ...(trendingShows || []),
  ].slice(0, 10);

  return (
    <div className="wrapper">
      <div className="heading text-xl md:text-2xl lg:text-3xl font-serif mb-4 md:mb-6">
        Trending Movies and TV Shows
      </div>
      <div className="swipe-wrapper flex w-full overflow-x-auto scrollbar-hide gap-4 pb-4">
        {loading
          ? // Show loading skeletons
            Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="p-2 md:p-3 relative flex flex-col flex-nowrap shrink-0">
                <div className="w-48 md:w-56 lg:w-64 xl:w-72 h-64 md:h-80 lg:h-96 bg-gray-700 rounded-md animate-pulse"></div>
              </div>
            ))
          : combinedTrending.map((item) => (
              <TrendingItem
                key={item.id}
                item={item}
                type={item.media_type || (item.title ? "movie" : "tv")}
              />
            ))}
      </div>
    </div>
  );
};

export default Trending;
