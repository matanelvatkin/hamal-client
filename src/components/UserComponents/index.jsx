import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../App";
import Button from "../Button";
import apiCalls from "../../assets/apiCalls";
import style from "./style.module.css"

export default function UserComponents() {
  const { user, setUser } = useContext(userContext);
  const [active, setActive] = useState();
  const updateActive = async () => {
    
    const updateUser = await apiCalls("put", "user/update", {
      fullName: user.fullName,
    });
    setUser(updateUser.data);
  };
  useEffect(()=>{
    setActive(user.isActive);
  },[user])
  return (
    <div className={style.userDiv}>
      {user.fullName}
      <Button
        className={style.Button}
        type="button"
        text={active ? "נוכח" : "לא נוכח"}
        onClick={updateActive}
      />
    </div>
  );
}