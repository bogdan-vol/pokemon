import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SearchInput from "./SearchInput";

const mockSearchParams = jest.fn().mockReturnValue(new URLSearchParams(""));
const mockUseRouterPush = jest.fn();
jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useSearchParams: () => mockSearchParams(),
  useRouter: jest
    .fn()
    .mockReturnValue({ push: (path: string) => mockUseRouterPush(path) }),
}));

describe("SearchInput", () => {
  it("should contain a form field", () => {
    render(<SearchInput />);
    expect(screen.getByRole("form")).toBeInTheDocument();
  });

  it("should contain an input field", () => {
    render(<SearchInput />);
    expect(screen.getByLabelText("Filter by name")).toBeInTheDocument();
  });

  it("search params should change on input submit", async () => {
    render(<SearchInput />);
    const input = screen.getByLabelText("Filter by name");
    await userEvent.type(input, "luxray{enter}");
    expect(mockUseRouterPush).toHaveBeenCalledWith(
      expect.stringContaining("search=luxray")
    );
  });

  it("search input should reset type param", async () => {
    mockSearchParams.mockReturnValue(new URLSearchParams("type=whatever"));
    render(<SearchInput />);
    const input = screen.getByLabelText("Filter by name");
    await userEvent.type(input, "luxray{enter}");

    expect(mockUseRouterPush).toHaveBeenCalledWith(
      expect.stringContaining("search=luxray")
    );
    expect(mockUseRouterPush).toHaveBeenCalledWith(
      expect.not.stringContaining("type=fighting")
    );
  });
});
