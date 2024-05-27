"use client";

import Moves from "@/components/Moves/Moves";
import PokemonSummary from "@/components/PokemonSummary/PokemonSummary";
import Stats from "@/components/Stats/Stats";
import TabContainer from "@/components/TabContainer/TabContainer";
import { usePokeByName } from "@/hooks/pokemonClient.hook";
import { Box, Tab, Tabs } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { MouseEventHandler, useState } from "react";

export default function Details({
  params: { name },
}: {
  params: { name: string };
}) {
  const [tabValue, setTabValue] = useState(0);

  const { searchedPokemon, searchedPokemonErr } = usePokeByName(name);
  if (searchedPokemonErr)
    return (
      <div className="bg-red-600 font-bold text-center">
        {searchedPokemonErr}
        <br></br>
        <Link href={"/"}>Go home</Link>
      </div>
    );
  if (!searchedPokemon) return;

  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const egeretsag: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (e.detail === 7) {
      e.currentTarget.classList.toggle("animate-spin");
    }
  };

  return (
    <main className="p-2 bg-trending-dark-green">
      <h1 className="text-5xl text-trending-dirt xl:w-[1000px] m-auto px-2 capitalize">
        {name}
      </h1>
      <div className="bg-trending-dirt p-2 rounded-md">
        <section
          aria-label="summary"
          title="Summary"
          className="flex justify-between xl:w-[1000px] m-auto"
        >
          <PokemonSummary pokemon={searchedPokemon} />
          <button onClick={egeretsag}>
            <Image
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${searchedPokemon.id}.png`}
              width={500}
              height={500}
              alt={`Picture of ${name}`}
            />
          </button>
        </section>
        <section
          aria-label="tabs"
          title="Tabs"
          className="xl:w-[1000px] m-auto"
        >
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={tabValue}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Moves" {...a11yProps(0)} />
                <Tab label="Stats" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabContainer value={tabValue} index={0}>
              <Moves items={searchedPokemon.moves} />
            </TabContainer>
            <TabContainer value={tabValue} index={1}>
              <Stats items={searchedPokemon.stats} />
            </TabContainer>
          </Box>
        </section>
      </div>
    </main>
  );
}
