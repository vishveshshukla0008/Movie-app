import React, { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";

import Button from "../../../shared/components/Button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  function togglePass() {
    setShowPass((prev) => !prev);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      if (res.success) {
        navigate(from, { replace: true });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full h-[70vh] p-10 wrapper flex justify-center items-center">
      <div className="inner flex flex-col gap-8 w-full md:w-1/2">
        <div className="flex-col flex gap-3">
          <p className="text-4xl font-bold">Enter your info to sign in</p>
          <span className="text-gray-500 text-xl font-medium">
            Or get started with a new account.
          </span>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 border border-gray-500 rounded-sm placeholder:font-semibold"
            type="text"
            placeholder="Email or mobile number"
          />
          <div
            onClick={togglePass}
            className="password-wrapper cursor-pointer w-full relative">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 border border-gray-500 rounded-sm placeholder:font-semibold w-full"
              type={showPass ? "text" : "password"}
              placeholder="password"
            />

            <div className="absolute right-4 top-1/3">
              {showPass ? <FaRegEyeSlash /> : <FaEye />}
            </div>
          </div>
          <Button content={"Continue"} disabled={loading} />
        </form>
        <span className="text-gray-500 text-xl font-medium">
          Already have an account?{" "}
          <Link to="/signup" className="text-white underline">
            Sign up
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
