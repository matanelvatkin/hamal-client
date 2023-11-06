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
  const [popup, setPopup] = useState(
    (prev) => !(user.email !== undefined && user.email !== "")
  );
  const [err, setErr] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const nav = useNavigate();

  const updateEmail = async (e) => {
    e.preventDefault();
    if (pattern.test(passwordRef.current.value)) {
      await apiCalls("put", "user/updateemail", {
        user,
        password: passwordRef.current.value,
        email: emailRef.current.value.trim(),
      });
      setPopup(false);
    } else {
      setErr("בבקשה הכנס סיסמא באורך 8 תוים עם לפחות אות אחת ומספר אחד");
    }
  };
  return (
    <>
      {popup && (
        <div className={style.popup}>
          <p>עקב ביטחון המידע</p>
          <p> צריך לעדכן מייל וסיסמא</p>
          <form onSubmit={updateEmail} className={style.form}>
            <Input
              inputRef={emailRef}
              placeholder={"אימייל"}
              type={"text"}
              className={style.input}
            />
            <Input
              inputRef={passwordRef}
              placeholder={"סיסמא (8 תווים לפחות אות אחת ומספר אחד)"}
              type={"password"}
              pattern={pattern}
              className={style.input}
            />
            {err && <span className={style.error}>{err}</span>}
            <Button
              text={"עדכן"}
              type={"submit"}
              onClick={updateEmail}
              className={style.Button}
            />
          </form>
        </div>
      )}
      <div className={style.home_page}>
        <div>
          {(user.role === "admin" || user.role === "developer") && (
            <Button text="ניהול" onClick={() => nav("../admin")} />
          )}
          {user.role === "developer" && (
            <Button text="מפתח" onClick={() => nav("../dev")} />
          )}
        </div>
        <div className={style.user}>
          <UserComponents />
        </div>
      </div>
    </>
  );
}
