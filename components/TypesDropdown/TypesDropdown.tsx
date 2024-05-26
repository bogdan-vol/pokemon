"use client";

import { usePokeTypes } from "@/hooks/pokemonClient.hook";
import { useSearchParamFilter } from "@/hooks/searchParamFilters.hook";
import { Autocomplete, TextField } from "@mui/material";

export default function TypesDropdown() {
  const types = usePokeTypes();
  const { addSearchParam, getTypeSearchParam } = useSearchParamFilter("type");

  const selectedType = getTypeSearchParam();
  return (
    <Autocomplete
      value={{ name: selectedType, label: selectedType, url: "" }}
      disablePortal
      id="combo-box-demo"
      options={(types?.results || []).map((type) => ({
        ...type,
        label: type.name,
      }))}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Type" />}
      onChange={(_, selection) => {
        addSearchParam(selection?.label || "", ["search"]);
      }}
    />
  );
}
