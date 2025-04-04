import React from "react";
import { Link } from "react-router";
import { Container, Nav, Navbar } from "react-bootstrap";
import { RouterEnum } from "../../../constants/enums/routerEnum.ts";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="px-3">
        <Navbar.Brand as={Link} to="/">Parcel Transport</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to={`/${RouterEnum.PARCELS_MANAGEMENT}`}>Parcels Management</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container className="mt-4">{children}</Container>
    </>
  );
};

export default Layout;