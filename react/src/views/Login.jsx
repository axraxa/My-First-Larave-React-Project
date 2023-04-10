import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { StateContext } from "../context";

export default function Login() {
  const { setUser, settingToken } = useContext(StateContext);
  const emailRef = useRef(0);
  const passwordRef = useRef(0);
  const [error, setError] = useState(null);

  function onSubmit(e) {
    e.preventDefault();
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        if (data.message) {
          setError(data.message);
          return;
        }
        setUser(data.user);
        settingToken(data.token);
      })
      .catch((err) => setError(err.response.data.message));
  }
  return (
    <form action="" onSubmit={onSubmit}>
      <h1 className="title">Log into your account</h1>
      {error && (
        <div className="alert">
          <p>{error}</p>
        </div>
      )}
      <input type="email" placeholder="Email" ref={emailRef} />
      <input type="password" placeholder="Password" ref={passwordRef} />
      <button type="submit" className="btn btn-block">
        Log In
      </button>
      <p className="message">
        Not Registered? <Link to={"/signup"}>Create An Account</Link>
      </p>
    </form>
  );
}
