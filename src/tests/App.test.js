import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { render, screen } from "@testing-library/react";
import App from "@src/app/App";

Enzyme.configure({ adapter: new Adapter() });

describe("Test Case For App", () => {
  it("renders the app name", () => {
    render(<App />);
    const appNameElement = screen.getByText(/KenTechFlix/i);
    expect(appNameElement).toBeInTheDocument();
  });

  /* it("should render button", () => {
    const wrapper = shallow(<App />);
    const toastifyContainerElement = wrapper.find(".Toastify");
    expect(toastifyContainerElement).toHaveLength(1);
    //expect(buttonElement.text()).toEqual("Click Me");
  }); */
});
