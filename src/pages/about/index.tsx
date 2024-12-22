import Introduction from "./introduction";
import Experience from "./experience";

export default function About() {
    return (
        <div className="flex flex-col items-center p-8 gap-8">
            <Introduction />
            <Experience />
        </div>
    );
}
