import { useState } from "react";
import { FaHammer, FaGithub, FaGlobe, FaRegStar } from "react-icons/fa6";
import { usePageTitle } from "@/hooks/use-pagetitle";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import AllRepoData from "@/data/repos.json";

type SortByType = "stars" | "updated" | "created";

const allTopics = Array.from(
    new Set(
        Object.values(AllRepoData)
            .filter((repo) => repo.show)
            .flatMap((repo) => repo.topics ?? [])
    )
).sort();

export default function Projects() {
    const [sortBy, setSortBy] = useState<SortByType>("updated");
    const [topicFilter, setTopicFilter] = useState("all");

    usePageTitle("Projects");

    const filteredProjects = (Object.keys(AllRepoData) as (keyof typeof AllRepoData)[])
        .filter((project_name) => {
            const project = AllRepoData[project_name];
            const topics = (project.topics ?? []) as string[];
            const matchesTopic = topicFilter === "all" || topics.includes(topicFilter);
            return project.show === true && matchesTopic;
        })
        .sort((a, b) => {
            const aData = AllRepoData[a];
            const bData = AllRepoData[b];

            if (sortBy === "stars") {
                return (bData.stargazers_count ?? 0) - (aData.stargazers_count ?? 0);
            } else if (sortBy === "created") {
                return new Date(bData.created_at).getTime() - new Date(aData.created_at).getTime();
            } else {
                return new Date(bData.pushed_at).getTime() - new Date(aData.pushed_at).getTime();
            }
        });

    return (
        <div className="flex flex-1 flex-col items-center gap-10">
            <div className="w-full max-w-6xl space-y-10">
                <div className="flex flex-row justify-center items-center gap-4 text-4xl font-semibold">
                    <FaHammer />
                    Projects
                </div>

                <div className="flex justify-between flex-wrap gap-2 items-center mx-2 sm:mx-6 my-1 relative -top-2">
                    <TopicFilter topicFilter={topicFilter} setTopicFilter={setTopicFilter} />
                    <SortSelector sortBy={sortBy} setSortBy={setSortBy} />
                </div>

                <Separator />

                <div className="grid grid-cols-1 w-full gap-4 px-2 sm:px-6">
                    {filteredProjects.map((projectName) => (
                        <ProjectCard
                            key={projectName}
                            project_name={projectName}
                            setTopicFilter={setTopicFilter}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

function TopicFilter({
    topicFilter,
    setTopicFilter,
}: {
    topicFilter: string;
    setTopicFilter: (val: string) => void;
}) {
    return (
        <div className="flex items-center gap-2">
            <label>Filter by topic:</label>
            <Select value={topicFilter} onValueChange={setTopicFilter}>
                <SelectTrigger className="w-[180px] cursor-pointer">
                    <SelectValue placeholder="Topic" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">📂 All Topics</SelectItem>
                    {allTopics.map((topic) => (
                        <SelectItem key={topic} value={topic}>
                            {topic}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {topicFilter !== "all" && (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setTopicFilter("all")}
                    className="px-2 text-sm cursor-pointer text-muted-foreground"
                >
                    Clear filter ✕
                </Button>
            )}
        </div>
    );
}

function SortSelector({
    sortBy,
    setSortBy,
}: {
    sortBy: SortByType;
    setSortBy: (val: SortByType) => void;
}) {
    return (
        <div className="flex items-center gap-2">
            <label>Sort by:</label>
            <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px] cursor-pointer">
                    <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="updated">🕒 Last Updated</SelectItem>
                    <SelectItem value="created">📅 Created Time</SelectItem>
                    <SelectItem value="stars">⭐ Star Count</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}

function ProjectCard({
    project_name,
    setTopicFilter,
}: {
    project_name: keyof typeof AllRepoData;
    setTopicFilter: (val: string) => void;
}) {
    const repo = AllRepoData[project_name];
    const {
        html_url,
        preview_image,
        display_name,
        name,
        description,
        topics = [],
        language,
        stargazers_count,
        homepage,
    } = repo;

    return (
        <Card className="rounded-lg overflow-hidden gap-0 py-0 w-full">
            <div className="flex flex-col lg:flex-row">
                <a href={html_url} target="_blank" rel="noopener noreferrer" className="block">
                    <div className="aspect-3/2 w-full max-h-72 lg:max-w-78 lg:h-52 overflow-hidden">
                        {preview_image ? (
                            <img
                                src={preview_image}
                                alt={name || "Project image"}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center p-4 w-full h-full bg-muted">
                                <span className="text-lg font-semibold opacity-80 text-center">
                                    {name || "Unnamed Project"}
                                </span>
                                <span className="text-sm text-muted-foreground text-center">
                                    Image not available
                                </span>
                            </div>
                        )}
                    </div>
                </a>

                <div className="w-full border-t block lg:hidden" />
                <div className="h-full border-l hidden lg:block" />

                <div className="flex flex-col p-4 lg:py-2.5 lg:px-5 flex-1 lg:h-52">
                    <ScrollArea className="flex-1 min-h-0">
                        <div className="flex flex-col gap-y-2">
                            <div className="text-lg font-semibold">
                                {html_url ? (
                                    <a
                                        href={html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="GitHub repository"
                                        className="hover:underline underline-offset-4"
                                    >
                                        {display_name || name}
                                    </a>
                                ) : (
                                    display_name || name
                                )}
                            </div>

                            <p className="text-sm text-muted-foreground">
                                {description || "Details unavailable"}
                            </p>

                            {topics.length > 0 && (
                                <div className="flex flex-wrap gap-1.5">
                                    {topics.map((topic, idx) => (
                                        <Button
                                            key={idx}
                                            variant="secondary"
                                            size="sm"
                                            onClick={() => setTopicFilter(topic)}
                                            className="rounded-sm cursor-pointer font-normal px-2 text-sm"
                                        >
                                            {topic}
                                        </Button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </ScrollArea>

                    <div className="flex flex-row items-center justify-between text-muted-foreground pt-2">
                        <div className="flex items-center gap-2 text-sm">
                            <p>Language: {language || "Unknown"}</p>
                            {stargazers_count !== null && (
                                <a
                                    href={`${html_url}/stargazers`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Stargazers"
                                    className="flex items-center gap-1 text-yellow-600 hover:text-yellow-500"
                                >
                                    <FaRegStar className="w-4 h-4" />
                                    <span>{stargazers_count}</span>
                                </a>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            {homepage && (
                                <a
                                    href={homepage}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Project homepage"
                                    className="hover:text-foreground"
                                >
                                    <FaGlobe className="w-6 h-6" />
                                </a>
                            )}
                            {html_url && (
                                <a
                                    href={html_url}
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
