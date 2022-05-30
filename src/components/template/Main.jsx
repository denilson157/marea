import { useContext } from "react";
import { Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
// import { AppRoutes } from '../../routes'
import { AuthContext } from '../../contexts/auth';
import "./styles.css";

const Layout = (props) => {
  const { signOut, user } = useContext(AuthContext);

  const appBar = (
    <Navbar className="bg-default d-flex align-items-center">
      <Container fluid>
        <Navbar.Brand className="py-0" href="/home">
          Marea
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {
            !user &&
            <>
              <Link to="/login" className=' text-white text-decoration-none' >
                Fazer login
              </Link>
            </>
          }
          {
            user && <>
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
                <Link
                  to="/favorite_vehicles"
                  className="text-decoration-none"
                  style={{ color: "#F8F9FA" }}
                >
                  <span className="material-icons">favorite</span>
                </Link>
              </button>
              <button
                className="btn text-light cursor-pointer px-1"
                title="Editar Perfil"
              >
                <Link
                  to={user ? "/editUser" : "/login"}
                  className="text-decoration-none"
                  style={{ color: "#F8F9FA" }}
                >
                  <span className="material-icons">person</span>
                </Link>
              </button>

              <button className="btn text-light cursor-pointer px-1" title="Sair" onClick={signOut}>
                <span className="material-icons">logout</span>
              </button>
            </>
          }
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
