import { FaDiagramProject, FaGithub, FaGlobe, FaRegStar } from "react-icons/fa6";

import { Card } from "@/components/ui/card";
import { FeaturedRepoData } from "@/data/featured_repos";

export default function Project() {
    return (
        <div className="w-full max-w-5xl space-y-6">
            <div className="flex flex-row justify-center items-center gap-2 text-plus font-semibold">
                <FaDiagramProject />
                Projects
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 px-6">
                {FeaturedRepoData.map((repoData, index) => (
                    <ProjectCard key={index} repoData={repoData} />
                ))}
            </div>
        </div>
    );
}

function ProjectCard({ repoData }: { repoData: (typeof FeaturedRepoData)[number] }) {
    if (!repoData) {
        return (
            <Card className="rounded-lg overflow-hidden">
                <div className="flex flex-col items-center justify-center p-4 w-full h-full bg-muted">
                    <span className="text-xl font-semibold opacity-80">Project not found</span>
                </div>
            </Card>
        );
    }

    return (
        <Card className="rounded-lg overflow-hidden gap-0 py-0 w-full">
            <div className="flex flex-col">
                <a
                    href={repoData.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                >
                    <div className="aspect-3/2 w-full overflow-hidden">
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

                <div className="flex flex-col py-3 px-4 gap-y-2">
                    <div className="text-base font-semibold line-clamp-2">
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
                                <span key={idx} className="bg-muted text-sm px-2 py-0.5 rounded-sm">
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
