import CharacterCard from "./CharacterCard";

export interface CharacterOverviewProps {
  characters: {
    fullName: string;
    charName: string;
    rarity: number;
    element: string;
  }[];
}

export default function CharactersOverview({
  characters,
}: CharacterOverviewProps) {
  if (characters.length === 0) {
    return (
      <section className="w-full flex flex-col justify-center items-center px-4 text-center py-12 text-beige-background-accent text-wrap">
        <p>
          No Characters found, profile may be private or no Characters are added
          yet.
        </p>
      </section>
    );
  }

  return (
    <section className="grid grid-cols-4 sm:grid-cols-6 gap-4 px-4">
      {characters.map((char, i) => (
        <CharacterCard
          key={i}
          props={{
            fullName: char.fullName,
            charName: char.charName,
            rarity: char.rarity,
            element: char.element,
          }}
        />
      ))}
    </section>
  );
}
