import { Route, Routes, useNavigate } from "react-router-dom";
import style from "./style.module.css";
import { useContext, useRef, useState } from "react";
import { userContext } from "../../App";
import AdminComponents from "../../components/AdminComponents";
import UserComponents from "../../components/UserComponents";
import Button from "../../components/Button";
import apiCalls from "../../assets/apiCalls";
import Input from "../../components/Input";

export default function HomePage() {
  const { user } = useContext(userContext);
  const [popup, setPopup] = useState(user.email === (undefined || ""));
  const emailRef = useRef();
  const passwordRef = useRef();
  const nav = useNavigate();

  const updateEmail = async (e) => {
    e.preventDefault();
    const results = await apiCalls("put", "user/updateemail", {
      user,
      password: passwordRef.current.value,
      email: emailRef.current.value,
    });
    console.log(results);
    setPopup(false);
  };
  return (
    <>
      {popup && (
        <div className={style.popup}>
          <p>עקב ביטחות המידע צריך לעדכן מייל וסיסמא תודה</p>
          <form onSubmit={updateEmail}></form>
          <Input inputRef={emailRef} placeholder={"אימייל"} type={"text"} />
          <Input
            inputRef={passwordRef}
            placeholder={"סיסמא (8 תווים לפחות אות אחת ומספר אחד)"}
            type={"password"}
            pattern='"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"'
          />
          <Button text={"עדכן"} type={"submit"} onClick={updateEmail} />
        </div>
      )}
      <div className={style.home_page}>
        {user.role === "admin" && (
          <Button text="ניהול" onClick={() => nav("../admin")} />
        )}
        <div className={style.user}>
          <UserComponents />
        </div>
      </div>
    </>
  );
}
