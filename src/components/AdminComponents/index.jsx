import { userContext } from "../../App";
import apiCalls from "../../assets/apiCalls";
import Button from "../Button";
import Input from "../Input";
import style from "./style.module.css";
import React, { useContext, useEffect, useRef, useState } from "react";

export default function AdminComponents() {
  const [allUsers, setAllUsers] = useState([]);
  const [actives, setActives] = useState({actives:0,notActives:0});
  const [loader,setLoader] = useState({fullName:''})
  const addUserRef  =useRef()
  const getUsers = async () => {
    const results = await apiCalls("get", "user/allusers");
    changeActives(results.data)
    setAllUsers(results.data);
  };
  const changeActives=(usersArray=[])=>{
    let actives = 0
    console.log(usersArray);
    let notActives =0
    if (usersArray.length > 0) {
      usersArray.forEach(user =>user.isActive?actives++:notActives++);
      setActives({actives,notActives})
    }
  }
  const updateActive = async (user) => {
    setLoader(prev=>user)
    await apiCalls("put", "user/update", {
      fullName: user.fullName,
    });
    const results = await apiCalls("get", "user/allusers");
    changeActives(results.data)
    setAllUsers(prev=>results.data);
  };
  const adminAddUser = async (e) => {
    e.preventDefault()
    const results = await apiCalls("post","user/userfromadmin",{fullName:addUserRef.current.value})
    getUsers();
    addUserRef.current.value=''
  }
  useEffect(()=>{
    console.log(loader);
    if(loader.fullName){
      setLoader({fullName:''})
    }
  },[allUsers])
  useEffect(()=>{
    getUsers()
  },[])
  return (
    <div className={style.main}>
      <form className={style.form} onSubmit={adminAddUser}>
      <Input placeholder='שם מלא' inputRef={addUserRef} className={style.input_admin}/>
      <Button className={style.Button} type='submit' text="הוסף משתמש"/>
      </form>
      <div><span>נוכחים: {actives.actives}</span>  <span> לא נוכחים: {actives.notActives}</span></div>
      {allUsers.length > 0 &&
        allUsers.map((user) => {
          return <div key={user._id} className={style.userDiv}>
          {user.fullName}
          <Button
          className={style.Button}
          type="button"
          text={loader.fullName===user.fullName?'מעדכן':user.isActive ? "נוכח" : "לא נוכח"}
          style={loader.fullName===user.fullName?{backgroundColor:'green'}:user.isActive?{backgroundColor:'darkgrey'}:{backgroundColor:'red'}}
          onClick={()=>{updateActive(user)}}
          />
          </div>
        }
        )}
    </div>
  );
}
