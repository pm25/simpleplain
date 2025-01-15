import { useEffect } from "react";
import { Separator } from "@/components/ui/separator";

import Introduction from "./sections/introduction";
import Experience from "./sections/experience";
import Publication from "./sections/publication";
import Project from "./sections/project";
import Talk from "./sections/talk";

export default function About() {
    useEffect(() => {
        document.title = "About Me - My Website";
    }, []);

    return (
        <div className="flex flex-1 flex-col items-center gap-8">
            <Introduction />
            <Experience />
            <Separator orientation="horizontal" className="w-full max-w-[64rem] mt-4" />
            <Publication />
            <Separator orientation="horizontal" className="w-full max-w-[64rem] mt-4" />
            <Project />
            <Separator orientation="horizontal" className="w-full max-w-[64rem] mt-4" />
            <Talk />
        </div>
    );
}
