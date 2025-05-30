import { Link } from "react-router";
import { FaUsers, FaBook, FaRegCalendar, FaArrowRight } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import { PubData } from "@/data/publications";

export default function Publication() {
    return (
        <div className="w-full max-w-5xl space-y-6">
            <div className="flex flex-row justify-center items-center gap-2 text-plus font-semibold">
                <FaBook />
                Publications
            </div>

            <div className="px-2 sm:px-6">
                {PubData.publications.map((pub, index) => (
                    <a
                        href={pub.link}
                        key={index}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-pointer"
                    >
                        <div className="space-y-0.5 py-2 px-4 hover:bg-muted rounded-md">
                            <div className="text-base font-semibold leading-tight">{pub.title}</div>

                            <span className="text-sm sm:text-base grid grid-cols-[auto_1fr] items-center gap-2 text-muted-foreground">
                                <FaUsers />
                                <span className="truncate">
                                    {pub.authors.split(", ").map((author, i) => (
                                        <span
                                            key={i}
                                            className={
                                                author === PubData.author_name
                                                    ? "font-semibold"
                                                    : ""
                                            }
                                        >
                                            {author}
                                            {i < pub.authors.split(", ").length - 1 && ", "}
                                        </span>
                                    ))}
                                </span>
                            </span>

                            <div className="text-sm sm:text-base grid grid-cols-[auto_1fr_auto] items-center gap-2 text-muted-foreground leading-tight">
                                <FaBook />
                                <div className="line-clamp-2">{pub.booktitle}</div>
                                <div className="text-sm grid grid-cols-[auto_1fr_auto] items-center gap-2 text-right">
                                    <FaRegCalendar />
                                    {pub.year}
                                </div>
                            </div>
                        </div>
                    </a>
                ))}
            </div>

            <div className="relative w-full">
                <div className="absolute right-6 top-2">
                    <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="gap-1 text-muted-foreground"
                    >
                        <Link to="/publications">
                            View all
                            <FaArrowRight className="w-4 h-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
