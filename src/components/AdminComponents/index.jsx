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
  useEffect(()=>{
    getUsers()
  },[])
  return (
    <div className={style.main}>
      <form className={style.form} onSubmit={adminAddUser}>
      <Input placeholder='שם מלא' inputRef={addUserRef} className={style.input_admin}/>
      <Button className={style.Button} type='submit' text="הוסף משתמש"/>
      </form>
      {allUsers.length > 0 &&
        allUsers.map((user) => (
          <div key={user._id} className={style.userDiv}>
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
