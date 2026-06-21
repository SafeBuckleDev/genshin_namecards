"use client";

import { useState } from "react";
import ArtifactModal from "./ArtifactModal";

import { motion } from "framer-motion";
import type { CharacterData } from "./CharactersOverview";

interface CharacterModalProps {
  character: CharacterData;
  onClose: () => void;
}

const characterStatKeys = [
  "health",
  "attack",
  "defense",
  "elementMastery",
  "critRate",
  "critDamage",
  "energyRecharge",
] as const;

export const formatStatValue = (value: number, isPercent: boolean) => {
  if (isPercent) {
    return `${(value * 100).toFixed(1).replace(".", ",")}%`;
  }

  return Math.round(value).toString();
};

export const formatFightPropToName = (fightProp: string) => {
  if (
    fightProp == "FIGHT_PROP_CUR_ATTACK" ||
    fightProp == "FIGHT_PROP_BASE_ATTACK" ||
    fightProp == "FIGHT_PROP_ATTACK"
  ) {
    // flat attack or max attack

    return "ATK";
  }

  if (fightProp == "FIGHT_PROP_ATTACK_PERCENT") {
    // ATK%

    return "ATK percent";
  }

  if (fightProp == "FIGHT_PROP_MAX_HP" || fightProp == "FIGHT_PROP_HP") {
    // flat health or max health

    return "HP";
  }

  if (fightProp == "FIGHT_PROP_HP_PERCENT") {
    // Health%

    return "HP percent";
  }

  if (
    fightProp == "FIGHT_PROP_CUR_DEFENSE" ||
    fightProp == "FIGHT_PROP_DEFENSE"
  ) {
    // flat defense or max defense

    return "DEF";
  }

  if (fightProp == "FIGHT_PROP_DEFENSE_PERCENT") {
    // Defense%

    return "DEF percent";
  }

  if (fightProp == "FIGHT_PROP_CRITICAL") {
    // crit rate

    return "CRIT Rate";
  }

  if (fightProp == "FIGHT_PROP_CRITICAL_HURT") {
    // crit dmg

    return "CRIT DMG";
  }

  if (fightProp == "FIGHT_PROP_ELEMENT_MASTERY") {
    // elemental mastery

    return "Elemental Mastery";
  }

  if (fightProp == "FIGHT_PROP_CHARGE_EFFICIENCY") {
    // energy recharge

    return "Energy Recharge";
  }
};

