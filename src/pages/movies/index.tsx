import { FaFilm } from "react-icons/fa6";

import { usePageTitle } from "@/hooks/use-pagetitle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const movies = [
    {
        title: "The Shawshank Redemption",
        poster: "https://media.themoviedb.org/t/p/w440_and_h660_face/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
        note: "A timeless story of hope and perseverance that reminds me to stay resilient, no matter the odds.",
    },
    {
        title: "Schindler's List",
        poster: "https://image.tmdb.org/t/p/original/doGEE2DgjET0XK0k9BozsMBES5H.jpg",
        note: "A powerful portrayal of courage and humanity in the face of unimaginable adversity.",
    },
    {
        title: "Interstellar",
        poster: "https://image.tmdb.org/t/p/original/mS4EvhsrT0SQZOlWrQEzWI5KiUa.jpg",
        note: "Blends science, love, and human ambition in a way that sparks my curiosity about the universe and our place in it.",
    },
    {
        title: "La La Land",
        poster: "https://image.tmdb.org/t/p/original/pfr9dwWqANfF6XohNZ1ANtcXSq2.jpg",
        note: "A beautiful reminder of dreams, sacrifice, and the bittersweet balance between passion and reality.",
    },
];

export default function Movies() {
    usePageTitle("Movies");

    return (
        <div className="flex flex-1 flex-col items-center gap-10">
            <div className="w-full max-w-6xl space-y-10">
                <div className="space-y-4">
                    <div className="flex flex-row justify-center items-center gap-4 text-4xl font-semibold">
                        <FaFilm />
                        Movies
                    </div>

                    <p className="text-center text-lg text-muted-foreground leading-relaxed italic opacity-80">
                        These are some of my favorite movies
                    </p>
                </div>

                <div className="grid w-full gap-4 px-2 sm:px-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {movies.map((movie) => (
                        <Card
                            key={movie.title}
                            className="rounded-lg overflow-hidden gap-0 py-0 w-full"
                        >
                            <img
                                src={movie.poster}
                                alt={movie.title}
                                className="aspect-2/3 w-full object-cover"
                            />
                            <div className="py-6">
                                <CardHeader>
                                    <CardTitle>{movie.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="py-0">
                                    <p className="text-sm text-muted-foreground">{movie.note}</p>
                                </CardContent>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
