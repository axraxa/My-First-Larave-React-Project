import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { StateContext } from "../context";

export default function Signup() {
  const { settingToken, setUser } = useContext(StateContext);
  const nameRef = useRef(0);
  const emailRef = useRef(0);
  const passwordRef = useRef(0);
  const confirmRef = useRef(0);

  const [errors, setErrors] = useState(null);

  function onSubmit(e) {
    e.preventDefault();
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: confirmRef.current.value,
    };

    axiosClient
      .post("/signup", payload)
      .then(({ data }) => {
        settingToken(data.token);
        setUser(data.user);
      })
      .catch((error) => {
        const err = error.response;
        if (err && err.status == 422) {
          setErrors(err.data.errors);
        }
      });
  }
  return (
    <form onSubmit={onSubmit}>
      <h1 className="title">Create your account</h1>
      {errors && (
        <div className="alert">
          {Object.keys(errors).map((error) => {
            return <p> {errors[error][0]}</p>;
          })}
        </div>
      )}
      <input ref={nameRef} type="text" name="" placeholder="Full Name" />
      <input ref={emailRef} type="email" name="" placeholder="Email" />
      <input ref={passwordRef} type="password" name="" placeholder="Password" />
      <input
        ref={confirmRef}
        type="password"
        name=""
        placeholder="Confirm Passworod"
      />
      <button type="submit" className="btn btn-block">
        Register
      </button>
      <p className="message">
        Already Have an Account? <Link to={"/login"}>Sign in</Link>
      </p>
    </form>
  );
}
