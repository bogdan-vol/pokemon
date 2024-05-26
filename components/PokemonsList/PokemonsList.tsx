"use client";

import { createQueryString, pokemonClient } from "@/lib/pokemon.utils";
import { List, Pagination } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { NamedAPIResourceList, Pokemon } from "pokenode-ts";
import { useEffect, useState } from "react";
import PokemonItem from "../PokemonItem/PokemonItem";

const pageSize = 10;
export default function PokemonsList() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchedPokemon, setSearchedPokemon] = useState<Pokemon>();
  const [pokemons, setPokemons] = useState<NamedAPIResourceList>();

  const currentPage = parseInt(searchParams.get("page") || "1");
  const searchedPokemonValue = searchParams.get("search") || "";

  useEffect(() => {
    pokemonClient
      .listPokemons((currentPage - 1) * pageSize, pageSize)
      .then((ps) => {
        setPokemons(ps);
      });
  }, [currentPage]);

  useEffect(() => {
    if (searchedPokemonValue)
      pokemonClient.getPokemonByName(searchedPokemonValue).then((pk) => {
        setSearchedPokemon(pk);
      });
    else setSearchedPokemon(undefined);
  }, [searchedPokemonValue]);

  const onPageChange = (_: any, pageNumber: number) => {
    router.push(
      pathname +
        "?" +
        createQueryString(searchParams, "page", pageNumber.toString())
    );
  };

  return (
    <>
      <>
        <List sx={{ width: "100%" }}>
          {!searchedPokemon ? (
            pokemons?.results?.map(({ name }, i) => (
              <PokemonItem
                key={name}
                id={(currentPage - 1) * 10 + i + 1}
                name={name}
              />
            ))
          ) : (
            <PokemonItem id={searchedPokemon.id} name={searchedPokemon.name} />
          )}
        </List>
        <div className="flex justify-center pb-10">
          {!searchedPokemon && (
            <Pagination
              count={Math.ceil((pokemons?.count || 0) / pageSize)}
              onChange={onPageChange}
            />
          )}
        </div>
      </>
    </>
  );
}
