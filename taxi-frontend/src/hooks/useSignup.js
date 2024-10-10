import React, { useState } from "react";
import toast from "react-hot-toast";
import { json } from "react-router-dom";

const useSignup = () => {
  const [loading, setLoading] = useState(false);

  const signup = ({ email, username, password, confirmPassword }) => {
    const success = handleInputErrors({
      email,
      username,
      password,
      confirmPassword,
    });
    if (!success) return;

    setLoading(true);

    // try {
    //   const res = await fetch("the backend url", {
    //     method: "POST",
    //     headers: { "Content-type": "application/json" },
    //     body: JSON.stringify({
    //       email,
    //       username,
    //       password,
    //       confirmPassword,
    //     }),
    //   });

    //   const response = await res.json();
    //   console.log(response);
    // } catch (error) {
    //   toast.error(error.message);
    // } finally {
    //   setLoading(false);
    // }
  };
  return { loading, signup };
};

export default useSignup;

function handleInputErrors({ email, username, password, confirmPassword }) {
  console.log(JSON.stringify({ email, username, password, confirmPassword }));

  if (!email?.trim() || !username?.trim() || !password || !confirmPassword) {
    toast.error("Please fill in all fields");
    console.log("EMPTY");

    return false;
  }

  //   email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  if (!validateEmail(email)) {
    toast.error("Invalid email format");
    return false;
  }

  //   password validation
  if (password !== confirmPassword) {
    console.log("not match");
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}
