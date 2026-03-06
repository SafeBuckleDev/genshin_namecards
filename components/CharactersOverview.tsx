import CharacterCard from "./CharacterCard";

export interface CharacterOverviewProps {
  characters: [
    {
      fullName: string;
      charName: string;
      rarity: number;
      element: string;
    },
  ];
}

export default function CharactersOverview({
  characters,
}: CharacterOverviewProps) {
  return (
    <section className="grid grid-cols-4 sm:grid-cols-6 gap-4 px-4">
      {characters.map((char, i) => {
        return (
          <CharacterCard
            key={i}
            props={{
              fullName: char.fullName,
              charName: char.charName,
              rarity: char.rarity,
              element: char.element,
            }}
          />
        );
      })}
    </section>
  );
}
