export interface CharacterStatsProps {
  achievements: number;
  friendships: number;
  spiralAbyss: {
    floor: number;
    chamber: number;
    stars: number;
  };
  theather: {
    act: number;
    stars: number;
  };
  stygian: {
    difficulty: number;
    clearTime: number;
  };
}

type StatItem = {
  icon: string;
  label: string;
  value: React.ReactNode;
};

export default function CharacterStats({
  achievements,
  friendships,
  spiralAbyss,
  theather,
  stygian,
}: CharacterStatsProps) {
  const stats: StatItem[] = [
    {
      icon: "https://static.wikia.nocookie.net/gensin-impact/images/c/cc/Icon_Profile_Achievement.png/revision/latest/scale-to-width-down/60",
      label: "Total Achievements",
      value: <p>{achievements}</p>,
    },
    {
      icon: "https://static.wikia.nocookie.net/gensin-impact/images/9/96/Icon_Profile_Friendship_Level.png/revision/latest/scale-to-width-down/60",
      label: "Characters at maximum Friendship Level",
      value: <p>{friendships}</p>,
    },
    {
      icon: "https://static.wikia.nocookie.net/gensin-impact/images/c/c0/Icon_Profile_Spiral_Abyss.png/revision/latest/scale-to-width-down/60",
      label: "Spiral Abyss",
      value: (
        <div className="flex flex-row items-center">
          <p className="pr-2 border-r-2 border-beige-background-accent/50">
            {spiralAbyss.floor}-{spiralAbyss.chamber}
          </p>
          <div className="flex flex-row gap-2 items-center">
            <p className="pl-2">{spiralAbyss.stars}</p>
            <img
              className="h-8"
              src="https://static.wikia.nocookie.net/gensin-impact/images/1/1c/Icon_Abyssal_Star.png/revision/latest/scale-to-width-down/60"
            />
          </div>
        </div>
      ),
    },
    {
      icon: "https://static.wikia.nocookie.net/gensin-impact/images/f/ff/Icon_Profile_Imaginarium_Theater.png/revision/latest/scale-to-width-down/60",
      label: "Imaginarium Theater",
      value: (
        <div className="flex flex-row items-center">
          <p className="pr-2 border-r-2 border-beige-background-accent/50">
            Act {theather.act}
          </p>
          <div className="flex flex-row gap-2 items-center">
            <p className="pl-2">{theather.stars}</p>
            <img
              className="h-8"
              src="https://static.wikia.nocookie.net/gensin-impact/images/7/7a/Icon_Performance_Medal.png/revision/latest/scale-to-width-down/60"
            />
          </div>
        </div>
      ),
    },
    {
      icon: "https://static.wikia.nocookie.net/gensin-impact/images/e/e4/Icon_Profile_Stygian_Onslaught.png/revision/latest/scale-to-width-down/60",
      label: "Stygian Onslaught",
      value: (
        <div className="flex flex-row gap-2 items-center">
          <p>{stygian.clearTime}</p>
          <img
            className="h-8"
            src={`/images/stygian/Icon_Stygian_Onslaught_Medal_${stygian.difficulty}.webp`}
          />
        </div>
      ),
    },
  ];

  return (
    <section className="w-full flex flex-col gap-4 px-6">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="w-full flex flex-row justify-between items-center gap-8 border-b-2 pb-1 border-beige-background-accent/50"
        >
          <div className="flex flex-row gap-2 items-center">
            <img className="h-8" src={stat.icon} />
            <p>{stat.label}</p>
          </div>

          {stat.value}
        </div>
      ))}
    </section>
  );
}
