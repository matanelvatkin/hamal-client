import { userContext } from "../../App";
import apiCalls from "../../assets/apiCalls";
import Button from "../Button";
import style from "./style.module.css";
import React, { useContext, useEffect, useState } from "react";

export default function AdminComponents() {
  const [allUsers, setAllUsers] = useState([]);
  const getUsers = async () => {
    const results = await apiCalls("get", "user/allusers");
    setAllUsers(results.data);
  };
  const updateActive = async (user) => {
    console.log(user);
    await apiCalls("put", "user/update", {
      fullName: user.fullName,
    });
    const results = await apiCalls("get", "user/allusers");
    setAllUsers(results.data);
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div>
      {allUsers.length > 0 &&
        allUsers.map((user) => (
          <div className={style.userDiv}>
            {user.fullName}
            <Button
              className={style.Button}
              type="button"
              text={user.isActive ? "נוכח" : "לא נוכח"}
              onClick={()=>{updateActive(user)}}
            />
          </div>
        ))}
    </div>
  );
}
