import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../../components/Login";
import Register from "../../components/Register";
import style from "./style.module.css";

export default function LoginPage() {
  return (
    <div className={style.loginPage}>
      <Routes>
        <Route path="/*" element={<Login/>} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}
