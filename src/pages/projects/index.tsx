import { useEffect } from "react";
import { FaHammer, FaGithub, FaGlobe, FaRegStar } from "react-icons/fa6";

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import AllRepoData from "@/data/repos.json";

export default function Projects() {
    useEffect(() => {
        document.title = "Projects - SimplePlain";
    }, []);

    return (
        <div className="flex flex-1 flex-col items-center gap-10">
            <div className="w-full max-w-6xl space-y-10">
                <div className="flex flex-row justify-center items-center gap-4 text-4xl font-semibold">
                    <FaHammer />
                    Projects
                </div>
                <Separator />

                <div className="grid grid-cols-1 w-full gap-4 px-6">
                    {(Object.keys(AllRepoData) as (keyof typeof AllRepoData)[])
                        .filter((project_name) => AllRepoData[project_name].show === true)
                        .sort(
                            (a, b) =>
                                new Date(AllRepoData[b].pushed_at).getTime() -
                                new Date(AllRepoData[a].pushed_at).getTime()
                        )
                        .map((project_name) => (
                            <ProjectCard key={project_name} project_name={project_name} />
                        ))}
                </div>
            </div>
        </div>
    );
}

function ProjectCard({ project_name }: { project_name: keyof typeof AllRepoData }) {
    const repoData = AllRepoData[project_name];

    return (
        <Card className="rounded-lg overflow-hidden gap-0 py-0 w-full">
            <div className="flex flex-col lg:flex-row">
                <a
                    href={repoData.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                >
                    <div className="aspect-3/2 w-full max-h-72 lg:h-48 overflow-hidden">
                        {repoData.preview_image ? (
                            <img
                                src={repoData.preview_image}
                                alt={repoData.name || "Project image"}
                                className="w-full h-full object-cover"
                                style={{ overflowClipMargin: "unset" }}
                                loading="lazy"
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center p-4 w-full h-full bg-muted">
                                <span className="text-lg font-semibold opacity-80 text-center">
                                    {repoData.name || "Unnamed Project"}
                                </span>
                                <span className="text-sm text-muted-foreground text-center">
                                    Image not available
                                </span>
                            </div>
                        )}
                    </div>
                </a>

                <hr className="border-t" />

                <div className="flex flex-col lg:ml-4 p-4 gap-y-2 flex-1 h-auto lg:h-48">
                    <div className="text-lg font-semibold line-clamp-2">
                        {repoData.html_url ? (
                            <a
                                href={repoData.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub repository"
                                className="cursor-pointer hover:underline underline-offset-4"
                            >
                                {repoData.display_name || repoData.name}
                            </a>
                        ) : (
                            repoData.display_name || repoData.name
                        )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {repoData.description || "Details unavailable"}
                    </p>
                    {repoData.topics.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {repoData.topics.map((topic, idx) => (
                                <span key={idx} className="bg-muted text-sm px-2 py-1 rounded-sm">
                                    {topic}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="flex flex-row items-center justify-between text-muted-foreground mt-auto pt-2">
                        <div className="flex items-center gap-2">
                            <p className="text-sm">Language: {repoData.language || "Unknown"}</p>
                            {repoData.stargazers_count !== null && (
                                <a
                                    href={`${repoData.html_url}/stargazers`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Stargazers"
                                    className="flex items-center gap-1 text-sm text-yellow-600 hover:text-yellow-500"
                                >
                                    <FaRegStar className="w-4 h-4" />
                                    <span>{repoData.stargazers_count}</span>
                                </a>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            {repoData.homepage && (
                                <a
                                    href={repoData.homepage}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Project homepage"
                                    className="hover:text-foreground"
                                >
                                    <FaGlobe className="w-6 h-6" />
                                </a>
                            )}
                            {repoData.html_url && (
                                <a
                                    href={repoData.html_url}
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
            </div>
        </Card>
    );
}
