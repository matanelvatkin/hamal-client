import { Route, Routes } from "react-router-dom";
import style from "./style.module.css";
import { useContext } from "react";
import { userContext } from "../../App";
import AdminComponents from "../../components/AdminComponents";
import UserComponents from "../../components/UserComponents";

export default function HomePage() {
  const {user} = useContext(userContext)
  return (
        <>
          <div>
          {user.role!=='admin'&&<UserComponents/>}
            {user.role==='admin'&&<AdminComponents/>}
          </div>
        </>
  );
}
