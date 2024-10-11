import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { signInWithEmailAndPasswordAuth } from "../utils/firebase.utils";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { authUser, setAuthUser } = useAuthContext();

  const login = async ({ email, password }) => {
    setLoading(true);

    try {
      // Firebase Authentication signing up for the first time
      const userCredential = await signInWithEmailAndPasswordAuth(
        email,
        password
      );
      const user = userCredential.user;
      // Check if the email has been verified
      if (!user.emailVerified) {
        throw new Error("Please verify your email before logging in.");
      }
      console.log("User signed in:", userCredential.user);

      // Get the Firebase ID token if sign-in was successful
      const idToken = await userCredential.user.getIdToken();

      const res = await fetch("/api/auth/login", {
        method: "Post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("user-info", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;
