import React from "react";
import Rating from "@components/Rating";
import { render } from "@testing-library/react";

describe("should test Rating component", () => {
  it("renders the Rating component", () => {
    const wrapper = render(<Rating rating={3} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders the Rating component with rating 5", () => {
    const wrapper = render(<Rating rating={5} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders the Rating component with rating 10", () => {
    const wrapper = render(<Rating rating={10} />);
    expect(wrapper).toMatchSnapshot();
  });
});
