import { FaUsers, FaBook, FaRegCalendar } from "react-icons/fa6";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const user = {
    author_name: "Pin-Yen Huang",
    publications: [
        {
            title: "RankUp: Boosting Semi-Supervised Regression with an Auxiliary Ranking Classifier",
            authors: "Pin-Yen Huang, Szu-Wei Fu, Yu Tsao",
            year: 2024,
            booktitle: "38th Neural Information Processing Systems (NeurIPS)",
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
            year: "year",
            booktitle: "Booktitle",
            link: "https://example.com",
        },
        {
            title: "Title",
            authors: "Author",
            year: "year",
            booktitle: "Booktitle",
            link: "https://example.com",
        },
        {
            title: "Title",
            authors: "Author",
            year: "year",
            booktitle: "Booktitle",
            link: "https://example.com",
        },
    ],
};

export default function Publication() {
    return (
        <Card className="w-full max-w-[64rem] rounded-xl bg-muted">
            <CardHeader>
                <CardTitle className="text-center">Publications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {user.publications.map((pub, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-none py-4 px-8">
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
                        <div className="grid grid-cols-[auto,1fr,auto] items-center gap-2 text-muted-foreground">
                            <FaBook className="w-4 h-4" />
                            <div className="truncate">{pub.booktitle}</div>
                            <div className="flex flex-row items-center gap-2 text-right">
                                <FaRegCalendar className="w-4 h-4" />
                                {pub.year}
                            </div>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
