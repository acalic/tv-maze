import React from "react";
import EpisodesList from "@components/EpisodesList";
import { render, screen } from "@testing-library/react";

import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

import { episodes } from "../fixtures";

describe("should test EpisodesList component", () => {
  const initialState = {
    timezone: {
      localTimezone: false,
    },
  };
  const mockStore = configureStore();
  let store;

  it("renders the EpisodesList component", () => {
    store = mockStore(initialState);

    const wrapper = render(
      <Provider store={store}>
        <EpisodesList episodes={episodes} />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(screen.getByText(/Der Weg des Geldes/i)).toBeInTheDocument();
  });
});
