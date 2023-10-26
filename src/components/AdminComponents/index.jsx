import { useNavigate } from "react-router-dom";
import { userContext } from "../../App";
import apiCalls from "../../assets/apiCalls";
import Button from "../Button";
import Input from "../Input";
import style from "./style.module.css";
import React, { useContext, useEffect, useRef, useState } from "react";
import SelectInput from "../SelectInput";

export default function AdminComponents() {
  const [allUsers, setAllUsers] = useState([]);
  const [actives, setActives] = useState({ actives: 0, notActives: 0 });
  const [loader, setLoader] = useState("");
  const [delUserValue, setDelUserValue] = useState("");
  const [open, setOpen] = useState();
  const nav = useNavigate();
  const addUserRef = useRef();
  const getUsers = async () => {
    const results = await apiCalls("get", "user/allusers");
    changeActives(results.data);
    setAllUsers(results.data);
  };
  const changeActives = (usersArray = []) => {
    let actives = 0;
    let notActives = 0;
    if (usersArray.length > 0) {
      usersArray.forEach((user) => (user.isActive ? actives++ : notActives++));
      setActives({ actives, notActives });
    }
  };
  const updateActive = async (user) => {
    setLoader((prev) => user.fullName);
    await apiCalls("put", "user/update", {
      fullName: user.fullName,
    });
    const results = await apiCalls("get", "user/allusers");
    changeActives(results.data);
    setAllUsers((prev) => results.data);
  };
  const adminAddUser = async (e) => {
    e.preventDefault();
    console.log(addUserRef.current.value);
    if (addUserRef.current.value !== '') {
      await apiCalls("post", "user/userfromadmin", {
        fullName: addUserRef.current.value,
      });
      getUsers();
    } else alert("בבקשה הכנס שם");
    addUserRef.current.value = "";
  };

  const deleteUser = async (e) => {
    await apiCalls("put", "user/deleteuser", delUserValue)
    getUsers()
    setOpen(false);
  }
  useEffect(() => {
    if (loader) {
      setLoader("");
    }
  }, [allUsers]);
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className={style.main}>
      <Button text="דף הבית" onClick={() => nav("user")} />
      <Button
        text="הוסף משתמש"
        onClick={() =>
          setOpen((perv) => {
            if (perv === "addUser") return "";
            return "addUser";
          })
        }
      />
      {open === "addUser" && (
        <form className={style.form} onSubmit={adminAddUser}>
          <Input
            placeholder="שם מלא"
            inputRef={addUserRef}
            className={style.input_admin}
          />
          <Button className={style.Button} type="submit" text="הוסף משתמש" />
        </form>
      )}
      <Button
        text="טבלת משתמשים"
        onClick={() =>
          setOpen((perv) => {
            if (perv === "allUsers") return "";
            return "allUsers";
          })
        }
      />
      {open === "allUsers" && (
        <div>
          <span>נוכחים: {actives.actives}</span>{" "}
          <span> לא נוכחים: {actives.notActives}</span>
          {allUsers.length > 0 &&
            allUsers.map((user) => {
              return (
                <div key={user._id} className={style.userDiv}>
                  {user.fullName}
                  <Button
                    className={style.Button}
                    type="button"
                    text={
                      loader === user.fullName
                        ? "מעדכן"
                        : user.isActive
                        ? "נוכח"
                        : "לא נוכח"
                    }
                    style={
                      loader === user.fullName
                        ? { backgroundColor: "green" }
                        : user.isActive
                        ? { backgroundColor: "darkgrey" }
                        : { backgroundColor: "red" }
                    }
                    onClick={() => {
                      updateActive(user);
                    }}
                  />
                </div>
              );
            })}
        </div>
      )}
      <Button
        text="מחק משתמש"
        onClick={() =>
          setOpen((perv) => {
            if (perv === "deleteUser") return "";
            return "deleteUser";
          })
        }
      />
      {open === "deleteUser" && (
        <div className={style.deleteUserDiv}>
          <SelectInput
            options={allUsers.map((user) => {
              return { label: user.fullName, value: user };
            })}
            placeholder={"מחק משתמש"}
            setValues={(value) => {
              setDelUserValue(value)
            }}
          />
          <Button text='מחק' onClick={deleteUser} className={style.buttonDel}/>
        </div>
      )}
    </div>
  );
}
