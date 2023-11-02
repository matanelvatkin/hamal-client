import style from "./style.module.css";
import React, { useContext } from "react";
import { useRef } from "react";
import Input from "../Input";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import apiCalls from "../../assets/apiCalls";
import { userContext } from "../../App";

function Login() {
  const { setUser } = useContext(userContext);
  const userFullName = useRef();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await apiCalls("post", "user/login", {
      fullName: userFullName.current.value,
    });
    if (data) {
      localStorage.token = data.data.token;
      setUser(data.data.user);
      navigate("../");
    } else alert(data);
  };
  const forgetPassword = () => {
    navigate("../forgotPassword");
  };
  return (
    <div className={style.formLoginContainer}>
      <form className={style.formLogin} onSubmit={handleSubmit}>
        <h2 className={style.header}>LOGIN</h2>
        <Input
          className={style.inputLogin}
          type="fullName"
          name="input"
          placeholder="שם מלא"
          required={true}
          inputRef={userFullName}
        />
        <div className={style.login_buttons}>
          <Button
            text={"שכחחתי סיסמא"}
            onClick={forgetPassword}
            type={"button"}
            className={style.forgetPassword_button}
          />
          <Button type="submit" className={style.login_button} text="היכנס" />
        </div>
      </form>
    </div>
  );
}

export default Login;
