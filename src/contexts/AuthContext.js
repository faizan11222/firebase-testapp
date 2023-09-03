import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../utils/init-firebase";
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { query, getDocs, collection, where, addDoc } from "firebase/firestore";

const AuthContext = createContext({
  currentUser: null,
  userData: null,
  signInWithGoogle: () => Promise,
  login: () => Promise,
  logout: () => Promise,
  fetchUser: () => Promise,
  createUser: () => Promise,
});

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user ? user : null);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    console.log("The user is", currentUser);
  }, [currentUser]);

  function logout() {
    setUserData(null)
    return signOut(auth);
  }

  function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  async function fetchUser(user) {
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    return await getDocs(q);
  }
  async function setingUser(user) {
    setUserData(user);
  }
  async function createUser(user) {
    return await addDoc(collection(db, "users"), {
      ...user,
    });
  }

  const value = {
    currentUser,
    userData,
    signInWithGoogle,
    fetchUser,
    createUser,
    logout,
    setingUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
