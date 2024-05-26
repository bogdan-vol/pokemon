"use client";

import { List, Pagination } from "@mui/material";
import PokemonItem from "../PokemonItem/PokemonItem";
import {
  usePokeAll,
  usePokeByName,
  usePokeByType,
} from "@/hooks/pokemonClient.hook";
import { useSearchParamFilter } from "@/hooks/searchParamFilters.hook";
import Link from "next/link";

const pageSize = 10;
export default function PokemonsList() {
  const {
    addSearchParam,
    getCurrentPageSearchParam,
    getSearchSearchParam,
    getTypeSearchParam,
  } = useSearchParamFilter("page");

  const currentPage = getCurrentPageSearchParam();
  const searchedPokemonValue = getSearchSearchParam();
  const typePokemonValue = getTypeSearchParam();

  const pokemons = usePokeAll(currentPage, pageSize);
  const searchedPokemon = usePokeByName(searchedPokemonValue);
  const pokesByType = usePokeByType(typePokemonValue);

  const onPageChange = (_: any, pageNumber: number) => {
    addSearchParam(pageNumber.toString());
  };
  const isLoading = !pokemons && !pokesByType && !searchedPokemon;
  return (
    <div className={isLoading ? "animate-pulse" : ""}>
      <List sx={{ width: "100%" }}>
        {isLoading &&
          Array.from(Array(3).keys()).map((key) => (
            <div
              className="h-20  w-full bg-trending-dark-green my-1 rounded-md"
              key={key}
            />
          ))}
        {!searchedPokemon ? (
          !typePokemonValue ? (
            pokemons?.results?.map(({ name }, i) => (
              <Link href={`/details/${name}`} key={name}>
                <PokemonItem
                  id={((currentPage - 1) * 10 + i + 1).toString()}
                  name={name}
                />
              </Link>
            ))
          ) : (
            pokesByType?.pokemon.map(({ pokemon: { name, url } }) => (
              <Link href={`/details/${name}`} key={name}>
                <PokemonItem id={url.split("/").reverse()[1]} name={name} />
              </Link>
            ))
          )
        ) : (
          <Link
            href={`/details/${searchedPokemon.name}`}
            key={searchedPokemon.name}
          >
            <PokemonItem
              id={searchedPokemon.id.toString()}
              name={searchedPokemon.name}
            />
          </Link>
        )}
      </List>
      <div className="flex justify-center pb-10">
        {!searchedPokemon && !typePokemonValue && (
          <Pagination
            page={currentPage}
            count={Math.ceil((pokemons?.count || 0) / pageSize)}
            onChange={onPageChange}
          />
        )}
      </div>
    </div>
  );
}
