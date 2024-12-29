import { useState } from "react";
import { MdCoPresent } from "react-icons/md";
import { FaRegCalendar } from "react-icons/fa6";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const talks = [
    {
        title: "Cost Learning Network for Imbalanced Classification",
        location: "Taiwanese Association for Artificial Intelligence (TAAI)",
        date: "Dec 4, 2020",
    },
    {
        title: "Deep Learning with Keras",
        location: "University of Illinois Urbana-Champaign (UIUC), Prof. Stephen Boppart's Group",
        date: "Sep 4, 2019",
        image: "https://pm25.github.io/static/media/2019-9-4-workshop.b5d2675f.webp",
    },
];

export default function Talk() {
    const [selectedTalk, setSelectedTalk] = useState<number | null>(null);

    const handleTalkClick = (index: number) => {
        setSelectedTalk((prevSelected) => (prevSelected === index ? null : index));
    };

    return (
        <Card className="rounded-lg w-full max-w-[64rem]">
            <CardHeader>
                <CardTitle className="flex flex-row justify-center items-center gap-2">
                    <MdCoPresent />
                    Presentations / Talks
                </CardTitle>
            </CardHeader>

            <CardContent className="px-6">
                {talks.map((talk, index) => (
                    <div
                        key={index}
                        className={`flex flex-col gap-4 py-2 px-4 rounded-md ${
                            talk.image ? "cursor-pointer hover:bg-muted" : ""
                        }`}
                        onClick={() => handleTalkClick(index)}
                    >
                        {selectedTalk === index && talk.image && (
                            <img
                                src={talk.image}
                                alt={talk.title}
                                className="rounded-md w-full h-64 object-cover"
                                loading="lazy"
                            />
                        )}
                        <div className="flex flex-col gap-0.5">
                            <div className="text-lg font-semibold">{talk.title}</div>
                            <div className="flex flex-row justify-between text-sm text-muted-foreground">
                                <p>{talk.location}</p>
                                <p className="flex flex-row gap-1 items-center">
                                    <FaRegCalendar />
                                    {talk.date}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
