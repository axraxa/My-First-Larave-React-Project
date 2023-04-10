import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [load, setLoad] = useState(true);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getUsers();
  }, []);
  function getUsers() {
    axiosClient
      .get("/users")
      .then(({ data }) => {
        setUsers(data.data);
        setLoad(false);
        let pageArray = [];
        for (var i = 1; i <= data.meta.last_page; i++) {
          pageArray.push(i);
        }
        setPages(pageArray);
      })
      .catch((err) => console.log(err));
  }
  // pagination functions
  function getPage(n) {
    axiosClient
      .get(`/users?page=${n}`)
      .then(({ data }) => {
        setUsers(data.data);
        setCurrentPage(n);
      })
      .catch((err) => console.log(err));
  }
  function prevPage() {
    if (currentPage == 1) {
      setCurrentPage(() => pages[pages.length - 1]);
    } else {
      setCurrentPage((prev) => prev - 1);
    }
    axiosClient
      .get(`/users?page=${currentPage}`)
      .then(({ data }) => {
        setUsers(data.data);
      })
      .catch((err) => console.log(err));
  }
  function nextPage() {
    if (currentPage == pages[pages.length - 1]) {
      setCurrentPage(() => 1);
    } else {
      setCurrentPage((prev) => prev + 1);
    }
    axiosClient
      .get(`/users?page=${currentPage}`)
      .then(({ data }) => {
        setUsers(data.data);
      })
      .catch((err) => console.log(err));
  }

  function onDeleteClick(user) {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }
    axiosClient
      .delete(`/userdelete/${user}`)
      .then(() => getUsers())
      .catch((err) => console.log(err));
  }
  if (load) {
    return <h1>Loading</h1>;
  }
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
        }}
      >
        <h1>Users</h1>
        <Link className="btn-add" to="/users/new">
          Add new
        </Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Create Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.created_at}</td>
                <td>
                  <Link className="btn-edit" to={`/users/${u.id}`}>
                    Edit
                  </Link>
                  &nbsp;
                  <button
                    className="btn-delete"
                    onClick={() => onDeleteClick(u.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <section className="Pagination" name="Buttons">
        <button onClick={() => prevPage()}> &lt; </button>
        {pages &&
          pages.map((num) => {
            return (
              <button onClick={() => getPage(num)} key={num}>
                {num}
              </button>
            );
          })}
        <button onClick={() => nextPage()}> &gt; </button>
      </section>
    </div>
  );
}
