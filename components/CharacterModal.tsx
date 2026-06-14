"use client";

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

const formatStatValue = (value: number, isPercent: boolean) => {
  if (isPercent) {
    return `${(value * 100).toFixed(1).replace(".", ",")}%`;
  }

  return Math.round(value).toString();
};

const formatFightPropToName = (fightProp: string) => {
  if (
    fightProp == "FIGHT_PROP_CUR_ATTACK" ||
    fightProp == "FIGHT_PROP_BASE_ATTACK"
  ) {
    // flat attack or max attack

    return "ATK";
  }

  if (fightProp == "FIGHT_PROP_MAX_HP") {
    // flat health or max health

    return "HP";
  }

  if (fightProp == "FIGHT_PROP_HP_PERCENT") {
    // Health%

    return "HP percent";
  }

  if (fightProp == "FIGHT_PROP_CUR_DEFENSE") {
    // flat defense or max defense

    return "DEF";
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
        className="relative w-full max-w-6xl grid grid-cols-3 gap-8 aspect-[16/7] overflow-hidden rounded-lg bg-[#e9e5dc] p-6"
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

        <div className="col-start-2 w-full h-full z-20 flex flex-col gap-18 ">
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
          <div className="w-full h-full  flex flex-col gap-2">
            {characterStatKeys.map((key) => {
              const stat = character.characterStats[key];

              return (
                <div
                  key={key}
                  className="w-full flex flex-row justify-between text-white bg-gradient-to-t transition hover:from-black/20 pl-1 pr-2 py-1 hover:to-black/40 rounded-sm"
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
              key={i}
              className="flex flex-row gap-4 items-center h-20 overflow-hidden bg-gradient-to-t from-black/5 to-black/40 rounded-md"
            >
              <img
                className="h-full scale-140 object-cover translate-x-2"
                src={artifact.icon
                  .replace(
                    "https://homdgcat.wiki/homdgcat-res/Relic/",
                    "https://gi.yatta.moe/assets/UI/reliquary/",
                  )
                  .concat("?vh=2024123000")}
                alt={artifact.name}
              />
              <div className="w-full h-full grid grid-rows-2 grid-cols-2  gap-2"></div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
