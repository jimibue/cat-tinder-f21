import React, { useState } from "react";
import axios from "axios";

export const AuthContext = React.createContext();

// probably wont use this (using useContext hook instead )
export const AuthConsumer = AuthContext.Consumer;

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const wait = (ms) => {
    return new Promise((res, rej) => {
      // waiting to seconds to resolve
      setTimeout(() => {
        res("yo");
      }, ms);
    });
  };

  const handleRegister = async (user, history) => {
    console.log("regsiter user:", user);
    // so axios call now
    try {
      setError(null);
      setLoading(true);
      // want to do after loadin set to true so I can the spinner
      // REMOVE IN PRODUCTION JUST FOR TESTING SPINNER
      // this going add 4 seconds to my register call
      // await wait(4000);
      let res = await axios.post("/api/auth", user);
      console.log(res);
      setUser(res.data.data);
      history.push("/");
    } catch (err) {
      // want to handle this in your UI for you sake
      setError(
        err.response.data.errors ? err.response.data.errors : err.response.data
      );
      // setError(err.response.data.errors.full_messages);
    } finally {
      setLoading(false);
    }
  };
  const handleLogin = async (user, history) => {
    console.log("login user,user", user);
    // so axios call now
    try {
      let res = await axios.post("/api/auth/sign_in", user);
      console.log(res);
      setUser(res.data.data);
      history.push("/");
    } catch (err) {
      // will hit catch if user is not db, bad usename or password
      // coundn't find email...
      alert("unsuccessful login check console check username or password");
      console.log(err);
      console.log(err.response);
    }
  };
  const handleLogout = (history) => {
    console.log("logout user");
    setUser(null);
    // remove the access from local storage.
    localStorage.removeItem("access-token");
    history.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        loading,
        setError,
        handleRegister,
        handleLogin,
        handleLogout,
        setUser,
        authenticated: user ? true : false,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
