const { EnkaClient } = require("enka-network-api");
const path = require("path");

async function main() {
  const enka = new EnkaClient({
    defaultLanguage: "en",
    cacheDirectory: path.join(process.cwd(), "enka-cache"),
  });

  console.log("Downloading Enka cache...");

  await enka.cachedAssetsManager.fetchAllContents();

  console.log("Cache downloaded successfully!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
