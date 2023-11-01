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
        navigate('./')
      }
      catch(err){
      navigate("./");
      }
    };
    if (!localStorage.token) {
      setUser(false);
      navigate("./");
    } else if (localStorage.token && (user === "true" || !user)) go();
  }, []);
  return (
    <div className={style.layout}>
      <header className={style.header}>
        <Header />
      </header>
      <div className={style.main}>
        <Routes>
          <Route path="/" element={user?<HomePage />:<LoginPage/>} />
          <Route path="/*" element={user?<HomePage />:<LoginPage/>} />
          {<Route path="/admin" element={user&&user.role==='admin'?<AdminComponents />:<HomePage />} />}
        </Routes>
      </div>
    </div>
  );
}
