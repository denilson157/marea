import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
// import { AppRoutes } from '../../routes'
import "./styles.css";

const Layout = (props) => {
  const appBar = (
    <Navbar className="bg-default d-flex align-items-center">
      <Container fluid>
        <Navbar.Brand className="py-0" href="#home">
          Marea
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <button
            className="btn text-light cursor-pointer px-1"
            title="Meus Veículos"
          >
            <Link
              to="/vehicles"
              className="text-decoration-none"
              style={{ color: "#F8F9FA" }}
            >
              <span className="material-icons">directions_car</span>
            </Link>
          </button>
          <button
            className="btn text-light cursor-pointer px-1"
            title="Favoritos"
          >
            <span className="material-icons">favorite</span>
          </button>
          <button
            className="btn text-light cursor-pointer px-1"
            title="Editar Perfil"
          >
            <span className="material-icons">person</span>
          </button>
          <button className="btn text-light cursor-pointer px-1" title="Sair">
            <span className="material-icons">logout</span>
          </button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );

  return (
    <>
      <div>
        {appBar}
        <main>
          <div>{props.children}</div>
        </main>
      </div>
    </>
  );
};

export default Layout;
