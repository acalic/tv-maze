import React from "react";
import Favorites from "@pages/Favorites";
import { render, screen } from "@testing-library/react";

import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

import { favorites } from "../fixtures";

describe("should test Favorites component", () => {
  const initialState = { favorites: favorites };
  const mockStore = configureStore();
  let store;

  it("renders the EpisodesList component", () => {
    store = mockStore(initialState);

    const wrapper = render(
      <Provider store={store}>
        <Favorites />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(screen.getByText(/Outer Banks/i)).toBeInTheDocument();
  });
});
