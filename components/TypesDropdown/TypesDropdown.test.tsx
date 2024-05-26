import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TypesDropdown from "./TypesDropdown";
import { pokemonClient } from "@/lib/pokemon.utils";

const mockSearchParams = jest.fn();
const mockUseRouterPush = jest.fn();
jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useSearchParams: () => mockSearchParams(),
  useRouter: jest
    .fn()
    .mockReturnValue({ push: (path: string) => mockUseRouterPush(path) }),
}));

describe("TypesDropdown", () => {
  let listPokemonTypesMock: jest.SpyInstance;
  beforeEach(() => {
    listPokemonTypesMock = jest
      .spyOn(pokemonClient, "listTypes")
      .mockResolvedValue({
        count: 1,
        results: Array.from(Array(1).keys()).map((i) => ({
          name: "fighting",
          url: `ttps://pokeapi.co/api/v2/type/${i}/`,
        })),
      } as any);
  });

  afterEach(() => {
    mockSearchParams.mockReset();
  });

  it("should contain an input field", async () => {
    mockSearchParams.mockReturnValue(new URLSearchParams(""));
    render(<TypesDropdown />);
    await waitFor(() => {
      expect(screen.getByLabelText("Type")).toBeInTheDocument();
    });
  });

  it("type params should change on input submit", async () => {
    mockSearchParams.mockReturnValue(new URLSearchParams(""));
    render(<TypesDropdown />);
    const input = screen.getByLabelText("Type");
    await userEvent.click(input);
    const option = screen.getByText("fighting");
    expect(option).toBeInTheDocument();
    await userEvent.click(option);
    expect(mockUseRouterPush).toHaveBeenCalledWith(
      expect.stringContaining("type=fighting")
    );
  });

  it("type dropdown should reset search param", async () => {
    mockSearchParams.mockReturnValue(new URLSearchParams("search=whatever"));
    render(<TypesDropdown />);
    const input = screen.getByLabelText("Type");
    await userEvent.click(input);
    const option = screen.getByText("fighting");
    expect(option).toBeInTheDocument();
    await userEvent.click(option);

    expect(mockUseRouterPush).toHaveBeenCalledWith(
      expect.stringContaining("type=fighting")
    );
    expect(mockUseRouterPush).toHaveBeenCalledWith(
      expect.not.stringContaining("search=whatever")
    );
  });
});
