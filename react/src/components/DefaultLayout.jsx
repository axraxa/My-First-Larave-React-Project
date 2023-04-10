import React, { useContext, useEffect } from "react";
import { Navigate, Outlet, Link } from "react-router-dom";
import { StateContext } from "../context";
import axiosClient from "../axios-client";

export default function DefaultLayout() {
  const { token, user, setUser, settingToken } = useContext(StateContext);
  if (!token) {
    return <Navigate to={"/login"} />;
  }
  useEffect(() => {
    axiosClient
      .get("/user")
      .then(({ data }) => {
        setUser(data);
      })
      .catch((err) => console.log(err));
  }, []);

  function onLogout(e) {
    e.preventDefault();

    axiosClient
      .post("/logout")
      .then((response) => {
        setUser(null);
        settingToken(null);
      })
      .catch((err) => console.log(err));
  }
  return (
    <div id="defaultLayout">
      <aside>
        <Link to={"/dashboard"}>Dashboard</Link>
        <Link to={"/users"}>Users</Link>
      </aside>
      <div className="content">
        <header>
          <div>Header</div>
          <div style={{ display: "flex", columnGap: "20px" }}>
            <div>{user?.name}</div>
            <div onClick={onLogout} style={{ cursor: "pointer" }}>
              Log Out
            </div>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
