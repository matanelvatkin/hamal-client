import React, { useRef, useState } from "react";
import apiCalls from "../../assets/apiCalls";
import { useNavigate } from "react-router-dom";
import style from "./style.module.css";
import Button from "../Button";
import Input from "../Input";


export default function RestPassword() {
  const nav = useNavigate();
  const userFullName = useRef();
  const passwordRef = useRef();
  const codeRef = useRef();
  const emailRef = useRef();
  const [page, setPage] = useState(1);
  const [codeFromEmail, setCdeFromEmail] = useState();
  const [userName, setUserName] = useState();
  const [err, setErr] = useState(false);
  const pattern =/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  const sendMail = async (e) => {
    e.preventDefault();
    const code = await apiCalls("put", "user/forgetpassword", {
      email: emailRef.current.value.trim(),
      fullName: userFullName.current.value.trim(),
    });
    setUserName(userFullName.current.value)
    setPage(2);
    setCdeFromEmail(code.data);
  };

  const checkCode = (e) => {
    e.preventDefault();
    if (codeFromEmail.code == codeRef.current.value) {
      setErr(false)
      setPage(3);
    } else {
      setErr(true);
    }
  };
  const resetPasswords = async (e) => {
    e.preventDefault();
    if(pattern.test(passwordRef.current.value)){
      await apiCalls("put", "user/updatepassword", {
        fullName: userName.trim(),
        password: passwordRef.current.value,
      });
      console.log('reset password');
    }
    else{
      setErr('בבקשה הכנס סיסמא באורך 8 תוים עם לפחות אות אחת ומספר אחד')
    }
    nav('../login')
  };

  return (
    <>
      {page === 1 && (
        <div className={style.formLoginContainer}>
          <form className={style.formLogin} onSubmit={sendMail}>
            <h5 className={style.header}>איפוס סיסמא</h5>
            <Input
              className={style.inputLogin}
              type="fullName"
              name="input"
              placeholder="שם מלא"
              required={true}
              inputRef={userFullName}
            />
            <Input
              className={style.inputLogin}
              type="fullName"
              name="input"
              placeholder="אימייל"
              required={true}
              inputRef={emailRef}
            />
            <div className={style.login_buttons}>
              <Button
                type="button"
                className={style.login_button}
                onClick={sendMail}
                text="הבא"
              />
            </div>
          </form>
        </div>
      )}
      {page === 2 && (
        <div className={style.formLoginContainer}>
          <form className={style.formLogin} onSubmit={checkCode}>
            <h5 className={style.header}>איפוס סיסמא</h5>
            <Input
              className={style.inputLogin}
              type="text"
              name="code"
              placeholder="קוד מהאימייל"
              required={true}
              inputRef={codeRef}
            />
            {err && <div className={style.error}>הקוד לא נכון, בבקשה תבדוק שוב את האימייל שלך</div>}
            <div className={style.login_buttons}>
              <Button
                type="button"
                className={style.login_button}
                onClick={checkCode}
                text="הבא"
              />
            </div>
          </form>
        </div>
      )}
      {page === 3 && (
        <div className={style.formLoginContainer}>
          <form className={style.formLogin} onSubmit={resetPasswords}>
            <h5 className={style.header}>איפוס סיסמא</h5>
            <Input
              className={style.inputLogin}
              type="password"
              name="password"
              placeholder={"סיסמא חדשה (8 תווים לפחות אות אחת ומספר אחד)"}
              pattern={pattern}
              required={true}
              inputRef={passwordRef}
            />
            {err&&<span className={style.error}>{err}</span>}
            <div className={style.login_buttons}>
              <Button
                type="button"
                className={style.login_button}
                onClick={resetPasswords}
                text="עדכן"
              />
            </div>
          </form>
        </div>
      )}
    </>
  );
}
