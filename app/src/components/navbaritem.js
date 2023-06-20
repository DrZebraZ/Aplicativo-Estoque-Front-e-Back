import React from 'react'
import { NavLink } from 'react-router-dom'

export default function NavbarItem(props) {
  return (
    <div className="nav" style={{ color:"black", textAlign: "center"}} >
      <NavLink className={props.className} to={props.href} style={props.style} >
          <b color="white">{props.label}</b>
        </NavLink>
    </div>
  )
}