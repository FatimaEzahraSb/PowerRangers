import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async ({ email, password }) => {
    setLoading(true);

    try {
      // Envoi des données de connexion à l'API backend (Auth_api)
      const res = await fetch("http://127.0.0.1:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Si la connexion réussit, on enregistre les infos de l'utilisateur
        localStorage.setItem("user-info", JSON.stringify(data));
        setAuthUser(data); // On stocke les infos utilisateur dans le contexte global
        toast.success("Login successful!");
      } else {
        throw new Error(data.error || "Login failed");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;
