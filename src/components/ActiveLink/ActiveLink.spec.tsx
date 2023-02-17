/**
 * @jest-environment jsdom
 */

import { render } from "@testing-library/react";
import { ActiveLink } from ".";

jest.mock("next/router", () => {
  return {
    useRouter() {
      return {
        asPath: "/",
      };
    },
  };
});

describe("ActiveLink component", () => {
  it("renders correctly", () => {
    const { getByText } = render(
      <ActiveLink href="/" passHref>
        <span>Dashboard</span>
      </ActiveLink>
    );

    expect(getByText("Dashboard")).toBeInTheDocument();
  });
});
