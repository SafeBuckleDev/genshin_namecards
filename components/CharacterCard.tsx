export interface CardProps {
  props: {
    charName: string;
    fullName: string;
    rarity: number;
    element: string;
  };
}

export default function CharacterCard({ props }: CardProps) {
  const formattedName = props.fullName
  .replace(/([a-z])([A-Z])/g, "$1 $2");

  const displayName =
    formattedName.length > 8
      ? formattedName.slice(0, 8) + "..."
      : formattedName;

  const bgColor =
    props.rarity === 5
      ? "bg-linear-to-br from-[#855722] to-40% to-[#c87b24]" // 5-star
      : props.rarity === 4
        ? "bg-linear-to-br from-[#6f518f] to-40% to-[#9470bb]" // 4-star
        : "bg-gray-300"; // fallback

  return (
    <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg hover:scale-105 transition">
      <div className={`bg-[#e9e5dc]`}>
        <div
          className={`relative w-full aspect-square overflow-hidden rounded-br-3xl ${bgColor}`}
        >
          <img
            className="w-full h-full"
            src={`https://gi.yatta.moe/assets/UI/UI_AvatarIcon_${props.charName}.png?vh=2024123000`}
          />

          <div className="absolute top-1 left-1 h-6 xs:h-8 aspect-square z-10">
            <img
              className="w-full h-full"
              src={`https://gi.yatta.moe/assets/UI/UI_Buff_Element_${props.element}.png`}
              alt="element"
            />
          </div>
        </div>
        <div className="flex flex-col h-9 justify-around py-1 text-center text-character-blue xs:text-md text-xs">
          <p>{displayName}</p>
        </div>
      </div>
    </div>
  );
}
