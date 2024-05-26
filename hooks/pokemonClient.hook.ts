import { pokemonClient } from "@/lib/pokemon.utils";
import { NamedAPIResourceList, Pokemon, Type } from "pokenode-ts";
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
  const [searchedPokemonErr, setSearchedPokemonErr] = useState("");

  useEffect(() => {
    if (searchedPokemonValue)
      pokemonClient
        .getPokemonByName(searchedPokemonValue)
        .then((pk) => {
          setSearchedPokemon(pk);
        })
        .catch((e) => {
          setSearchedPokemonErr("Pokemon not found");
        });
    else setSearchedPokemon(undefined);
  }, [searchedPokemonValue]);

  return { searchedPokemon, searchedPokemonErr };
};

export const usePokeByType = (typePokemonValue: string) => {
  const [pokeType, setPokeType] = useState<Type>();

  useEffect(() => {
    if (typePokemonValue)
      pokemonClient
        .getTypeByName(typePokemonValue)
        .then((pk) => setPokeType(pk));
  }, [typePokemonValue]);

  return pokeType;
};
