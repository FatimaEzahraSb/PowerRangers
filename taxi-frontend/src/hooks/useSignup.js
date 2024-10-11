import React, { useState } from "react";
import toast from "react-hot-toast";
import { json } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import {
  createUserWithEmailAndPasswordAuth,
  signInWithGooglePopup,
} from "../utils/firebase.utils";
import { sendEmailVerification } from "firebase/auth";

const useSignup = () => {
  const [loading, setLoading] = useState(false);

  const { authUser, setAuthUser } = useAuthContext();

  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    const user = response.user;
    // Extract email and username (displayName)
    const email = user.email;
    const username = user.displayName;
    const uid = user.uid;
    console.log(response.user);
    try {
      const res = await fetch("the backend url", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          email,
          username,
          uid,
        }),
      });

      const data = await res.json();
    } catch (error) {
      toast.error(error.message);
    }
  };

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
      // Firebase Authentication signing up for the first time
      const userCredential = await createUserWithEmailAndPasswordAuth(
        email,
        password
      );
      const user = userCredential.user;
      console.log("User signed in:", userCredential.user);

      // Get the Firebase ID token if sign-in was successful
      const idToken = await userCredential.user.getIdToken();

      // Send a verification email to the user
      await sendEmailVerification(user);
      console.log("Verification email sent");

      const res = await fetch("the backend url", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          email,
          username,
          password,
          confirmPassword,
        }),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      //if the user is signed in we add the user info to the localstorage
      localStorage.setItem("user-info", JSON.stringify(data));
      // we set it so that the entire app can access  the user's info
      setAuthUser(data);
      toast.success("A verification email has been sent to your email !");
    } catch (error) {
      // Check for specific error codes
      if (error.code === "auth/email-already-in-use") {
        console.error("Email is already in use");
        toast.error(
          "This email is already registered. Please use a different email or log in."
        );
      } else {
        console.error("Sign-up error:", error.message);
        toast.error(error.message); // Show the error message
      }
    } finally {
      setLoading(false);
    }
  };
  return { loading, signup, logGoogleUser };
};

export default useSignup;

function handleInputErrors({ email, username, password, confirmPassword }) {
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
