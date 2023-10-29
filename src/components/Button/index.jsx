import style from './style.module.css'
import React from 'react'

export default function Button({text,onClick,className = '',...props}) {
  return (
    <button {...props} className ={`${style.regularButton} ${className}`} onClick={onClick}>{text}</button>
  )
}
