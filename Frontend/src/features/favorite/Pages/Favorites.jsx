import { useState } from "react";

export default function FavoritesPage({
  favoriteMovies = [],
  favoriteShows = [],
}) {
  const [activeTab, setActiveTab] = useState("movies");

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6">Your Favorites</h1>

      {/* Tabs */}
      <div className="flex gap-6 mb-8 border-b border-gray-700">
        <button
          onClick={() => setActiveTab("movies")}
          className={`pb-2 text-lg ${
            activeTab === "movies"
              ? "border-b-2 border-red-500"
              : "text-gray-400"
          }`}>
          Movies
        </button>

        <button
          onClick={() => setActiveTab("shows")}
          className={`pb-2 text-lg ${
            activeTab === "shows"
              ? "border-b-2 border-red-500"
              : "text-gray-400"
          }`}>
          TV Shows
        </button>
      </div>

      {/* Movies Section */}
      {activeTab === "movies" &&
        (favoriteMovies.length === 0 ? (
          <div className="text-gray-400">No favorite movies yet</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {favoriteMovies.map((movie) => (
              <div
                key={movie.id}
                className="bg-gray-900 rounded-lg overflow-hidden shadow hover:scale-105 transition">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-64 object-cover"
                />

                <div className="p-3">
                  <h3 className="text-sm font-semibold mb-2">{movie.title}</h3>

                  <div className="flex justify-between text-xs text-gray-400 mb-3">
                    <span>{movie.year}</span>
                    <span>⭐ {movie.rating}</span>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-red-600 text-xs py-1 rounded">
                      View
                    </button>

                    <button className="flex-1 bg-gray-700 text-xs py-1 rounded">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}

      {/* Shows Section */}
      {activeTab === "shows" &&
        (favoriteShows.length === 0 ? (
          <div className="text-gray-400">No favorite shows yet</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {favoriteShows.map((show) => (
              <div
                key={show.id}
                className="bg-gray-900 rounded-lg overflow-hidden shadow hover:scale-105 transition">
                <img
                  src={show.poster}
                  alt={show.title}
                  className="w-full h-64 object-cover"
                />

                <div className="p-3">
                  <h3 className="text-sm font-semibold mb-2">{show.title}</h3>

                  <div className="flex justify-between text-xs text-gray-400 mb-3">
                    <span>{show.year}</span>
                    <span>⭐ {show.rating}</span>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-red-600 text-xs py-1 rounded">
                      View
                    </button>

                    <button className="flex-1 bg-gray-700 text-xs py-1 rounded">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
}
