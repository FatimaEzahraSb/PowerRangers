import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);

  const { setAuthUser } = useAuthContext();

  const signup = async ({ email, username, password, confirmPassword }) => {
    const success = handleInputErrors({
      email,
      username,
      password,
      confirmPassword,
    });
    if (!success) return;

    setLoading(true);

    try {
      // Envoi des données d'inscription à l'API backend (users_api)
      const res = await fetch("http://127.0.0.1:5001/users/register", {
        method: "POST", // Route d'inscription (POST)
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          password,
        }),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        // Si l'inscription réussit, on enregistre les infos de l'utilisateur
        localStorage.setItem("user-info", JSON.stringify(data));
        setAuthUser(data); // On stocke les infos utilisateur dans le contexte global
        toast.success("User registered successfully!");
      } else {
        throw new Error(data.error || "Signup failed");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;

function handleInputErrors({ email, username, password, confirmPassword }) {
  if (!email?.trim() || !username?.trim() || !password || !confirmPassword) {
    toast.error("Please fill in all fields");
    return false;
  }

  // Validation de l'email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  if (!validateEmail(email)) {
    toast.error("Invalid email format");
    return false;
  }

  // Validation des mots de passe
  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}
