import React from "react";
import { useNavigate } from "react-router-dom";

const TrendingItem = ({ item, type }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/watch/${type}/${item.id}`);
  };

  const title = item.title || item.name;
  const releaseDate = item.release_date || item.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : "";
  const rating = item.vote_average ? item.vote_average.toFixed(1) : "";

  return (
    <div
      onClick={handleClick}
      className="p-2 md:p-3 relative flex flex-col flex-nowrap shrink-0 hover:scale-105 transition-transform duration-200 cursor-pointer">
      <img
        className="w-48 md:w-56 lg:w-64 xl:w-72 h-64 md:h-80 lg:h-96 object-cover rounded-md"
        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
        alt={title}
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/300x450?text=No+Image";
        }}
      />

      <div className="w-full p-2 md:p-3 absolute inset-0 flex flex-col justify-end bg-linear-to-r from-black via-black/60 to-transparent rounded-md">
        <p className="text-lg md:text-xl lg:text-2xl font-semibold line-clamp-2">
          {title}
        </p>
        <div className="flex items-center gap-2 text-xs md:text-sm text-white">
          {year && <span>{year}</span>}
          {rating && (
            <>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span className="text-yellow-400">★</span>
                {rating}
              </span>
            </>
          )}
        </div>
        <span className="text-xs md:text-sm text-white leading-relaxed line-clamp-2 mt-1">
          {item.overview?.slice(0, 80) +
            (item.overview?.length > 80 ? "..." : "")}
        </span>
      </div>
    </div>
  );
};

export default TrendingItem;
