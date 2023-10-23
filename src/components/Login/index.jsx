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
    localStorage.token = data.data.token;
    setUser(data.data.user);
    navigate("../home");
  };
  return (
    <div className={style.formLoginContainer}>
      <form className={style.formLogin} onSubmit={handleSubmit}>
        <h2 className={style.header}>LOGIN</h2>
        <Input
          className={style.inputLogin}
          type="fullName"
          name="input"
          placeholder="fullName"
          required={true}
          inputRef={userFullName}
        />
        <div className={style.login_buttons}>
          <Button type="submit" className={style.login_button} text="login" />
          <Button
            type="text"
            className={style.login_button}
            text="register"
            onClick={() => navigate("./register")}
          />
        </div>
      </form>
    </div>
  );
}

export default Login;
