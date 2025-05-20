import { useEffect } from "react";
import { Separator } from "@/components/ui/separator";

import Introduction from "./sections/introduction";
import Experience from "./sections/experience";
import Publication from "./sections/publication";
import Project from "./sections/project";
import Talk from "./sections/talk";

export default function About() {
    useEffect(() => {
        document.title = "About Me - SimplePlain";
    }, []);

    return (
        <div className="flex flex-1 flex-col items-center gap-12">
            <Introduction />
            <Experience />
            <Separator orientation="horizontal" className="max-w-5xl mt-8" />
            <Publication />
            <Separator orientation="horizontal" className="max-w-5xl mt-8" />
            <Project />
            <Separator orientation="horizontal" className="max-w-5xl mt-8" />
            <Talk />
        </div>
    );
}
