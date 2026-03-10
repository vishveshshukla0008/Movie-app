import React from "react";
import HeroComponent from "../components/HeroComponent";
import Trending from "../components/Trending";
import UiCards from "../components/UiCards";
import { useMovies } from "../hooks/useMovies";

const HomePage = () => {
  const { trendingMovies, trendingShows, movies, loading } = useMovies();

  // Get the first trending movie as featured content
  const featuredMovie = trendingMovies?.[0];

  return (
    <div className="w-full flex flex-col items-center gap-5 px-4 md:px-6 lg:px-8">
      <HeroComponent featuredMovie={featuredMovie} />
      <div className="main-section w-full max-w-7xl flex flex-col p-4 md:p-5 lg:p-5 gap-8 md:gap-16 lg:gap-30">
        <Trending
          trendingMovies={trendingMovies}
          trendingShows={trendingShows}
          loading={loading}
        />
        <UiCards movies={movies} loading={loading} />
      </div>
    </div>
  );
};

export default HomePage;
