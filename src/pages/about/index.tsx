import Introduction from "./introduction";
import Experience from "./experience";
import Publication from "./publication";
import Project from "./project";

export default function About() {
    return (
        <div className="flex flex-1 flex-col items-center gap-8">
            <Introduction />
            <Experience />
            <Publication />
            <Project />
        </div>
    );
}
