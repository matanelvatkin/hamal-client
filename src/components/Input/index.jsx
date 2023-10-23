import style from './style.module.css'
import React from 'react'

export default function Input({type,placeholder,className,inputRef,...props}) {
  return (
    <>
        <input type ={type} placeholder={placeholder} className={className} ref={inputRef} {...props}/>
    </>
  )
}
