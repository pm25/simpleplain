import { FaUsers, FaBook, FaRegCalendar } from "react-icons/fa6";

import { PubData } from "@/data/publications";

export default function Publication() {
    return (
        <div className="w-full max-w-5xl space-y-6">
            <div className="flex flex-row justify-center items-center gap-2 text-plus font-semibold">
                <FaBook />
                Publications
            </div>

            <div className="space-y-3 px-6 lg:px-12">
                {PubData.publications.map((pub, index) => (
                    <div key={index} className="space-y-0.5">
                        <a
                            href={pub.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-base font-semibold leading-tight hover:underline underline-offset-4"
                        >
                            {pub.title}
                        </a>

                        <span className="text-sm sm:text-base grid grid-cols-[auto_1fr] items-center gap-2 text-muted-foreground">
                            <FaUsers />
                            <span className="truncate">
                                {pub.authors.split(", ").map((author, i) => (
                                    <span
                                        key={i}
                                        className={
                                            author === PubData.author_name ? "font-semibold" : ""
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
                ))}
            </div>
        </div>
    );
}
