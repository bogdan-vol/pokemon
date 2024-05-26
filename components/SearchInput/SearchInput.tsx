"use client";

import { TextField } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEventHandler, useState } from "react";
import { createQueryString } from "@/lib/pokemon.utils";

export default function SearchInput() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchedPokemonValue, setSearchedPokemonValue] = useState(
    searchParams.get("search") || ""
  );

  const searchPokemonSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    router.push(
      pathname +
        "?" +
        createQueryString(searchParams, "search", searchedPokemonValue)
    );
  };

  return (
    <form name="filterByName" onSubmit={searchPokemonSubmit}>
      <TextField
        name="filterByName"
        id="filterByName"
        label="Filter by name"
        variant="outlined"
        title="Filter by name"
        value={searchedPokemonValue}
        onChange={(e) => setSearchedPokemonValue(e.target.value)}
        type="search"
      />
    </form>
  );
}
