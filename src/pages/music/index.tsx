import { FaMusic } from "react-icons/fa6";

import { usePageTitle } from "@/hooks/use-pagetitle";

export default function Music() {
    usePageTitle("Music");

    return (
        <div className="flex flex-1 flex-col items-center gap-10">
            <div className="w-full max-w-4xl space-y-10">
                <div className="space-y-4">
                    <div className="flex flex-row justify-center items-center gap-4 text-4xl font-semibold">
                        <FaMusic />
                        Music
                    </div>

                    <p className="text-center text-lg text-muted-foreground leading-relaxed italic opacity-80">
                        Some of my favorite songs and playlists.
                    </p>
                </div>

                <SpotifyEmbed />
            </div>
        </div>
    );
}

const SpotifyEmbed = () => {
    return (
        <iframe
            style={{ borderRadius: "12px" }}
            src="https://open.spotify.com/embed/playlist/"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify Playlist"
            className="w-full h-[50vh]"
        ></iframe>
    );
};
