import React, { useState } from "react";
import MovieCard from "../components/MovieCard";
import { useMovies } from "../hooks/useMovies";

const AllMoviesPage = () => {
  const {
    trendingMovies,
    movies,
    loading,
    moviesPage,
    moviesTotalPages,
    loadMoreMovies,
  } = useMovies();

  const [isTrending, setIsTrending] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const handleTrending = () => {
    setIsTrending((prev) => !prev);
  };

  // infinite scroll
  React.useEffect(() => {
    if (isTrending) return;
    const onScroll = () => {
      if (
        isFetchingMore ||
        !moviesPage ||
        (moviesTotalPages && moviesPage >= moviesTotalPages)
      ) {
        return;
      }

      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 300
      ) {
        setIsFetchingMore(true);
        loadMoreMovies().finally(() => setIsFetchingMore(false));
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [
    isTrending,
    isFetchingMore,
    moviesPage,
    moviesTotalPages,
    loadMoreMovies,
  ]);

  return (
    <div className="w-full flex flex-col gap-6 px-4 md:px-6 lg:px-8">
      <div className="flex justify-center relative">
        <p className="text-2xl md:text-3xl lg:text-4xl text-center font-bold px-4">
          Movies, that makes your mood,
          <span className="font-sans text-orange-600">Moody</span>
        </p>

        <span
          onClick={handleTrending}
          className={`${isTrending ? "bg-orange-600" : "bg-gray-600"} 
          p-2 rounded-sm cursor-pointer absolute right-4 md:right-10 top-1 text-sm md:text-base`}>
          Trending
        </span>
      </div>

      <div className="w-full p-4 md:p-6 lg:p-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 lg:gap-10">
        {loading
          ? Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="h-70 md:h-87.5 lg:h-105 rounded-xl bg-gray-300 animate-pulse"
              />
            ))
          : (isTrending ? trendingMovies : movies)?.map((show) => (
              <MovieCard key={show.id} movie={show} type={"movie"} />
            ))}
      </div>
      {isFetchingMore && (
        <div className="text-center p-4">Loading more movies...</div>
      )}
    </div>
  );
};

export default AllMoviesPage;
