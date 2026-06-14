import CharactersOverview from "@/components/CharactersOverview";
import CharacterStats from "@/components/CharacterStats";
import ProfileBanner from "@/components/ProfileBanner";
import { EnkaClient } from "enka-network-api";
import path from "path";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type PageProps = {
  params: Promise<{ uid: string }>;
};

// Create ONE global Enka client (important)
const enka = new EnkaClient({
  cacheDirectory: path.join(process.cwd(), "enka-cache"),
  timeout: 15000,
  defaultLanguage: "en",
});

export default async function UIDPage({ params }: PageProps) {
  const { uid } = await params;

  let user;

  try {
    user = await enka.fetchUser(Number(uid));
  } catch (err) {
    console.error("Failed to fetch user:", err);

    return (
      <main className="p-10">
        <h1 className="text-2xl font-bold">UID: {uid}</h1>
        <p className="text-red-500">Failed to fetch player data</p>
      </main>
    );
  }

  console.log(user?.characters[9]);

  const characters = user.characters.map((char) => {
    const charName = char.costume.icon.name.replace("UI_AvatarIcon_", "");

    return {
      id: Number(char.characterData.id),
      fullName: String(char.characterData.name.get("en") ?? ""),
      charName,
      rarity: Number(char.characterData.stars ?? 0),
      element: String(char.characterData?.element?.id ?? ""),

      level: Number(char.level ?? 0),
      friendship: Number(char.friendship ?? 0),
      constellation: Number(char.unlockedConstellations?.length ?? 0),

      splashArt: char.costume.splashImage.url,

      characterStats: {
        health: {
          fightProp: String(char.stats.maxHealth.fightProp ?? ""),
          isPercent: Boolean(char.stats.maxHealth.isPercent ?? false),
          value: Number(char.stats.maxHealth.value ?? 0),
        },
        attack: {
          fightProp: String(char.stats.attack.fightProp ?? ""),
          isPercent: Boolean(char.stats.attack.isPercent ?? false),
          value: Number(char.stats.attack.value ?? 0),
        },
        defense: {
          fightProp: String(char.stats.defense.fightProp ?? ""),
          isPercent: Boolean(char.stats.defense.isPercent ?? false),
          value: Number(char.stats.defense.value ?? 0),
        },
        elementMastery: {
          fightProp: String(char.stats.elementMastery.fightProp ?? ""),
          isPercent: Boolean(char.stats.elementMastery.isPercent ?? false),
          value: Number(char.stats.elementMastery.value ?? 0),
        },
        critRate: {
          fightProp: String(char.stats.critRate.fightProp ?? ""),
          isPercent: Boolean(char.stats.critRate.isPercent ?? false),
          value: Number(char.stats.critRate.value ?? 0),
        },
        critDamage: {
          fightProp: String(char.stats.critDamage.fightProp ?? ""),
          isPercent: Boolean(char.stats.critDamage.isPercent ?? false),
          value: Number(char.stats.critDamage.value ?? 0),
        },
        energyRecharge: {
          fightProp: String(char.stats.chargeEfficiency.fightProp ?? ""),
          isPercent: Boolean(char.stats.chargeEfficiency.isPercent ?? false),
          value: Number(char.stats.chargeEfficiency.value ?? 0),
        },
      },

      artifacts: (char.artifacts ?? []).map((artifact) => ({
        name: String(artifact.artifactData?.name?.get("en") ?? ""),
        setName: String(artifact.artifactData?.set?.name?.get("en") ?? ""),
        rarity: Number(artifact.artifactData?.stars ?? 0),
        level: Number(artifact.level ?? 0),
        icon: String(artifact.artifactData?.icon?.url ?? ""),

        mainStat: {
          name: String(artifact.mainstat?.fightPropName ?? ""),
          value: Number(artifact.mainstat?.value ?? 0),
        },

        subStats: Object.entries(artifact.substats ?? {}).map(
          ([name, value]) => ({
            name: String(name),
            value: Number(value),
          }),
        ),
      })),

      weapon: char.weapon
        ? {
            name: String(char.weapon.weaponData?.name?.get("en") ?? ""),
            level: Number(char.weapon.level ?? 0),
            maxLevel: Number(char.weapon.maxLevel ?? 0),
            refinement: Number(char.weapon.refinementRank ?? 1),
            rarity: Number(char.weapon.weaponData?.stars ?? 0),
            icon: String(char.weapon.weaponData?.icon?.url ?? ""),
            weaponStats: Object.entries(char.weapon.weaponStats ?? {}).map(
              ([i]) => ({
                fightProp: char.weapon.weaponStats?.[i]?.fightProp,
                isPercent: char.weapon.weaponStats?.[i]?.isPercent,
                value: char.weapon.weaponStats?.[i]?.value,
              }),
            ),
          }
        : null,
    };
  });

  return (
    <main className="flex flex-col items-center justify-center w-full min-h-screen bg-blue-950">
      <section className="max-w-5xl w-full bg-beige-background flex flex-col gap-8 overflow-hidden pb-4 text-beige-text shadow-none sm:shadow-2xl">
        <ProfileBanner
          profileBannerID={user.profileCard?.pictures?.[1]?.name || ""}
          profileImgUrl={user.profilePicture?.icon?.url || ""}
          playerName={user.nickname || "Traveler"}
          playerUID={uid}
          playerSignature={user.signature || "no signature"}
          playerAdventureRank={user.level || 0}
          playerWorldLevel={user.worldLevel || 0}
        />

        <CharactersOverview characters={characters} />

        <CharacterStats
          achievements={user.achievements || 0}
          friendships={user.maxFriendshipCount || 0}
          spiralAbyss={{
            floor: user.spiralAbyss?.floor || 0,
            chamber: user.spiralAbyss?.chamber || 0,
            stars: user.spiralAbyss?.stars || 0,
          }}
          theather={{
            act: user.theater?.act || 0,
            stars: user.theater?.stars || 0,
          }}
          stygian={{
            difficulty: user.stygian?.difficulty || 1,
            clearTime: user.stygian?.clearTime || 0,
          }}
        />
      </section>
    </main>
  );
}
