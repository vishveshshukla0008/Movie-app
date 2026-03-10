import React from "react";
import { useNavigate } from "react-router-dom";

const HeroComponent = ({ featuredMovie }) => {
  const navigate = useNavigate();

  // Use the featured movie if provided, otherwise use default content
  const movie = featuredMovie || {
    title: "Interstellar",
    overview:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival. A visually stunning sci-fi epic filled with emotion and breathtaking discoveries.",
    backdrop_path: "/b2.jpg",
  };

  const handlePlay = () => {
    if (featuredMovie) {
      navigate(`/watch/movie/${featuredMovie.id}`);
    }
  };

  const handleMoreInfo = () => {
    if (featuredMovie) {
      navigate(`/watch/movie/${featuredMovie.id}`);
    }
  };

  return (
    <section className="relative w-full min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh] text-white p-4 md:p-6 lg:p-10">
      {/* Background Image */}
      <img
        src={
          featuredMovie
            ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
            : "/Images/b2.jpg"
        }
        alt={movie.title || "Movie Banner"}
        className="absolute inset-0 w-full h-full object-cover object-top"
      />

      {/* Dark Overlay */}
      <div className="absolute h-full inset-0 bg-black/60"></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 h-full bg-linear-to-r from-black via-black/60 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-[84vh] items-start justify-center">
        <div className="max-w-2xl px-4 md:px-6 lg:px-10 w-full">
          {/* Movie Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4">
            {movie.title}
          </h1>

          {/* Description */}
          <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6 max-w-xl">
            {movie.overview?.slice(0, 200) +
              (movie.overview?.length > 200 ? "..." : "")}
          </p>

          {/* Rating */}
          {movie.vote_average && (
            <div className="flex items-center gap-2 mb-4">
              <span className="text-yellow-400 text-lg">★</span>
              <span className="font-semibold">
                {movie.vote_average.toFixed(1)}
              </span>
              <span className="text-gray-400">({movie.vote_count} votes)</span>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <button
              onClick={handlePlay}
              className="bg-white text-black px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold hover:bg-gray-200 transition text-sm md:text-base">
              ▶ Play
            </button>

            <button
              onClick={handleMoreInfo}
              className="bg-gray-700/80 px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold hover:bg-gray-600 transition text-sm md:text-base">
              More Info
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroComponent;
