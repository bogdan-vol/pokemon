import { pokemonClient } from "@/lib/pokemon.utils";
import { NamedAPIResourceList } from "pokenode-ts";
import { useEffect, useState } from "react";

export const usePokeTypes = () => {
  const [types, setTypes] = useState<NamedAPIResourceList>();

  useEffect(() => {
    pokemonClient.listTypes().then((t) => setTypes(t));
  }, []);

  return types;
};
