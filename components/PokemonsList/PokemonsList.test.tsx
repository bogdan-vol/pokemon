import { render, screen, waitFor } from "@testing-library/react";
import PokemonsList from "./PokemonsList";
import { pokemonClient } from "@/lib/pokemon.utils";
import userEvent from "@testing-library/user-event";

const mockSearchParamsGet = jest.fn();
const mockRouterPush = jest.fn();
jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useSearchParams: () => ({
    get: () => mockSearchParamsGet(),
  }),
  useRouter: jest.fn(() => ({ push: (path: string) => mockRouterPush(path) })),
}));

describe("PokemonsList", () => {
  let listPokemonsMock: jest.SpyInstance;
  let getPokemonByNameMock: jest.SpyInstance;
  beforeEach(() => {
    listPokemonsMock = jest
      .spyOn(pokemonClient, "listPokemons")
      .mockResolvedValue({
        count: 11,
        results: Array.from(Array(10).keys()).map((i) => ({
          name: `pokemon ${i}`,
          url: `https://pokeapi.co/api/v2/pokemon/${i}/`,
        })),
      } as any);

    getPokemonByNameMock = jest
      .spyOn(pokemonClient, "getPokemonByName")
      .mockResolvedValue({ id: 0, name: "pica" } as any);
  });

  afterEach(() => {
    listPokemonsMock.mockClear();
    getPokemonByNameMock.mockClear();
  });

  it("should display 10 items if no searched value present", async () => {
    render(<PokemonsList />);
    await waitFor(() => {
      const images = screen.getAllByRole<HTMLImageElement>("img");
      expect(listPokemonsMock).toHaveBeenCalledWith(0, 10);
      expect(images).toHaveLength(10);
      images.forEach((image, i) => {
        expect(image.src).toBe(
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            i + 1
          }.png`
        );
      });
    });
  });

  it("should take page param into account and properly offset the pokemons", async () => {
    mockSearchParamsGet.mockReturnValueOnce(2);
    render(<PokemonsList />);
    await waitFor(() => {
      expect(listPokemonsMock).toHaveBeenCalledWith(10, 10);
    });
  });

  it("should display two pages available", async () => {
    render(<PokemonsList />);
    await waitFor(() => {
      const buttons = screen.getAllByRole<HTMLButtonElement>("button");
      buttons.shift();
      buttons.pop();
      expect(buttons).toHaveLength(2);
      buttons.forEach((button, i) => {
        expect(button.textContent).toBe((i + 1).toString());
      });
    });
  });

  it("should switch page correctly", async () => {
    render(<PokemonsList />);
    await waitFor(async () => {
      const buttons = screen.getAllByRole<HTMLButtonElement>("button");
      buttons.shift();
      buttons.pop();
      await userEvent.click(buttons[1]);
      expect(mockRouterPush).toHaveBeenCalledWith(
        expect.stringContaining("page=2")
      );
    });
  });

  it("should be able to handle search param", async () => {
    mockSearchParamsGet.mockReturnValue(0);
    mockSearchParamsGet.mockReturnValue("pica");
    render(<PokemonsList />);
    await waitFor(() => {
      const images = screen.getAllByRole<HTMLImageElement>("img");
      const buttons = screen.queryAllByRole<HTMLButtonElement>("button");
      expect(images).toHaveLength(1);
      expect(buttons).toHaveLength(0);
      expect(getPokemonByNameMock).toHaveBeenCalledWith("pica");
    });
  });
});
