import { render } from "@testing-library/react";
import App from "./App";

// Mock Redux Provider
jest.mock('react-redux', () => ({
  Provider: ({ children }) => children,
  useSelector: () => ({}),
  useDispatch: () => jest.fn()
}));

// Mock Redux store
jest.mock('./Component/Redux/Store/Store', () => ({
  store: {}
}));

test("renders app without crashing", () => {
  render(<App />);
  // Just test that the app renders without errors
  expect(document.body).toBeInTheDocument();
});