export default function CharacterModal({
  character,
  onClose,
}: CharacterModalProps) {
  console.log(character);

  const [hoveredArtifact, setHoveredArtifact] = useState<
    CharacterData["artifacts"][number] | null
  >(null);

  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="relative w-full lg:max-w-6xl grid grid-cols-3 gap-8 aspect-[16/7] overflow-hidden rounded-lg bg-[#e9e5dc] p-6"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.85, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 16 }}
        transition={{
          duration: 0.22,
          ease: "easeOut",
        }}
      >
        {/* element background */}
        <img
          className="absolute object-cover w-full h-full bg-gray-300"
          src={`/images/element_bg/${character.element}-bg.jpg`}
        />

        {/* Splash Art */}
        <motion.img
          className="h-full scale-130 absolute top-[0%] left-[-27%] z-10"
          src={character.splashArt.replace(
            "https://homdgcat.wiki/homdgcat-res/Gacha/UI_Gacha_AvatarImg_",
            "https://gi.yatta.moe/assets/UI/UI_Gacha_AvatarImg_",
          )}
          alt={character.fullName}
          initial={{
            opacity: 0,
            x: -50,
            scale: 1.05,
          }}
          animate={{
            opacity: 1,
            x: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            x: -50,
            scale: 1.03,
          }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 20%, black 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 20%, black 100%)",
          }}
        />

        <div className="col-start-1 w-full h-full z-20 flex flex-col justify-between">
          {/* Character base info */}
          <div className="flex flex-col gap-1 text-white">
            <h1 className="text-2xl">{character.fullName}</h1>
            <div className="flex flex-row gap-2 text-xl">
              <p>Lv.</p>
              <p>{character.level}</p>
              <p>/</p>
              <p className="text-white/75">90</p>
            </div>
            <div className="flex flex-row gap-2 items-center text-xl">
              <img className="h-7" src={"/images/icons/icon_friendship.png"} />
              <p>{character.friendship}</p>
            </div>
          </div>

          {/* Character level/constelations */}
          <div className="w-full flex flex-row justify-between text-white">
            <div className="w-8  h-full flex flex-col justify-end gap-3">
              {character.constellations.map((constelation, i) => (
                <div
                  key={i}
                  className="bg-black/40 border-white/70 border w-full aspect-square rounded-full relative overflow-hidden"
                >
                  <img src={constelation.icon} />

                  {character.constellation <= i && (
                    <div className="absolute inset-0 bg-black/60">
                      <img
                        src={"/images/icons/icon_lock.png"}
                        className="w-full h-full p-2"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="w-9.5  h-full flex flex-col justify-end gap-6 pb-2">
              {character.talents.map((talent, i) => (
                <div
                  key={i}
                  className="bg-black/40 border-white/70 border w-full aspect-square rounded-full relative"
                >
                  <img className="absolute top-0" src={talent.icon} />

                  <div
                    className={`px-1.25 rounded-full text-xs text-center ${
                      talent.bonusLevel != 0 ? "bg-blue-500/80" : "bg-black/60"
                    } absolute bottom-0 translate-y-4.25 left-1/2 -translate-x-1/2 flex flex-row gap-0.5 items-center justify-center`}
                  >
                    <p
                      className={
                        (talent.skillLevel === 10 && talent.bonusLevel === 0) ||
                        talent.skillLevel === 13
                          ? "text-yellow-400"
                          : ""
                      }
                    >
                      {talent.skillLevel}
                    </p>

                    {((talent.skillLevel === 10 && talent.bonusLevel === 0) ||
                      talent.skillLevel === 13) && (
                      <div className="w-4.5">
                        <img
                          className="w-full aspect-square"
                          src={"/images/icons/icon_crown.webp"}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-start-2 w-full h-full z-20 flex flex-col justify-between ">
          {/* CharacterWeapon */}
          <div className="h-20 w-full  rounded-md flex flex-row gap-4">
            <div className="h-full aspect-square flex flex-col -translate-y-2">
              <img
                className="h-full aspect-square"
                src={character.weapon?.icon
                  .replace(
                    "https://homdgcat.wiki/homdgcat-res/Weapon/",
                    "https://gi.yatta.moe/assets/UI/",
                  )
                  .concat("?vh=2024123000")}
                alt={character.weapon?.name}
              />
              <div className="-translate-y-2 w-full flex items-center justify-center gap-[-4px]">
                {[...Array(character.weapon?.rarity ?? 0)].map((_, i) => (
                  <img
                    key={i}
                    className="h-3"
                    src="/images/icons/rarity_star.png"
                    alt="star"
                  />
                ))}
              </div>
            </div>

            <div className="w-full h-full flex flex-col gap-0.5">
              <p className="  text-white">{character.weapon?.name}</p>
              <div className="flex flex-row gap-2 pb-1">
                {character.weapon?.weaponStats
                  .filter((stat) => stat.value !== 0)
                  .map((stat, i) => (
                    <div
                      key={i}
                      className="pr-2 pl-1 flex flex-row gap-1 bg-white/30 rounded-xs"
                    >
                      <img
                        className="w-5"
                        src={`/images/icons/stats/${formatFightPropToName(stat.fightProp)}.png`}
                      />
                      <p className="text-sm text-white">
                        {formatStatValue(stat.value, stat.isPercent)}
                      </p>
                    </div>
                  ))}
              </div>
              <div className="flex flex-row gap-2">
                <div className=" bg-black/40 rounded-xs flex flex-row gap-1 items-center px-2">
                  <p
                    className={`${character.weapon?.refinement === 5 ? "text-orange-200" : "text-white"}`}
                  >
                    R{character.weapon?.refinement ?? 1}
                  </p>
                </div>
                <div className=" bg-black/40 rounded-xs flex flex-row gap-1 items-center px-2">
                  <p className="text-white">Lv.</p>
                  <p className="text-white">{character.weapon?.level ?? 0}</p>
                  <p className="text-white">/</p>
                  <p className="text-white/50">
                    {character.weapon?.maxLevel ?? 0}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CharacterStats */}
          <div className="w-full flex flex-col gap-2">
            {characterStatKeys.map((key) => {
              const stat = character.characterStats[key];

              return (
                <div
                  key={key}
                  className="w-full flex flex-row justify-between text-white transition hover:bg-black/40 pl-1 pr-2 py-1 rounded-sm"
                >
                  <div className="flex flex-row gap-2">
                    <img
                      className="w-6 aspect-square"
                      src={`/images/icons/stats/${formatFightPropToName(stat.fightProp)}.png`}
                    />
                    <p>{formatFightPropToName(stat.fightProp)}</p>
                  </div>
                  <p>{formatStatValue(stat.value, stat.isPercent)}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="col-start-3 w-full h-full z-20 grid grid-rows-5 gap-4">
          {character.artifacts.map((artifact, i) => (
            <div
              onMouseEnter={() => setHoveredArtifact(artifact)}
              onMouseLeave={() => setHoveredArtifact(null)}
              onMouseMove={(e) =>
                setMousePosition({
                  x: e.clientX,
                  y: e.clientY,
                })
              }
              key={i}
              className="min-h-0 bg-gradient-to-t hover:from-black/20 hover:to-black/70 transition from-black/10 to-black/40 rounded-md overflow-hidden flex flex-row items-center"
            >
              <div className="h-full max-h-full aspect-square shrink-0  relative mx-4">
                <img
                  className="absolute inset-0 h-full object-cover scale-125 "
                  src={artifact.icon.replace(
                    "https://homdgcat.wiki/homdgcat-res/Relic/",
                    "https://gi.yatta.moe/assets/UI/reliquary/",
                  )}
                  alt={artifact.name}
                />
              </div>

              <div className=" px-2 w-full h-full grid grid-cols-2 grid-rows-2 gap-x-2 py-1.5">
                {artifact.subStats.map((stat, i) => (
                  <div
                    className="w-full h-full flex flex-row gap-0 items-center text-white border-b border-white"
                    key={i}
                  >
                    <div className="h-full aspect-square relative">
                      <img
                        className="absolute inset-0 p-1"
                        src={`/images/icons/stats/${formatFightPropToName(stat.fightProp)}.png`}
                      />
                    </div>
                    <p>+ {formatStatValue(stat.value, stat.isPercent)}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {hoveredArtifact && (
          <ArtifactModal
            artifact={hoveredArtifact}
            mouseX={mousePosition.x}
            mouseY={mousePosition.y}
          />
        )}
      </motion.div>
    </motion.div>
  );
}
