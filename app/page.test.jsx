import { render, screen } from "@testing-library/react";
import Pokedex from "./page";

describe("Pokedex", () => {
  it("should containd a header", () => {
    render(<Pokedex />);
    expect(screen.getByRole("heading")).toHaveTextContent("Pokedex");
  });

  it("should contain filter section", () => {
    render(<Pokedex />);
    expect(screen.getByTitle("Filters")).toBeDefined();
  });

  it("should contain list section", () => {
    render(<Pokedex />);
    expect(screen.getByTitle("List")).toBeDefined();
  });
});
