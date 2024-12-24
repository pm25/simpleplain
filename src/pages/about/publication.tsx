import { FaUsers, FaBook } from "react-icons/fa6";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const user = {
    author_name: "Pin-Yen Huang",
    publications: [
        {
            title: "RankUp: Boosting Semi-Supervised Regression with an Auxiliary Ranking Classifier",
            authors: "Pin-Yen Huang, Szu-Wei Fu, Yu Tsao",
            year: 2024,
            booktitle: "Neural Information Processing Systems (NeurIPS)",
            link: "https://arxiv.org/abs/2410.22124",
        },
        {
            title: "An Enhanced Mondrian Anonymization Model based on Self-Organizing Map",
            authors: "Peter Shaojui Wang, Pin-Yen Huang, Yu-An Tsai, Raylin Tso",
            year: 2020,
            booktitle: "15th Asia Joint Conference on Information Security (AsiaJCIS)",
            link: "https://ieeexplore.ieee.org/abstract/document/9194139",
        },
        {
            title: "Title",
            authors: "Author",
            year: 2024,
            booktitle: "Booktitle",
            link: "https://example.com",
        },
        {
            title: "Title",
            authors: "Author",
            year: 2024,
            booktitle: "Booktitle",
            link: "https://example.com",
        },
        {
            title: "Title",
            authors: "Author",
            year: 2024,
            booktitle: "Booktitle",
            link: "https://example.com",
        },
    ],
};

export default function Publication() {
    return (
        <div className="w-full max-w-[64rem] rounded-xl bg-muted p-4 sm:p-8">
            <div className="text-2xl font-semibold text-center mb-6">Publications</div>

            <ul className="space-y-4">
                {user.publications.map((pub, index) => (
                    <li key={index} className="bg-white shadow-sm rounded-xl py-4 px-8">
                        <a
                            href={pub.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg font-semibold hover:underline"
                        >
                            {pub.title}
                        </a>
                        <span className="grid grid-cols-[auto,1fr] items-center gap-2 text-muted-foreground">
                            <FaUsers className="w-4 h-4" />
                            <span className="truncate">
                                {pub.authors.split(", ").map((author, i) => (
                                    <span
                                        key={i}
                                        className={
                                            author === user.author_name ? "font-semibold" : ""
                                        }
                                    >
                                        {author}
                                        {i < pub.authors.split(", ").length - 1 && ", "}
                                    </span>
                                ))}
                            </span>
                        </span>
                        <div className="grid grid-cols-[auto,1fr] items-center gap-2 text-muted-foreground">
                            <FaBook className="w-4 h-4" />
                            <div className="truncate">{pub.booktitle}</div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
