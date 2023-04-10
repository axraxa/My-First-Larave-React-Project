import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { StateContext } from "../context";

export default function GuestLayout() {
  const { user, token } = useContext(StateContext);
  if (token) {
    return <Navigate to={"/users"} />;
  }
  return (
    <div>
      <div className="login-signup-form animated fadeInDown">
        <div className="form">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
