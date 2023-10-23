import { userContext } from "../../App";
import apiCalls from "../../assets/apiCalls";
import Button from "../Button";
import Input from "../Input";
import style from "./style.module.css";
import React, { useContext, useEffect, useRef, useState } from "react";

export default function AdminComponents() {
  const [allUsers, setAllUsers] = useState([]);
  const addUserRef  =useRef()
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
  const adminAddUser = async (e) => {
    e.preventDefault()
    const results = await apiCalls("post","user/userfromadmin",{fullName:addUserRef.current.value})
    getUsers();
    addUserRef.current.value=''
  }
  return (
    <div>
      <form onSubmit={adminAddUser}>
      <Input placeholder='שם מלא' inputRef={addUserRef}/>
      <Button className={style.Button} type='submit' text="הוסף משתמש"/>
      </form>
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
