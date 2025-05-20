import { FaDiagramProject, FaGithub, FaGlobe, FaRegStar } from "react-icons/fa6";

import { Card } from "@/components/ui/card";
import repoData from "@/data/repos.json";

// uses the repository name as defined in data/repos.json (matches the GitHub repository name)
const projects_name = [
    "simpleplain",
    "pm25.github.io",
    "SimplePlus-BeamerTheme",
    "SimpleDarkBlue-BeamerTheme",
    "Semi-Supervised-Regression",
    "simpleplain",
] as (keyof typeof repoData)[];

export default function Project() {
    return (
        <div className="w-full max-w-5xl space-y-6">
            <div className="flex flex-row justify-center items-center gap-2 text-2xl font-semibold">
                <FaDiagramProject />
                Projects
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 px-6">
                {projects_name.map((project_name, index) => (
                    <ProjectCard key={index} project_name={project_name} />
                ))}
            </div>
        </div>
    );
}

function ProjectCard({ project_name }: { project_name: keyof typeof repoData }) {
    const data = repoData[project_name];

    if (!data) {
        return (
            <Card className="rounded-lg overflow-hidden">
                <div className="flex flex-col items-center justify-center p-4 w-full h-full bg-muted">
                    <span className="text-xl font-semibold opacity-80">Project not found</span>
                </div>
            </Card>
        );
    }

    return (
        <Card className="rounded-lg overflow-hidden">
            <div className="aspect-video w-full overflow-hidden">
                {data.preview_image ? (
                    <img
                        src={data.preview_image}
                        alt={data.name || "Project image"}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center p-4 w-full h-full bg-muted">
                        <span className="text-xl font-semibold opacity-80">
                            {data.name || "Unnamed Project"}
                        </span>
                        <span className="text-sm text-muted-foreground">Image not available</span>
                    </div>
                )}
            </div>
            <hr className="border-t" />

            <div className="flex flex-col py-3 px-4 gap-y-2">
                <div className="text-lg font-semibold line-clamp-2">
                    {data.display_name || data.name}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                    {data.description || "Details unavailable"}
                </p>
                {data.topics.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {data.topics.map((topic, idx) => (
                            <span key={idx} className="bg-muted text-sm px-2 py-1 rounded-md">
                                {topic}
                            </span>
                        ))}
                    </div>
                )}

                <div className="flex flex-row items-center justify-between text-muted-foreground mt-2">
                    <div className="flex items-center gap-2">
                        <div className="text-sm text-muted-foreground">
                            <p>Language: {data.language || "Unknown"}</p>
                        </div>

                        {data.stargazers_count !== null && (
                            <a
                                href={`${data.html_url}/stargazers`}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Stargazers"
                                className="flex items-center gap-1 text-sm text-yellow-600 hover:text-yellow-500"
                            >
                                <FaRegStar className="w-4 h-4 fill-current" />
                                <span>{data.stargazers_count}</span>
                            </a>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        {data.homepage && (
                            <a
                                href={data.homepage}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Project website"
                                className="hover:text-foreground"
                            >
                                <FaGlobe className="w-6 h-6" />
                            </a>
                        )}
                        {data.html_url && (
                            <a
                                href={data.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub repository"
                                className="hover:text-foreground"
                            >
                                <FaGithub className="w-6 h-6" />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
}
