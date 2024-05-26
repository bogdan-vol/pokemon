import { Pokemon } from "pokenode-ts";

interface Props {
  pokemon: Pokemon;
}

export default function PokemonSummary({ pokemon }: Props) {
  return (
    <div className="flex-1 bg-trending-dark-orange rounded-md flex flex-col items-center justify-center">
      <span className="text-trending-dark-green font-bold">
        Base experience: {pokemon.base_experience}
      </span>
      <span className="text-trending-dark-green font-bold">
        Height: {pokemon.height}
      </span>
      <span className="text-trending-dark-green font-bold">
        Weight: {pokemon.weight}
      </span>
    </div>
  );
}
