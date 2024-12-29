import Introduction from "./sections/introduction";
import Experience from "./sections/experience";
import Publication from "./sections/publication";
import Project from "./sections/project";

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
