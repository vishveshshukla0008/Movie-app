import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import Button from "../../../shared/components/Button";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const passwordValue = watch("password");
  const { register: doRegister, loading } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await doRegister({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      if (res.success) {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full h-[70vh] p-10 wrapper flex justify-center items-center">
      <div className="inner flex flex-col gap-8 w-full md:w-1/2">
        {/* Header */}
        <div className="flex-col flex gap-3">
          <p className="text-4xl font-bold">Create your account</p>
          <span className="text-gray-500 text-xl font-medium">
            Already have an account?{" "}
            <Link to="/login" className="text-white underline">
              Sign in
            </Link>
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {/* Full Name */}
          <div className="flex flex-col gap-1">
            <input
              className={`p-3 border rounded-sm placeholder:font-semibold ${
                errors.name ? "border-red-500" : "border-gray-500"
              }`}
              type="text"
              placeholder="Full name"
              {...register("name", {
                required: "Full name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
            />
            {errors.name && (
              <span className="text-red-500 text-sm font-medium">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <input
              className={`p-3 border rounded-sm placeholder:font-semibold ${
                errors.email ? "border-red-500" : "border-gray-500"
              }`}
              type="text"
              placeholder="Email address"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm font-medium">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <div className="password-wrapper w-full relative">
              <input
                className={`p-3 border rounded-sm placeholder:font-semibold w-full ${
                  errors.password ? "border-red-500" : "border-gray-500"
                }`}
                type={showPass ? "text" : "password"}
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
              <div
                className="absolute right-4 top-1/3 cursor-pointer"
                onClick={() => setShowPass((prev) => !prev)}>
                {showPass ? <FaRegEyeSlash /> : <FaEye />}
              </div>
            </div>
            {errors.password && (
              <span className="text-red-500 text-sm font-medium">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1">
            <div className="password-wrapper w-full relative">
              <input
                className={`p-3 border rounded-sm placeholder:font-semibold w-full ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-500"
                }`}
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === passwordValue || "Passwords do not match",
                })}
              />
              <div
                className="absolute right-4 top-1/3 cursor-pointer"
                onClick={() => setShowConfirm((prev) => !prev)}>
                {showConfirm ? <FaRegEyeSlash /> : <FaEye />}
              </div>
            </div>
            {errors.confirmPassword && (
              <span className="text-red-500 text-sm font-medium">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <Button content={"Create Account"} disabled={loading} />
        </form>
      </div>
    </div>
  );
};

export default Signup;
