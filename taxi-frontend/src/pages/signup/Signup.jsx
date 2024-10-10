import React, { useState } from "react";
import bgImg from "../../assets/bg-image.png";
import { FcGoogle } from "react-icons/fc";
import useSignup from "../../hooks/useSignup";
import { Link } from "react-router-dom";

const Signup = () => {
  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const { loading, signup } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);

    // this comment is a reminder to add the backend path in the fetch methode
    signup(inputs);
  };

  return (
    <div className="w-full h-full bg-gradient flex flex-row items-center justify-between p-40">
      <div className="hidden md:flex flex-1 min-w-[435px] h-[800px]  items-center bg-white">
        <div className="m-4 ms-0 relative w-full h-full">
          <img
            className="w-full h-full object-cover rounded-2xl"
            src={`${bgImg}`}
            alt="background"
          />
          <p className="absolute inset-0 flex items-center justify-center text-white text-xl font-bold">
            Log In to your account
          </p>
        </div>
      </div>

      {/* The form starts from here */}
      <div className="flex flex-col flex-1 min-w-[435px] h-[800px] justify-center items-center bg-white">
        <h2 className="text-3xl font-extrabold">Sign Up</h2>
        <form className="p-9 w-3/5" onSubmit={handleSubmit}>
          <div className="space-y-4 flex flex-col items-center justify-center mt-2">
            <label className="input input-bordered flex items-center gap-2 w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Email"
                value={inputs.email}
                onChange={(e) => {
                  setInputs({ ...inputs, email: e.target.value });
                }}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Username"
                value={inputs.username}
                onChange={(e) => {
                  setInputs({ ...inputs, username: e.target.value });
                }}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                className="grow"
                placeholder="Password"
                value={inputs.password}
                onChange={(e) => {
                  setInputs({ ...inputs, password: e.target.value });
                }}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                className="grow"
                placeholder="Confirm Password"
                value={inputs.confirmPassword}
                onChange={(e) => {
                  setInputs({
                    ...inputs,
                    confirmPassword: e.target.value,
                  });
                }}
              />
            </label>

            <button className="btn btn-active btn-neutral w-full h-3">
              Sign In
            </button>

            <p>or</p>

            <button className="btn w-full">
              <FcGoogle />
              SignUp with Google
            </button>

            <Link to={"/login"} className="link link-primary text-sm">
              Sign In to your Account ?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
