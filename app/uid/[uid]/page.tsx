import CharacterCard from "@/components/CharacterCard";
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
  const enka = new EnkaClient({ cacheDirectory: cachePath });

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
    console.error("Failed to fetch user:", err);
    return (
      <main className="p-10">
        <h1 className="text-2xl font-bold">UID: {uid}</h1>
        <p className="text-red-500">Failed to fetch player data</p>
      </main>
    );
  }

  console.log(user);

  const characters = user.characters ?? [];

  return (
    <main className="py-10 px-4 flex flex-col items-center justify-center">
      <section className="max-w-3xl w-full">
        <h1 className="text-2xl mb-6">UID: {uid}</h1>
        <div className="grid grid-cols-4 lg:grid-cols-6 gap-4">
          {characters.map((char: any, i) => {
            //console.log(char);

            return (
              <CharacterCard
                key={i}
                props={{
                  fullName: char.weapon.location,
                  charName: char.characterData.details._nameId,
                  rarity: char.characterData.stars,
                  element: char.characterData.element.id,
                }}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}
