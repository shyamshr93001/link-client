import React, { useEffect } from "react";
import Header from "../components/common/Header";
import Login from "../components/home/Login";
import Register from "../components/home/Register";

const Home = () => {
  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <div>
      <Header />
      <div className="row mx-2">
        <div className="col-6">
          <h1>Topics Placeholder</h1>
        </div>
        <div className="col-6">
          <Login />
          <Register />
        </div>
      </div>
    </div>
  );
};

export default Home;
