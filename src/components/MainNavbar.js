import React, { useRef, useState } from "react";
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
  ListGroup,
} from "react-bootstrap";
import { FaPhotoVideo } from "react-icons/fa";
import { toast } from "react-toastify";

const MainNavbar = () => {
  const dispatch = useDispatch();
  const localTimezone = useSelector((state) => state.timezone.localTimezone);
  const searchResultsAll = useSelector((state) => state.searches.searchShows);

  const [showSearchHistory, setShowSearchHistory] = useState(false);

  const searchKeywords = searchResultsAll
    .filter((search) => search.searchKeyword !== "")
    .map((search) => search.searchKeyword);

  const inputEl = useRef(null);

  const toggleSearchHistoryMenu = (value) => {
    setShowSearchHistory(value);
  };

  const handleSearch = (event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (inputEl.current.value) {
      dispatch(searchShows(inputEl.current.value));
      toggleSearchHistoryMenu(false);
    } else {
      toast.info("Search input cannot be empty!");
      inputEl.current.focus();
    }
  };

  const handleSearchHistoryItemHover = (keyword) => {
    inputEl.current.value = keyword;
  };

  const handleSearchHistoryItemClick = (keyword) => {
    inputEl.current.value = keyword;
    handleSearch();
  };

  const handleOnSearchInputChange = () => {
    if (inputEl.current.value) {
      toggleSearchHistoryMenu(false);
    } else {
      toggleSearchHistoryMenu(true);
    }
  };

  const handleOnSearchInputFocus = () => {
    if (!inputEl.current.value) {
      toggleSearchHistoryMenu(true);
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
            <NavDropdown
              title="Settings"
              id="basic-nav-dropdown"
              variant="dark"
            >
              <NavDropdown.Item onClick={() => dispatch(toggleLocalTimezone())}>
                Toggle Local Timezone ({localTimezone ? "ON" : "OFF"})
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end mt-3 mt-lg-0">
          <Form className="d-flex" onSubmit={(event) => handleSearch(event)}>
            <FormControl
              type="search"
              placeholder="Show name..."
              className="me-2"
              aria-label="Search"
              ref={inputEl}
              onChange={() => handleOnSearchInputChange()}
              onFocus={() => handleOnSearchInputFocus()}
              onBlur={() =>
                setTimeout(() => {
                  // Hacky way (timeout) to not close the SearchHistoryMenu in case an item is clicked in it! :D
                  toggleSearchHistoryMenu(false);
                }, 100)
              }
            />
            <Button variant="outline-primary" type="submit">
              Search
            </Button>
          </Form>
          {searchKeywords && searchKeywords.length && (
            <ListGroup
              className={`search-history fade ${
                showSearchHistory ? "show" : "hide"
              }`}
            >
              {searchKeywords.reverse().map((keyword, i) => (
                <ListGroup.Item
                  key={"search-history-item-" + i}
                  onMouseOver={() => handleSearchHistoryItemHover(keyword)}
                  onClick={() => handleSearchHistoryItemClick(keyword)}
                >
                  {keyword}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
