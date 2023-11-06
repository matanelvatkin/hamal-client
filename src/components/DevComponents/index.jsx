import { useNavigate } from "react-router-dom";
import { userContext } from "../../App";
import apiCalls from "../../assets/apiCalls";
import Button from "../Button";
import style from "./style.module.css";
import React, { useContext, useEffect, useRef, useState } from "react";
import Input from "../Input";

export default function DevComponents() {
  const [organizations, setOrganizations] = useState([]);
  const [open, setOpen] = useState();
  const { user, setUser } = useContext(userContext);
  const orgNameRef = useRef();
  const orgCityRef = useRef();
  const nav = useNavigate();
  const getOrgs = async () => {
    const res = await apiCalls("get", "organization/allorganizations");
    setOrganizations(res.data);
  };
  const adminAddOrg = async (e) => {
    e.preventDefault();
    if (orgNameRef.current.value !== "") {
      await apiCalls("post", "organization/addorganization", {
        name: orgNameRef.current.value.trim(),
        city: orgCityRef.current.value.trim(),
      });
      getOrgs();
      setOpen(false);
    } else alert("בבקשה הכנס שם");
    addUserRef.current.value = "";
  };
  const nevToOrg = (organization) => {
    setUser({ ...user, organization: organization });
    nav("./manger");
  };
  useEffect(() => {
    getOrgs();
  }, []);
  return (
    <>
      {open && (
        <div className={style.popup}>
          <Button
            text="x"
            onClick={() => {
              setOpen(false);
            }}
            className={style.exitPopup}
          />
          <div className={style.mainPopup}>
            <form className={style.form} onSubmit={adminAddOrg}>
              <Input
                placeholder="שם"
                inputRef={orgNameRef}
                className={style.input_admin}
              />
              <Input
                placeholder="עיר"
                inputRef={orgCityRef}
                className={style.input_admin}
              />
              <Button
                className={style.Button}
                type="submit"
                text="הוסף משתמש"
              />
            </form>
          </div>
        </div>
      )}
      <div className={style.main}>
        {organizations.map((organization) => (
          <Button
            key={organization._id}
            text={organization.name}
            className={style.adminButton}
            onClick={() => {
              nevToOrg(organization._id);
            }}
          />
        ))}
        <Button
          text="אוסף עוד אירגון"
          className={style.adminButton}
          onClick={() => setOpen(true)}
        />
      </div>
    </>
  );
}
