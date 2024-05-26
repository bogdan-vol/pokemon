"use client";

import { TextField } from "@mui/material";
import { FormEventHandler, useEffect, useState } from "react";
import { useSearchParamFilter } from "@/hooks/searchParamFilters.hook";

export default function SearchInput() {
  const { addSearchParam, getSearchSearchParam } =
    useSearchParamFilter("search");
  const searchSearchParam = getSearchSearchParam();

  const [searchedPokemonValue, setSearchedPokemonValue] = useState(
    getSearchSearchParam()
  );

  useEffect(() => {
    setSearchedPokemonValue(searchSearchParam);
  }, [searchSearchParam]);

  const searchPokemonSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    addSearchParam(searchedPokemonValue, ["type"]);
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
