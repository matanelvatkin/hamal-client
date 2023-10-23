import style from './style.module.css'
import React from 'react'

export default function Button({text,onClick,...props}) {
  return (
    <button {...props} onClick={onClick}>{text}</button>
  )
}
