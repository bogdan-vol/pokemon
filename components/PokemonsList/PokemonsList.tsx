"use client";

import { List, Pagination } from "@mui/material";
import PokemonItem from "../PokemonItem/PokemonItem";
import {
  usePokeAll,
  usePokeByName,
  usePokeByType,
} from "@/hooks/pokemonClient.hook";
import { useSearchParamFilter } from "@/hooks/searchParamFilters.hook";

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

  return (
    <>
      <>
        <List sx={{ width: "100%" }}>
          {!searchedPokemon ? (
            !typePokemonValue ? (
              pokemons?.results?.map(({ name }, i) => (
                <PokemonItem
                  key={name}
                  id={((currentPage - 1) * 10 + i + 1).toString()}
                  name={name}
                />
              ))
            ) : (
              pokesByType?.pokemon.map(({ pokemon: { name, url } }) => (
                <PokemonItem
                  key={name}
                  id={url.split("/").reverse()[1]}
                  name={name}
                />
              ))
            )
          ) : (
            <PokemonItem
              id={searchedPokemon.id.toString()}
              name={searchedPokemon.name}
            />
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
      </>
    </>
  );
}
