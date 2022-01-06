import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleLocalTimezone, searchShows } from "@app/actions";

import {
  Button,
  Form,
  FormControl,
  Container,
  Navbar,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import { FaPhotoVideo } from "react-icons/fa";
import { toast } from "react-toastify";

const MainNavbar = () => {
  const dispatch = useDispatch();
  const localTimezone = useSelector((state) => state.timezone.localTimezone);

  const inputEl = useRef(null);

  const search = () => {
    if (inputEl.current.value) {
      dispatch(searchShows(inputEl.current.value));
    } else {
      toast.info("Search input cannot be empty!");
      inputEl.current.focus();
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand
          href="/"
          className="d-inline-block align-items-center justify-content-center text-primary"
        >
          <FaPhotoVideo />
          <span className="ml-3 text-white"> KenTechFlix</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/favorites">Favorites</Nav.Link>
            <NavDropdown title="Settings" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => dispatch(toggleLocalTimezone())}>
                Toggle Local Timezone ({localTimezone ? "ON" : "OFF"})
              </NavDropdown.Item>
              {/* <NavDropdown.Divider />
              <NavDropdown.Item href="">
                Separated link
              </NavDropdown.Item> */}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              ref={inputEl}
            />
            <Button variant="outline-primary" onClick={() => search()}>
              Search
            </Button>
          </Form>
          {/* <Navbar.Text>
            Signed in as: <a href="#login">Mark Otto</a>
          </Navbar.Text> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
