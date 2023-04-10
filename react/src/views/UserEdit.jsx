import React, { useEffect, useState } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";

export default function UserEdit() {
  const navigate = useNavigate();
  const get = useParams();
  const userId = parseInt(get.id);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);

  const [user, setUser] = useState([]);

  useEffect(() => {
    if (userId) {
      axiosClient.get(`/singleuser/${userId}`).then(({ data }) => {
        setUser(data.data);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  function onSubmit(e) {
    e.preventDefault();
    if (userId) {
      axiosClient
        .patch(`/userupdate/${user.id}`, user)
        .then(() => {
          navigate("/users");
        })
        .catch((err) => setErrors(err.response.data.errors));
    } else {
      axiosClient
        .post("/createuser", user)
        .then(() => {
          navigate("/users");
        })
        .catch((err) => setErrors(err.response.data.errors));
    }
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      {user?.id && <h1>Update User: {user.name}</h1>}
      {!user?.id && <h1>New User</h1>}
      <div className="card animated fadeInDown">
        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}
        {!loading && (
          <form onSubmit={onSubmit}>
            <input
              value={user.name}
              onChange={(ev) => setUser({ ...user, name: ev.target.value })}
              placeholder="Name"
            />
            <input
              value={user.email}
              onChange={(ev) => setUser({ ...user, email: ev.target.value })}
              placeholder="Email"
            />
            <input
              type="password"
              onChange={(ev) => setUser({ ...user, password: ev.target.value })}
              placeholder="Password"
            />
            <input
              type="password"
              onChange={(ev) =>
                setUser({ ...user, password_confirmation: ev.target.value })
              }
              placeholder="Password Confirmation"
            />
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
  );
}
