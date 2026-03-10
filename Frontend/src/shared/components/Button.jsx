import React from "react";
import { useNavigate } from "react-router-dom";

const Button = ({ width, content, route }) => {
  const navigate = useNavigate();
  function handleNavigate() {
    route ? navigate(route) : "";
  }
  return (
    <button onClick={handleNavigate} className={`px-3 text-xl font-semibold bg-orange-600 py-3 rounded-sm w-[${width}]`}>
      {content}
    </button>
  );
};

export default Button;
