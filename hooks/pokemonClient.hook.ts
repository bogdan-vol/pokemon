import { pokemonClient } from "@/lib/pokemon.utils";
import { NamedAPIResourceList, Pokemon } from "pokenode-ts";
import { useEffect, useState } from "react";

export const usePokeTypes = () => {
  const [types, setTypes] = useState<NamedAPIResourceList>();

  useEffect(() => {
    pokemonClient.listTypes().then((t) => setTypes(t));
  }, []);

  return types;
};

export const usePokeAll = (currentPage: number, pageSize: number) => {
  const [pokemons, setPokemons] = useState<NamedAPIResourceList>();

  useEffect(() => {
    pokemonClient
      .listPokemons((currentPage - 1) * pageSize, pageSize)
      .then((ps) => {
        setPokemons(ps);
      });
  }, [currentPage, pageSize]);

  return pokemons;
};

export const usePokeByName = (searchedPokemonValue: string) => {
  const [searchedPokemon, setSearchedPokemon] = useState<Pokemon>();

  useEffect(() => {
    if (searchedPokemonValue)
      pokemonClient.getPokemonByName(searchedPokemonValue).then((pk) => {
        setSearchedPokemon(pk);
      });
    else setSearchedPokemon(undefined);
  }, [searchedPokemonValue]);

  return searchedPokemon;
};
