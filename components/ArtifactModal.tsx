"use client";

import { formatFightPropToName, formatStatValue } from "./CharacterModal";
import type { CharacterData } from "./CharactersOverview";

interface ArtifactModalProps {
  artifact: CharacterData["artifacts"][number];
  mouseX: number;
  mouseY: number;
}

export default function ArtifactModal({
  artifact,
  mouseX,
  mouseY,
}: ArtifactModalProps) {
    console.log(artifact);

  return (
    <div
      className="fixed z-50 w-64 aspect-[252/281] rounded-lg bg-black/80 text-white pointer-events-none"
      style={{
        left: mouseX + 12,
        top: mouseY + 12,
      }}
    >
        <div className="w-full h-full bg-red-100 relative">
            <div className="absolute z-60 w-full h-full">
                <div className="w-full h-8 px-4.5 py-0.5">
                    <h1>
                    {artifact.name.length > 18
                        ? `${artifact.name.slice(0, 18)}...`
                        : artifact.name}
                    </h1>
                </div>
                <div className="w-full h-29 px-4.5 relative">
                    <div className="w-28 aspect-square absolute right-2 top-0.5">
                        <img src={artifact.icon
                            .replace(
                                "https://homdgcat.wiki/homdgcat-res/Relic/",
                                "https://gi.yatta.moe/assets/UI/reliquary/",
                            )
                            .concat("?vh=2024123000")}
                        />
                    </div>

                    <div className="h-full flex flex-col justify-end pb-3">
                        <h2 className="text-white/50 h-4 text-sm">{artifact.mainStat.name}</h2>
                        <p className="text-[2rem] h-11">{formatStatValue(artifact.mainStat.value, artifact.mainStat.isPercent)}</p>
                        <div className="flex flex-row gap-0.5">
                            {[...Array(artifact.rarity ?? 0)].map((_, i) => (
                                <img
                                    key={i}
                                    className="h-4"
                                    src="/images/icons/rarity_star.png"
                                    alt="star"
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="w-full h-34 px-4.5 pb-1">
                    <div className="h-full w-full text-beige-text flex flex-col justify-end">
                        <div>
                            <p className="text-white px-1 bg-beige-text w-fit rounded-xs mb-1">+{artifact.level - 1}</p>
                        </div>
                        {artifact.subStats.map((stat, i) => (
                            <p key={i}>
                                {formatFightPropToName(stat.fightProp)?.replace(" percent", "")}+
                                {formatStatValue(stat.value, stat.isPercent)}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
            <img className="absolute top-0 z-50" src={`/images/artifact_bg/artifact_${artifact.rarity}_star.jpg`} />
        </div>
    </div>
  );
}