import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Image, NavDropdown, Dropdown } from "react-bootstrap";
import { useHistory, useLocation } from "react-router";
import { FaUserAlt, FaPhoneAlt, FaShoppingCart } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href="/#"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    className="d-flex justify-content-center align-items-center"
  >
    <FaUserAlt className="mr-1" />
    {children}
  </a>
));
const NavBar = ({ cartTotalQty }) => {
  const NavData = [
    {
      id: 1,
      url: "/",
      text: "home",
    },
    {
      id: 2,
      url: "/about",
      text: "about",
    },
    {
      id: 3,
      url: "/menu",
      text: "menu",
    },
    {
      id: 4,
      url: "/contact",
      text: "contact",
    },
    {
      id: 5,
      url: "/cart",
      text: (
        <div className="position-relative ">
          <FaShoppingCart />
          <span className="badge cart-icon-badge">{cartTotalQty}</span>
        </div>
      ),
    },
  ];
  const location = useLocation();
  const user = localStorage.getItem("user");
  const history = useHistory();
  const logout = () => {
    localStorage.removeItem("user");
    history.push("/");
    history.go(0);
  };
  return (
    <>
      <div className="header-menu d-none d-md-block">
        <ul>
          <li className="ml-3 d-flex align-items-center justify-content-center">
            {user === null ? (
              <>
                <FaUserAlt className="mr-1" />
                <Link to="/login" className="mr-2">
                  Log in
                </Link>
                <Link to="/signup">Sign up</Link>
              </>
            ) : (
              <Dropdown>
                <Dropdown.Toggle
                  as={CustomToggle}
                  id="dropdown-custom-components"
                >
                  Account
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item eventKey="1" href="/profile">
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="2" href="/profile/orders">
                    Orders
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="3" onClick={logout}>
                    Log out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </li>
          <li className="mx-3 d-flex align-items-center justify-content-center">
            <MdLocationOn className="mr-1" /> 514 S. Magnolia St. Orlando, FL
            32806
          </li>
          <li className="mx-3 d-flex align-items-center justify-content-center">
            <FaPhoneAlt className="mr-1" /> +1 718-999-3939
          </li>
        </ul>
      </div>
      <Navbar bg="light" expand="lg" sticky="top" className="header-nav">
        <Navbar.Brand href="/" className="m-0">
          <Image
            responsive="true"
            src={process.env.PUBLIC_URL + "/logo-198x66.png"}
            alt="logo"
            className="nav-img"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="text-capitalize">
            {NavData.map((item) => {
              const { id, url, text } = item;
              return (
                <Nav.Link
                  key={id}
                  href={url}
                  className={
                    `mx-2 font-weight-bold d-flex align-items-center justify-content-md-center ` +
                    (id === 5 ? `cart-icon ` : ``) +
                    (url === location.pathname ? "nav-link-active " : "")
                  }
                >
                  {text}
                </Nav.Link>
              );
            })}
            {user === null ? (
              <React.Fragment>
                <Nav.Link
                  href="/login"
                  className="mx-2 font-weight-bold d-md-none d-flex align-items-center justify-content-md-center"
                >
                  Log in
                </Nav.Link>
                <Nav.Link
                  href="/login"
                  className="mx-2 font-weight-bold d-flex d-md-none align-items-center justify-content-md-center"
                >
                  Log out
                </Nav.Link>
              </React.Fragment>
            ) : (
              <NavDropdown
                title="Account"
                id="basic-nav-dropdown"
                className="dropdown-sm d-md-none  mx-2 font-weight-bold d-flex flex-column align-items-start"
              >
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="/profile/orders">
                  Orders
                </NavDropdown.Item>
                <NavDropdown.Item onClick={logout}>Log out</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavBar;
