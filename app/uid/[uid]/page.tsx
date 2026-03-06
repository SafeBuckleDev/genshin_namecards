import CharacterCard from "@/components/CharacterCard";
import CharactersOverview from "@/components/CharactersOverview";
import CharacterStats from "@/components/CharacterStats";
import ProfileBanner from "@/components/ProfileBanner";
import {
  EnkaClient,
  CharacterData,
  AssetsNotFoundError,
} from "enka-network-api";
import path from "path";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type PageProps = {
  params: Promise<{ uid: string }>;
};

export default async function UIDPage({ params }: PageProps) {
  const { uid } = await params;

  // 1️⃣ Set cache directory
  const cachePath = path.join(process.cwd(), "enka-cache");
  const enka = new EnkaClient({
    cacheDirectory: cachePath,
    timeout: 10000, // 10 seconds instead of 3
    defaultLanguage: "en",
  });

  // 2️⃣ Ensure cache directory exists
  enka.cachedAssetsManager.cacheDirectorySetup();

  // 3️⃣ Fetch all contents only if missing
  try {
    await enka.cachedAssetsManager.refreshAllData(); // load into memory
  } catch (err) {
    await enka.cachedAssetsManager.fetchAllContents(); // only downloads if missing
    await enka.cachedAssetsManager.refreshAllData(); // load into memory
  }

  // 4️⃣ Fetch user data
  let user;
  try {
    user = await enka.fetchUser(Number(uid));
  } catch (err) {
    await enka.cachedAssetsManager.fetchAllContents(); // try redownloading assets
    await enka.cachedAssetsManager.refreshAllData(); // load into memory

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
  }

  console.log(user);

  return (
    <main className="flex flex-col items-center justify-center sm:py-10 sm:px-4 w-full min-h-screen bg-blue-950">
      <section className="max-w-3xl w-full bg-beige-background flex flex-col gap-8 sm:rounded-xl overflow-hidden pb-4 text-beige-text">
        <ProfileBanner
          profileBannerID={user.profileCard.pictures[1].name || ""}
          profileImgUrl={user.profilePicture?.icon.url || ""}
          playerName={user.nickname || "Traveler"}
          playerUID={uid}
          playerSignature={user.signature || "no signature"}
          playerAdventureRank={user.level || 0}
          playerWorldLevel={user.worldLevel || 0}
        />

        <CharactersOverview
          characters={user.characters.map((char: any) => ({
            fullName: char.weapon.location,
            charName: char.characterData.details._nameId,
            rarity: char.characterData.stars,
            element: char.characterData.element.id,
          }))}
        />

        <CharacterStats
          achievements={user.achievements}
          friendships={user.maxFriendshipCount}
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
