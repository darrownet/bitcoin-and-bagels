/**
 * @jest-environment jsdom
 */

import {render} from "@testing-library/react";

import App from "../app";

window.scrollTo = jest.fn();

describe("<App />", () => {
  test("should render the application", () => {
    const container = render(<App/>).container;
    expect(container).toBeDefined();
  });
});
