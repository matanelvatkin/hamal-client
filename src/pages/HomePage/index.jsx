import { Route, Routes, useNavigate } from "react-router-dom";
import style from "./style.module.css";
import { useContext } from "react";
import { userContext } from "../../App";
import AdminComponents from "../../components/AdminComponents";
import UserComponents from "../../components/UserComponents";
import Button from "../../components/Button";

export default function HomePage() {
  const { user } = useContext(userContext);
  const nav = useNavigate();
  return (
    <>
      <div className={style.home_page}>
        {user.role === "admin" && (
          <Button text="ניהול" onClick={() => nav("../admin")} />
        )}
        <div className={style.user}>
          <UserComponents />
        </div>
      </div>
    </>
  );
}
