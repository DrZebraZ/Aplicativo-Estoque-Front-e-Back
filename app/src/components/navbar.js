import NavbarItem from "./navbaritem"
import React, { useEffect, useState } from 'react'
import { Navbar, Container, Nav } from "react-bootstrap"
function NavBar() {
  const [nomePagina, setNomePagina] = useState(window.location.pathname)

  function alteraEstilo(props) {
    if (props.nome === nomePagina) {
      return {
        backgroundColor: "white",
        color: "Black",
        textAlign: "center",
        border: "0.5px solid black",
        borderRadius: "10px",
        width: "120%",
        fontSize: 16,
        fontWeight: 900,
      }
    } else {
      return {
        fontSize: 16,
        color: "white"
      }
    }
  }
  return (
    <>
      <Navbar bg="primary" expand="sm">
        <Container fluid>
          <NavbarItem className="nav-link" href="/" label="Fabrica APP" style={alteraEstilo({ nome: "/" })}/>
          <Navbar.Toggle aria-controls="navbarScroll"/>
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px', textAlign: 'center' }}
              navbarScroll
            >
              <NavbarItem className="nav-link" href="/produto" label="Produto" style={alteraEstilo({ nome: "/produto" })} />
              <NavbarItem className="nav-link" href="/costureiro" label="Costureiros" style={alteraEstilo({ nome: "/costureiro" })} />
              <NavbarItem className="nav-link" href="/producao" label="Produção" style={alteraEstilo({ nome: "/producao" })} />
              <NavbarItem className="nav-link" href="/dados" label="Dados" style={alteraEstilo({ nome: "/dados" })} />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default NavBar
