import { useEffect } from "react";
import { FaHammer, FaGithub, FaGlobe, FaRegStar } from "react-icons/fa6";

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import repoData from "@/data/repos.json";

export default function Projects() {
    useEffect(() => {
        document.title = "Projects - SimplePlain";
    }, []);

    return (
        <div className="flex flex-1 flex-col items-center gap-10">
            <div className="w-full max-w-6xl space-y-10">
                <div className="flex flex-row justify-center items-center gap-4 text-4xl font-bold">
                    <FaHammer />
                    Projects
                </div>
                <Separator />

                <div className="grid grid-cols-1 gap-4 px-6">
                    {(Object.keys(repoData) as (keyof typeof repoData)[])
                        .filter((project_name) => repoData[project_name].show === true)
                        .sort(
                            (a, b) =>
                                new Date(repoData[b].pushed_at).getTime() -
                                new Date(repoData[a].pushed_at).getTime()
                        )
                        .map((project_name) => (
                            <ProjectCard key={project_name} project_name={project_name} />
                        ))}
                </div>
            </div>
        </div>
    );
}

function ProjectCard({ project_name }: { project_name: keyof typeof repoData }) {
    const data = repoData[project_name];

    return (
        <Card className="rounded-lg overflow-hidden gap-0 py-0">
            <div className="flex flex-row gap-4">
                {/* Thumbnail Section */}
                <a href={data.html_url} target="_blank" rel="noopener noreferrer" className="block">
                    <div className="aspect-3/2 w-72 flex-shrink-0 overflow-hidden">
                        {data.preview_image ? (
                            <img
                                src={data.preview_image}
                                alt={data.name || "Project image"}
                                className="w-full h-full object-cover"
                                style={{ overflowClipMargin: "unset" }}
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center p-4 w-full h-full bg-muted">
                                <span className="text-base font-semibold opacity-80">
                                    {data.name || "Unnamed Project"}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                    Image not available
                                </span>
                            </div>
                        )}
                    </div>
                </a>

                {/* Info Section */}
                <div className="flex flex-col p-4 gap-y-2 flex-1 h-[12rem]">
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

                    <div className="flex flex-row items-center justify-between text-muted-foreground mt-auto pt-2">
                        <div className="flex items-center gap-2">
                            <p className="text-sm">Language: {data.language || "Unknown"}</p>
                            {data.stargazers_count !== null && (
                                <a
                                    href={`${data.html_url}/stargazers`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-sm text-yellow-600 hover:text-yellow-500"
                                >
                                    <FaRegStar className="w-4 h-4" />
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
