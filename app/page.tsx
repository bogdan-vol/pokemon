import PokemonsList from "@/components/PokemonsList/PokemonsList";
import SearchInput from "@/components/SearchInput/SearchInput";
import TypesDropdown from "@/components/TypesDropdown/TypesDropdown";

export default function Pokedex() {
  return (
    <main className="p-2 bg-trending-dark-green">
      <h1 className="text-5xl text-trending-dirt xl:w-[1000px] m-auto px-2">
        Pokedex
      </h1>
      <div className="bg-trending-dirt p-2">
        <section
          aria-label="filters"
          title="Filters"
          className="flex justify-between xl:w-[1000px] m-auto"
        >
          <SearchInput />
          <TypesDropdown />
        </section>
        <section
          aria-label="list"
          title="List"
          className="xl:w-[1000px] m-auto"
        >
          <PokemonsList />
        </section>
      </div>
    </main>
  );
}
