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

// Ensure cache exists
enka.cachedAssetsManager.cacheDirectorySetup();

let assetsLoaded = false;

async function ensureAssetsLoaded() {
  if (assetsLoaded) return;

  try {
    await enka.cachedAssetsManager.refreshAllData();
  } catch {
    await enka.cachedAssetsManager.fetchAllContents();
    await enka.cachedAssetsManager.refreshAllData();
  }

  assetsLoaded = true;
}

async function fetchUserWithRetry(uid: number, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await enka.fetchUser(uid);
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
}

export default async function UIDPage({ params }: PageProps) {
  const { uid } = await params;

  await ensureAssetsLoaded();

  let user;

  try {
    user = await fetchUserWithRetry(Number(uid));
  } catch (err) {
    console.error("Failed to fetch user:", err);

    return (
      <main className="p-10">
        <h1 className="text-2xl font-bold">UID: {uid}</h1>
        <p className="text-red-500">Failed to fetch player data</p>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center sm:py-10 sm:px-4 w-full min-h-screen bg-blue-950">
      <section className="max-w-3xl w-full bg-beige-background flex flex-col gap-8 sm:rounded-xl overflow-hidden pb-4 text-beige-text">
        <ProfileBanner
          profileBannerID={user.profileCard?.pictures?.[1]?.name || ""}
          profileImgUrl={user.profilePicture?.icon?.url || ""}
          playerName={user.nickname || "Traveler"}
          playerUID={uid}
          playerSignature={user.signature || "no signature"}
          playerAdventureRank={user.level || 0}
          playerWorldLevel={user.worldLevel || 0}
        />

        <CharactersOverview
          characters={(user.characters ?? []).map((char: any) => ({
            fullName: char.weapon?.location || "",
            charName: char.characterData?.details?._nameId || "",
            rarity: char.characterData?.stars || 0,
            element: char.characterData?.element?.id || "",
          }))}
        />

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
