export interface ProfileBannerProps {
    profileImgUrl: string;
    profileBannerID: string;

    playerName: string;
    playerUID: string;
    playerSignature: string;

    playerAdventureRank: number;
    playerWorldLevel: number;
}

export default function ProfileBanner({profileImgUrl, profileBannerID, playerName, playerUID, playerSignature, playerAdventureRank, playerWorldLevel} : ProfileBannerProps){
    return(
        <section className="flex flex-col">
            <div className="relative mb-13">
                <img className="w-full aspect-[16/6] object-cover" src={`https://gi.yatta.moe/assets/UI/namecard/${profileBannerID}.png?vh=2024123000`}/>

                <div className="absolute -bottom-13 h-26 w-full flex flex-col justify-center items-center">
                    <div className="h-26 aspect-square rounded-full p-1 bg-beige-background">
                        <img className="w-full aspect-square rounded-full" src={profileImgUrl} />
                    </div>
                </div>
            </div>

            <div className="text-center px-4 flex flex-col gap-4">
                <div>
                    <h1 className="text-3xl">{playerName}</h1>
                    <p className="text-beige-background-accent">UID: {playerUID}</p>
                </div>

                <div className="w-full p-2 border-2 border-beige-background-accent/50 text-left">
                    <p>{playerSignature}</p>
                </div>

                <div className="w-full bg-adventure-green flex flex-row justify-between px-2 py-1 text-white items-center">
                    <p>Adventure Rank</p>
                    <p className="text-lg">{playerAdventureRank}</p>
                </div>
                <div className="w-full bg-beige-background-accent text-white flex flex-row justify-between items-center px-2 py-1">
                    <p>World Level</p>
                    <p className="text-lg">{playerWorldLevel}</p>
                </div>
            </div>
        </section>
    );
}