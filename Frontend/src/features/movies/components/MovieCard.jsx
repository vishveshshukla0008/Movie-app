import React from "react";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie, type }) => {
  const navigate = useNavigate();

  function navigateOnDetail() {
    navigate(`/watch/${type}/${movie.id}`);
  }

  const title = movie?.name || movie?.title;
  const releaseDate = movie?.release_date || movie?.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : "";
  const rating = movie?.vote_average ? movie?.vote_average.toFixed(1) : "";

  return (
    <div className="w-full max-w-xs mx-auto flex flex-col gap-2">
      <img
        onClick={navigateOnDetail}
        className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform duration-200"
        src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
        alt={title}
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/300x450?text=No+Image";
        }}
      />
      <div className="desc flex flex-col gap-2 min-h-[80px] md:min-h-[100px]">
        <div className="flex items-start justify-between gap-2">
          <p className="text-lg md:text-xl font-semibold line-clamp-2 flex-1">
            {title}
          </p>
          {rating && (
            <div className="flex items-center gap-1 text-yellow-400 text-sm">
              <span>★</span>
              <span>{rating}</span>
            </div>
          )}
        </div>
        {year && <p className="text-gray-400 text-sm">{year}</p>}
        <span className="text-gray-400 text-sm line-clamp-3">
          {movie?.overview?.slice(0, 100) +
            (movie?.overview?.length > 100 ? "..." : "")}
        </span>
      </div>
      <div className="controls flex flex-col sm:flex-row gap-2 md:gap-3">
        <button
          onClick={navigateOnDetail}
          className="px-3 py-2 bg-orange-600 hover:bg-orange-700 rounded-sm cursor-pointer transition-colors duration-200 text-sm md:text-base">
          Play
        </button>
        <button className="cursor-pointer px-3 py-2 bg-white text-black hover:bg-gray-200 rounded-sm transition-colors duration-200 text-sm md:text-base">
          Add to favorites
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
