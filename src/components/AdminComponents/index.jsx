import { useNavigate } from "react-router-dom";
import { userContext } from "../../App";
import apiCalls from "../../assets/apiCalls";
import Button from "../Button";
import Input from "../Input";
import style from "./style.module.css";
import React, { useEffect, useRef, useState } from "react";
import SelectInput from "../SelectInput";

export default function AdminComponents() {
  const [allUsers, setAllUsers] = useState([]);
  const [actives, setActives] = useState({ actives: 0, notActives: 0 });
  const [loader, setLoader] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [allPosition, setAllPosition] = useState([]);
  const [selectedPositionUser, setSelectedPositionUser] = useState({
    position: "",
  });
  const [open, setOpen] = useState();
  const nav = useNavigate();
  const addUserRef = useRef();
  const addPositionNameRef = useRef();
  const addPositionNumberRef = useRef();

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
    if (addUserRef.current.value !== "") {
      await apiCalls("post", "user/userfromadmin", {
        fullName: addUserRef.current.value.trim(),
      });
      getUsers();
    } else alert("בבקשה הכנס שם");
    addUserRef.current.value = "";
  };

  const deleteUser = async (e) => {
    await apiCalls("put", "user/deleteuser", selectedValue);
    getUsers();
    setOpen(false);
  };
  const createAdmin = async () => {
    await apiCalls("put", "user/crateadmin", selectedValue);
    getUsers();
    setOpen(false);
  };
  const getPositions = async (e) => {
    const results = await apiCalls("get", "position/allpositions");
    setAllPosition(results.data);
  };
  const addPosition = async (e) => {
    e.preventDefault();
    if (addPositionNameRef.current.value !== "") {
      await apiCalls("post", "position/addposition", {
        name: addPositionNameRef.current.value,
        positionNumber: addPositionNumberRef.current.value,
      });
      getPositions();
    } else alert("בבקשה הכנס שם עמדה");
    addPositionNameRef.current.value = "";
    addPositionNumberRef.current.value = "";
  };
  const deletePosition = async () => {
    await apiCalls("put", "position/deleteposition", selectedValue);
    getPositions();
    setOpen(false);
  };
  const addPositionToUser = async (e) => {
    setLoader("connectUserToPosition");
    const results = await apiCalls("put", "user/addposition", {
      position: selectedPositionUser.position,
      user: selectedPositionUser.user,
    });
    getUsers();
  };

  const onClickOpen = (e) => {
    setOpen(e.target.name);
  };
  useEffect(() => {
    if (loader) {
      setLoader("");
    }
  }, [allUsers]);
  useEffect(() => {
    getUsers();
    getPositions();
  }, []);
  return (
    <>
      {open ? (
        <div className={style.popup}>
          <Button
            text="x"
            onClick={() => {
              setOpen();
            }}
            className={style.exitPopup}
          />
          <div className={style.mainPopup}>
            {
              [
                {
                  name: "addUser",
                  html: (
                    <form className={style.form} onSubmit={adminAddUser}>
                      <Input
                        placeholder="שם מלא"
                        inputRef={addUserRef}
                        className={style.input_admin}
                      />
                      <Button
                        className={style.Button}
                        type="submit"
                        text="הוסף משתמש"
                      />
                    </form>
                  ),
                },
                {
                  name: "allUsers",
                  html: (
                    <div>
                      <span>נוכחים: {actives.actives}</span>{" "}
                      <span> לא נוכחים: {actives.notActives}</span>
                        {allUsers.length > 0 &&
                          allUsers.map((user) => {
                            return (
                              <div key={user._id} className={style.userDiv}>
                                <span className={style.userName}>{user.fullName}</span>
                                <span className={style.userPosition}>{user?.position?.name}</span>
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
                                      ? { backgroundColor: "darkgrey" }
                                      : user.isActive
                                      ? { backgroundColor: "green" }
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
                  ),
                },
                {
                  name: "deleteUser",
                  html: (
                    <div className={style.deleteUserDiv}>
                      <SelectInput
                        options={allUsers.map((user) => {
                          return { label: user.fullName, value: user };
                        })}
                        placeholder={"מחק משתמש"}
                        setValues={(value) => {
                          setSelectedValue(value);
                        }}
                        className={style.SelectInput}
                      />
                      <Button
                        text="מחק"
                        onClick={deleteUser}
                        className={style.Button}
                      />
                    </div>
                  ),
                },
                {
                  name: "createAdmin",
                  html: (
                    <div className={style.deleteUserDiv}>
                      <SelectInput
                        options={allUsers.map((user) => {
                          return { label: user.fullName, value: user };
                        })}
                        placeholder={"בחר משתמש"}
                        setValues={(value) => {
                          setSelectedValue(value);
                        }}
                      />
                      <Button
                        text={
                          selectedValue.role === "admin"
                            ? "הסר מניהול"
                            : "הגדר כמנהל"
                        }
                        onClick={createAdmin}
                        className={style.Button}
                      />
                    </div>
                  ),
                },
                {
                  name: "addPosition",
                  html: (
                    <div>
                      <form
                        className={style.form_add_position}
                        onSubmit={addPosition}
                      >
                        <Input
                          placeholder="שם"
                          inputRef={addPositionNameRef}
                          className={style.input_admin}
                        />
                        <Input
                          placeholder="מספר"
                          inputRef={addPositionNumberRef}
                          className={style.input_admin}
                        />
                        <Button
                          className={style.Button}
                          type="submit"
                          text="הוסף עמדה"
                        />
                      </form>
                      {allPosition.length > 0 &&
                        allPosition.map((position) => {
                          return (
                            <div key={position._id} className={style.userDiv}>
                              <span>{position.name}</span>
                              <span>{position.positionNumber}</span>
                            </div>
                          );
                        })}
                    </div>
                  ),
                },
                {
                  name: "deletePosition",
                  html: (
                    <div className={style.deleteUserDiv}>
                      <SelectInput
                        options={allPosition.map((position) => {
                          return { label: position.name, value: position };
                        })}
                        placeholder={"מחק עמדה"}
                        setValues={(value) => {
                          setSelectedValue(value);
                        }}
                      />
                      <Button
                        text="מחק"
                        onClick={deletePosition}
                        className={style.Button}
                      />
                    </div>
                  ),
                },
                {
                  name: "addUserToPosistion",
                  html: (
                    <div className={style.connect_user_positions}>
                      <SelectInput
                        options={allPosition.map((position) => {
                          return { label: position.name, value: position };
                        })}
                        placeholder={"עמדה"}
                        setValues={(value) => {
                          setSelectedPositionUser((perv) => {
                            return { ...perv, position: value };
                          });
                        }}
                      />
                      <SelectInput
                        options={allUsers.map((user) => {
                          return { label: user.fullName, value: user };
                        })}
                        placeholder={"משתמש"}
                        setValues={(value) => {
                          setSelectedPositionUser((perv) => {
                            return { ...perv, user: value };
                          });
                        }}
                      />
                      <Button
                        text={loader ? "מצוות" : "צוות"}
                        style={
                          loader === "connectUserToPosition"
                            ? { backgroundColor: "green" }
                            : { backgroundColor: "darkgrey" }
                        }
                        onClick={addPositionToUser}
                        className={style.Button}
                      />
                    </div>
                  ),
                },
              ].find((element) => {
                if (element.name === open) {
                  return true;
                } else false;
              }).html
            }
          </div>
        </div>
      ) : null}
      <div className={style.main}>
        <Button
          text="דף הבית"
          onClick={() => nav("../")}
          className={style.adminButton}
        />
        <Button
          text="הוסף משתמש"
          onClick={onClickOpen}
          className={style.adminButton}
          name="addUser"
        />
        <Button
          text="טבלת משתמשים"
          onClick={onClickOpen}
          className={style.adminButton}
          name={"allUsers"}
        />
        <Button
          text="מחק משתמש"
          onClick={onClickOpen}
          className={style.adminButton}
          name="deleteUser"
        />
        <Button
          text="הגדר/הסר כמנהל"
          onClick={onClickOpen}
          name="createAdmin"
          className={style.adminButton}
        />
        <Button
          text="הוסף עמדה"
          onClick={onClickOpen}
          name="addPosition"
          className={style.adminButton}
        />
        <Button
          text="מחק עמדה"
          onClick={onClickOpen}
          name="deletePosition"
          className={style.adminButton}
        />
        <Button
          text="ציוות משתמש לעמדה"
          onClick={onClickOpen}
          name="addUserToPosistion"
          className={style.adminButton}
        />
      </div>
    </>
  );
}
