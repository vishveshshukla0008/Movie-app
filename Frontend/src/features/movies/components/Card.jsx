import React from "react";

const Card = () => {
  return (
    <div className="w-full max-w-xs mx-auto p-4 md:p-6 lg:p-8 bg-linear-to-tr from-blue-950 via-violet-600/30 to-transparent rounded-sm flex flex-col gap-3 min-h-[200px] md:min-h-[220px]">
      <p className="text-lg md:text-xl lg:text-2xl font-semibold">
        Enjoy on your TV
      </p>
      <span className="text-gray-200 text-xs md:text-sm font-semibold leading-relaxed">
        Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray
        players and more.
      </span>
    </div>
  );
};

export default Card;
