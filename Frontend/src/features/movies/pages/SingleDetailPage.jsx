import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { useSingleTvShow } from "../hooks/useSingleTvShow";
import { useTvShowTrailer } from "../hooks/useTvShowTrailer";
import { useSingleMovie } from "../hooks/useSingleMovie";
import { useMovieTrailer } from "../hooks/useMovieTrailer";

const SingleDetailPage = () => {
  const { type, id } = useParams();

  // Use appropriate hooks based on type
  const tvShowData = useSingleTvShow(type === "tv" ? id : null);
  const movieData = useSingleMovie(type === "movie" ? id : null);
  const tvTrailer = useTvShowTrailer(type === "tv" ? id : null);
  const movieTrailer = useMovieTrailer(type === "movie" ? id : null);

  // Select the appropriate data based on type
  const { singleTvShowDetails, loading: tvLoading } = tvShowData;
  const { singleMovieDetails, loading: movieLoading } = movieData;
  const { trailer: tvTrailerData } = tvTrailer;
  const { trailer: movieTrailerData } = movieTrailer;

  const loading = tvLoading || movieLoading;
  const details = type === "tv" ? singleTvShowDetails : singleMovieDetails;
  const trailer = type === "tv" ? tvTrailerData : movieTrailerData;

  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl">Loading TV Show details...</div>
      </div>
    );
  }

  if (!details) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl">
          {type === "tv" ? "TV Show" : "Movie"} not found
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatRuntime = (runtime) => {
    if (!runtime) return "N/A";
    if (type === "tv") {
      // TV shows have runtime as array
      return Array.isArray(runtime) && runtime.length > 0
        ? `${runtime[0]} min`
        : "N/A";
    } else {
      // Movies have runtime as number
      return `${runtime} min`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative">
        <div
          className="h-64 md:h-80 lg:h-96 bg-cover bg-center relative"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${details.backdrop_path})`,
          }}>
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-end">
            <img
              src={`https://image.tmdb.org/t/p/w300${details.poster_path}`}
              alt={details.title || details.name}
              className="w-32 md:w-40 lg:w-48 rounded-lg shadow-2xl mx-auto md:mx-0"
            />
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                {details.title || details.name}
              </h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-4 text-xs md:text-sm mb-4">
                {type === "tv" ? (
                  <>
                    <span className="bg-red-600 px-2 md:px-3 py-1 rounded-full">
                      {details.status}
                    </span>
                    <span>
                      {formatDate(details.first_air_date)} -{" "}
                      {formatDate(details.last_air_date)}
                    </span>
                    <span>{details.number_of_seasons} Seasons</span>
                    <span>{details.number_of_episodes} Episodes</span>
                  </>
                ) : (
                  <>
                    <span className="bg-red-600 px-2 md:px-3 py-1 rounded-full">
                      {details.status || "Released"}
                    </span>
                    <span>{formatDate(details.release_date)}</span>
                  </>
                )}
                <span>
                  {formatRuntime(
                    type === "tv" ? details.episode_run_time : details.runtime,
                  )}
                </span>
              </div>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400 text-base md:text-lg">
                    ★
                  </span>
                  <span className="font-semibold">
                    {details.vote_average?.toFixed(1)}
                  </span>
                  <span className="text-gray-400 text-sm">
                    ({details.vote_count} votes)
                  </span>
                </div>
                <div className="text-gray-400 text-sm">
                  Popularity: {details.popularity?.toFixed(1)}
                </div>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                {details.genres?.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-gray-700 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm">
                    {genre.name}
                  </span>
                ))}
              </div>
              {trailer && (
                <div className="flex justify-center md:justify-start">
                  <button
                    onClick={() => setIsTrailerOpen(true)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold flex items-center gap-2 transition-colors duration-200 text-sm md:text-base">
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Play Trailer
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
        {/* Overview */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Overview</h2>
          <p className="text-gray-300 leading-relaxed text-sm md:text-base">
            {details.overview}
          </p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-blue-400">
              Production Details
            </h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-400">
                  Original {type === "tv" ? "Name" : "Title"}:
                </span>{" "}
                {details.original_name || details.original_title}
              </div>
              <div>
                <span className="text-gray-400">Original Language:</span>{" "}
                {details.original_language?.toUpperCase()}
              </div>
              {type === "tv" ? (
                <>
                  <div>
                    <span className="text-gray-400">Type:</span> {details.type}
                  </div>
                  <div>
                    <span className="text-gray-400">In Production:</span>{" "}
                    {details.in_production ? "Yes" : "No"}
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <span className="text-gray-400">Budget:</span>{" "}
                    {details.budget
                      ? `$${details.budget.toLocaleString()}`
                      : "N/A"}
                  </div>
                  <div>
                    <span className="text-gray-400">Revenue:</span>{" "}
                    {details.revenue
                      ? `$${details.revenue.toLocaleString()}`
                      : "N/A"}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-green-400">
              Content Info
            </h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-400">Adult Content:</span>{" "}
                {details.adult ? "Yes" : "No"}
              </div>
              <div>
                <span className="text-gray-400">Tagline:</span>{" "}
                {details.tagline || "N/A"}
              </div>
              <div>
                <span className="text-gray-400">Homepage:</span>
                {details.homepage ? (
                  <a
                    href={details.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline ml-1">
                    Visit
                  </a>
                ) : (
                  "N/A"
                )}
              </div>
              {type === "movie" && (
                <div>
                  <span className="text-gray-400">IMDB ID:</span>{" "}
                  {details.imdb_id ? (
                    <a
                      href={`https://www.imdb.com/title/${details.imdb_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline ml-1">
                      {details.imdb_id}
                    </a>
                  ) : (
                    "N/A"
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-purple-400">
              Origin & Languages
            </h3>
            <div className="space-y-2 text-sm">
              {type === "tv" ? (
                <>
                  <div>
                    <span className="text-gray-400">Country:</span>{" "}
                    {details.origin_country?.join(", ")}
                  </div>
                  <div>
                    <span className="text-gray-400">Languages:</span>{" "}
                    {details.languages?.join(", ")?.toUpperCase()}
                  </div>
                  <div>
                    <span className="text-gray-400">Spoken Languages:</span>
                    {details.spoken_languages
                      ?.map((lang) => lang.english_name)
                      .join(", ")}
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <span className="text-gray-400">Production Countries:</span>{" "}
                    {details.production_countries
                      ?.map((country) => country.name)
                      .join(", ") || "N/A"}
                  </div>
                  <div>
                    <span className="text-gray-400">Spoken Languages:</span>
                    {details.spoken_languages
                      ?.map((lang) => lang.english_name)
                      .join(", ")}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Seasons - Only for TV Shows */}
        {type === "tv" && details.seasons?.length > 0 && (
          <div className="mb-6 md:mb-8">
            <h2 className="text-xl md:text-2xl font-bold mb-4">Seasons</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {details.seasons?.map((season) => (
                <div
                  key={season.id}
                  className="bg-gray-800 p-3 md:p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-700 rounded flex items-center justify-center text-sm font-bold">
                      {season.season_number === 0 ? "S" : season.season_number}
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm md:text-base">
                        {season.name}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-400">
                        {season.episode_count} episodes
                      </p>
                    </div>
                  </div>
                  {season.air_date && (
                    <p className="text-xs md:text-sm text-gray-400 mb-2">
                      {formatDate(season.air_date)}
                    </p>
                  )}
                  {season.overview && (
                    <p className="text-xs md:text-sm text-gray-300 line-clamp-3">
                      {season.overview}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Created By - Only for TV Shows */}
        {type === "tv" && details.created_by?.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Created By</h2>
            <div className="flex flex-wrap gap-4">
              {details.created_by.map((creator) => (
                <div
                  key={creator.id}
                  className="bg-gray-800 p-4 rounded-lg text-center">
                  <div className="w-16 h-16 bg-gray-700 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="text-2xl font-bold">
                      {creator.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <h3 className="font-semibold">{creator.name}</h3>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Networks - Only for TV Shows */}
        {type === "tv" && details.networks?.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Networks</h2>
            <div className="flex flex-wrap gap-4">
              {details.networks.map((network) => (
                <div
                  key={network.id}
                  className="bg-gray-800 p-4 rounded-lg flex items-center gap-3">
                  {network.logo_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w92${network.logo_path}`}
                      alt={network.name}
                      className="w-8 h-8 object-contain"
                    />
                  )}
                  <span className="font-semibold">{network.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Production Companies */}
        {details.production_companies?.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Production Companies</h2>
            <div className="flex flex-wrap gap-4">
              {details.production_companies.map((company) => (
                <div
                  key={company.id}
                  className="bg-gray-800 p-4 rounded-lg flex items-center gap-3">
                  {company.logo_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w92${company.logo_path}`}
                      alt={company.name}
                      className="w-8 h-8 object-contain"
                    />
                  )}
                  <span className="font-semibold">{company.name}</span>
                  <span className="text-sm text-gray-400">
                    ({company.origin_country})
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Trailer Modal */}
      {isTrailerOpen && trailer && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-2 md:p-4">
          <div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-3 md:p-4 border-b border-gray-700">
              <h3 className="text-lg md:text-xl font-bold truncate pr-2">
                {details.title || details.name} - Trailer
              </h3>
              <button
                onClick={() => setIsTrailerOpen(false)}
                className="text-gray-400 hover:text-white text-xl md:text-2xl shrink-0">
                ×
              </button>
            </div>
            <div className="p-2 md:p-4">
              <div className="aspect-video">
                {trailer?.key ? (
                  <>
                    <div className="mb-2 text-xs md:text-sm text-gray-300">
                      Trailer Key: {trailer.key} | Type: {trailer.type} | Site:
                      {trailer.site}
                    </div>
                    {trailer.site === "YouTube" ? (
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${trailer.key}`}
                        title="Trailer"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white">
                        <p className="text-center text-sm md:text-base">
                          Trailer available on {trailer.site} (not supported)
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white">
                    <div className="text-center">
                      <p className="mb-2 text-sm md:text-base">
                        Trailer not available
                      </p>
                      <p className="text-xs md:text-sm text-gray-400">
                        Trailer data:{" "}
                        {trailer ? JSON.stringify(trailer) : "No trailer data"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleDetailPage;
