import React from "react";
import MovieCard from "./MovieCard";

const UiCards = ({ movies = [], loading = false }) => {
  // Show first 4 movies
  const displayMovies = movies.slice(0, 4);

  return (
    <div className="flex flex-col gap-4 w-full px-4 md:px-0">
      <div className="heading text-xl md:text-2xl lg:text-3xl font-semibold text-center md:text-left">
        Popular Movies
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 items-start justify-center">
        {loading
          ? // Show loading skeletons
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-full max-w-xs mx-auto">
                <div className="h-64 md:h-80 lg:h-96 bg-gray-700 rounded-lg animate-pulse mb-4"></div>
                <div className="h-4 bg-gray-700 rounded animate-pulse mb-2"></div>
                <div className="h-3 bg-gray-700 rounded animate-pulse w-3/4"></div>
              </div>
            ))
          : displayMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} type="movie" />
            ))}
      </div>
    </div>
  );
};

export default UiCards;
