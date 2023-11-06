import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import apiCalls from "../../assets/apiCalls";


export default function Header({user=''} ) {
  const [organization,setOrganization] = useState()
  const go =async ()=>{
    const res = await apiCalls('get', 'organization')
    setOrganization(res.data)
  }
  useEffect(()=>{
    if(user!=='') {
      go()
    }
  },[user])
  return (
    <div className={style.main_header}>
      <span>חמ״ל {organization?organization.name:''}</span>
     <img src={organization?organization.logo:'logo.png'} alt="logo" />
    </div>
  );
}
