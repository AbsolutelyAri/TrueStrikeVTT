import React from 'react'
import './Button.css';


const Button = ({text, onClick}) => {
  return (
    <button className="rounded-button" onClick={onClick}>
        {text}
    </button>
  )
}

export default Button