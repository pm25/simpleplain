import { useState } from "react";
import { MdCoPresent } from "react-icons/md";
import { FaRegCalendar } from "react-icons/fa6";

import { TalksData } from "@/data/talks";

export default function Talk() {
    const [selectedTalk, setSelectedTalk] = useState<number | null>(null);

    const handleTalkClick = (index: number) => {
        setSelectedTalk((prevSelected) => (prevSelected === index ? null : index));
    };

    return (
        <div className="w-full max-w-5xl space-y-6">
            <div className="flex flex-row justify-center items-center gap-2 text-2xl font-semibold">
                <MdCoPresent />
                Presentations / Talks
            </div>

            <div className="px-6 py-2">
                {TalksData.map((talk, index) => (
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
                            <div className="text-base font-semibold">{talk.title}</div>
                            <div className="flex flex-row justify-between text-sm text-muted-foreground">
                                <p className="line-clamp-2">{talk.location}</p>
                                <p className="flex flex-row gap-1 items-center">
                                    <FaRegCalendar />
                                    {talk.date}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
