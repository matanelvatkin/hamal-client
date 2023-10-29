import React, { createContext, useState } from "react";
import style from "./style.module.css";
import Header from "../components/Header";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import { useContext } from "react";
import { userContext } from "../App";
import { useEffect } from "react";
import apiCalls from "../assets/apiCalls";
import HomePage from "../pages/HomePage";
import AdminComponents from "../components/AdminComponents";

export default function Layout() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(userContext);

  useEffect(() => {
    const go = async () => {
      try{
        const results = await apiCalls("get", "user");
        setUser(results.data);
        navigate('./home')
      }
      catch(err){
      navigate("./login");
      }
    };
    if (!localStorage.token) {
      setUser(false);
      navigate("./login");
    } else if (localStorage.token && (user === "true" || !user)) go();
  }, []);
  return (
    <div className={style.layout}>
      <header className={style.header}>
        <Header />
      </header>
      <div className={style.main}>
        <Routes>
          <Route path="./login" element={<LoginPage />} />
          {user&&<Route path="/admin" element={<AdminComponents />} />}
          {user&&<Route path="*" element={<HomePage />} />}
        </Routes>
      </div>
    </div>
  );
}
