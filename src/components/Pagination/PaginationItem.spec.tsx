/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import { PaginationItem } from "./PaginationItem";

describe("PaginationItem Component", () => {
  it("renders correctly if iscurrent is true", async () => {
    render(
      <PaginationItem number={1} isCurrent={true} onPageChange={() => 1} />
    );

    expect(screen.getByRole("current_button")).toBeInTheDocument();
  });

  it("renders correctly if iscurrent is false", async () => {
    render(
      <PaginationItem number={1} isCurrent={false} onPageChange={() => 1} />
    );

    expect(screen.queryByRole("current_button")).not.toBeInTheDocument();
  });
});
