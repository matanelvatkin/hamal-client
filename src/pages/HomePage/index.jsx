import { Route, Routes } from "react-router-dom";
import style from "./style.module.css";
// import UserComponents from "../../components/userComponents";
import { useContext } from "react";
import { userContext } from "../../App";
import AdminComponents from "../../components/AdminComponents";

export default function HomePage() {
  const {user} = useContext(userContext)
  return (
        <>
          <div>
            {/* <UserComponents/> */}
            {user.role==='admin'&&<AdminComponents/>}
          </div>
        </>
  );
}
