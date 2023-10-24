import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../App";
import Button from "../Button";
import apiCalls from "../../assets/apiCalls";
import style from "./style.module.css";

export default function UserComponents() {
  const { user, setUser } = useContext(userContext);
  const [active, setActive] = useState();
  const [loader, setLoader] = useState(false);
  const updateActive = async () => {
    setLoader((prev) => !prev);
    const updateUser = await apiCalls("put", "user/update", {
      fullName: user.fullName,
    });
    setUser(updateUser.data);
  };
  useEffect(() => {
    setLoader((prev) => false);
    setActive(user.isActive);
  }, [user]);
  return (
    <div className={style.userDiv}>
      {user.fullName}
      <Button
        className={style.Button}
        type="button"
        text={
          loader
            ? "מעדכן"
            : user.isActive
            ? "נוכח"
            : "לא נוכח"
        }
        style={
          loader
            ? { backgroundColor: "green" }
            : user.isActive
            ? { backgroundColor: "darkgrey" }
            : { backgroundColor: "red" }
        }
        onClick={updateActive}
      />
    </div>
  );
}
