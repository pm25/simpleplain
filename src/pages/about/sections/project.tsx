import { useState, useEffect } from "react";
import { FaDiagramProject, FaGithub, FaGlobe, FaRegStar } from "react-icons/fa6";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const projects = [
    {
        name: "Personal Website Template",
        github: "pm25/personal-website-template",
    },
    {
        name: "SimplePlus Beamer Theme",
        img: "https://raw.githubusercontent.com/PM25/simpleplus-beamerTheme/master/preview/1.webp",
        github: "pm25/simpleplus-beamertheme",
    },
    {
        name: "SimpleDarkBlue Beamer Theme",
        img: "https://raw.githubusercontent.com/pm25/simpledarkblue-beamertheme/master/preview/0001.webp",
        github: "pm25/simpledarkBlue-beamertheme",
    },
    {
        name: "Semi-Supervised Regression",
        img: "https://pm25.github.io/Research-Figures/rankup/figures/rankup-illustration.png",
        github: "pm25/semi-supervised-regression",
    },
    {
        name: "Title",
        github: "pm25/personal-website-template",
    },
    {
        name: "Title",
        github: "pm25/personal-website-template",
    },
];

interface ProjectProp {
    name: string;
    img?: string;
    github: string;
}

export default function Project() {
    return (
        <Card className="rounded-lg w-full max-w-[64rem]">
            <CardHeader>
                <CardTitle className="flex flex-row justify-center items-center gap-2">
                    <FaDiagramProject />
                    Projects
                </CardTitle>
            </CardHeader>

            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

function ProjectCard({ project }: { project: ProjectProp }) {
    const [starCount, setStarCount] = useState<number | null>(null);
    const [description, setDescription] = useState<string | null>(null);
    const [topics, setTopics] = useState<string[]>([]);
    const [language, setLanguage] = useState<string | null>(null);
    const [homepage, setHomepage] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProjectDetails() {
            if (project.github) {
                try {
                    const res = await fetch(`https://api.github.com/repos/${project.github}`);
                    if (!res.ok) {
                        throw new Error("GitHub API request failed");
                    }
                    const data = await res.json();
                    setStarCount(data.stargazers_count);
                    setDescription(data.description);
                    setTopics(data.topics || []);
                    setLanguage(data.language);
                    setHomepage(data.homepage || null);
                } catch (err) {
                    console.error("Error fetching project details:", err);
                    setStarCount(null);
                    setDescription(null);
                    setTopics([]);
                    setLanguage(null);
                    setHomepage(null);
                }
            }
        }

        fetchProjectDetails();
    }, [project.github]);

    return (
        <Card className="rounded-lg overflow-hidden">
            <div className="aspect-video w-full overflow-hidden">
                {project.img ? (
                    <img
                        src={project.img}
                        alt={project.name || "Project image"}
                        className="w-full h-full object-contain"
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center p-4 w-full h-full bg-muted">
                        <span className="text-xl font-semibold opacity-80">
                            {project.name || "Unnamed Project"}
                        </span>
                        <span className="text-sm text-muted-foreground">Image not available</span>
                    </div>
                )}
            </div>
            <hr className="border-t" />

            <div className="flex flex-col py-3 px-4 gap-y-2">
                <div className="text-lg font-semibold line-clamp-2">{project.name}</div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                    {description || "Details unavailable"}
                </p>
                {topics.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {topics.map((topic, idx) => (
                            <span key={idx} className="bg-muted text-sm px-2 py-1 rounded-md">
                                {topic}
                            </span>
                        ))}
                    </div>
                )}

                <div className="flex flex-row items-center justify-between text-muted-foreground mt-2">
                    <div className="flex items-center gap-2">
                        <div className="text-sm text-muted-foreground">
                            <p>Language: {language || "Unknown"}</p>
                        </div>

                        {starCount !== null && (
                            <a
                                href={`https://github.com/${project.github}/stargazers`}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Stargazers"
                                className="flex items-center gap-1 text-sm text-yellow-600 hover:text-yellow-500"
                            >
                                <FaRegStar className="w-4 h-4 fill-current" />
                                <span>{starCount}</span>
                            </a>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        {project.github && (
                            <a
                                href={`https://github.com/${project.github}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub repository"
                                className="hover:text-foreground"
                            >
                                <FaGithub className="w-6 h-6" />
                            </a>
                        )}
                        {homepage && (
                            <a
                                href={homepage}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Project website"
                                className="hover:text-foreground"
                            >
                                <FaGlobe className="w-6 h-6" />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
}
