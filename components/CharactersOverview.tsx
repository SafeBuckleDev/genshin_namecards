"use client";

import { AnimatePresence } from "framer-motion";

import { useState } from "react";
import CharacterCard from "./CharacterCard";
import CharacterModal from "./CharacterModal";

export interface CharacterData {
  id: number;
  fullName: string;
  charName: string;
  rarity: number;
  element: string;

  level: number;
  friendship: number;
  constellation: number;

  splashArt: string;

  characterStats: {
    health: {
      fightProp: string;
      isPercent: boolean;
      value: number;
    };
    attack: {
      fightProp: string;
      isPercent: boolean;
      value: number;
    };
    defense: {
      fightProp: string;
      isPercent: boolean;
      value: number;
    };
    elementMastery: {
      fightProp: string;
      isPercent: boolean;
      value: number;
    };
    critRate: {
      fightProp: string;
      isPercent: boolean;
      value: number;
    };
    critDamage: {
      fightProp: string;
      isPercent: boolean;
      value: number;
    };
    energyRecharge: {
      fightProp: string;
      isPercent: boolean;
      value: number;
    };
  };

  weapon: {
    name: string;
    level: number;
    maxLevel: number;
    refinement: number;
    rarity: number;
    icon: string;
    weaponStats: {
      fightProp: string;
      isPercent: boolean;
      value: number;
    }[];
  } | null;

  artifacts: {
    name: string;
    setName: string;
    rarity: number;
    level: number;
    icon: string;
    mainStat: {
      name: string;
      value: number;
    };
    subStats: {
      name: string;
      value: number;
    }[];
  }[];
}

export interface CharacterOverviewProps {
  characters: CharacterData[];
}

export default function CharactersOverview({
  characters,
}: CharacterOverviewProps) {
  const [selectedCharacter, setSelectedCharacter] =
    useState<CharacterData | null>(null);

  if (characters.length === 0) {
    return (
      <section className="w-full flex flex-col justify-center items-center px-4 text-center py-12 text-beige-background-accent">
        <p>
          No Characters found, profile may be private or no Characters are added
          yet.
        </p>
      </section>
    );
  }

  return (
    <>
      <section className="grid grid-cols-4 sm:grid-cols-6 gap-4 px-4">
        {characters.map((char, i) => (
          <CharacterCard
            key={i}
            props={char}
            onClick={() => setSelectedCharacter(char)}
          />
        ))}
      </section>

      <AnimatePresence mode="wait">
        {selectedCharacter && (
          <CharacterModal
            key={selectedCharacter.id}
            character={selectedCharacter}
            onClose={() => setSelectedCharacter(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
