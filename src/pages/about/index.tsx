import Introduction from "./introduction";
import Experience from "./experience";
import Publication from "./publication";

export default function About() {
    return (
        <div className="flex flex-1 flex-col items-center p-12 gap-8">
            <Introduction />
            <Experience />
            <Publication />
        </div>
    );
}
