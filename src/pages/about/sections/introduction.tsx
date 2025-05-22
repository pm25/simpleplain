import { FaRegEnvelope } from "react-icons/fa6";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { UserInfo } from "@/data/profile";

export default function Introduction() {
    return (
        <div className="flex flex-col sm:flex-row items-center gap-8 md:gap-12 lg:gap-16 mx-auto">
            <Profile />
            <Biography />
        </div>
    );
}

function Profile() {
    return (
        <div className="flex flex-col items-center gap-y-4 shrink-0">
            <img
                src={UserInfo.profile_url}
                alt="Profile"
                className="w-60 h-auto rounded-lg object-cover"
            />
            <div className="flex flex-col items-center gap-y-2">
                <p className="text-3xl font-semibold text-foreground">{UserInfo.name}</p>
                <p className="text-lg font-medium text-muted-foreground">{UserInfo.headline}</p>
                <p className="flex flex-row items-center gap-2 text-base font-medium text-foreground opacity-80">
                    <FaRegEnvelope className="w-4 h-4" />
                    {UserInfo.email}
                </p>
                <TooltipProvider delayDuration={100}>
                    <div className="flex flex-row flex-wrap justify-center gap-y-2 gap-x-4 py-2 text-foreground max-w-64">
                        {UserInfo.links.map((item, index) => (
                            <a
                                key={index}
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="shrink-0"
                            >
                                <Tooltip>
                                    <TooltipTrigger>
                                        <item.icon
                                            className="w-8 h-8 cursor-pointer opacity-80 hover:opacity-100 transition-opacity duration-50"
                                            aria-label={item.name}
                                        />
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom">
                                        <p>{item.name}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </a>
                        ))}
                    </div>
                </TooltipProvider>
            </div>
        </div>
    );
}

function Biography() {
    return (
        <div className="prose dark:prose-invert min-w-64 max-w-prose w-full px-4 sm:px-0">
            <div className="text-2xl font-semibold mb-2">About Me</div>
            {UserInfo.biography ? (
                <div
                    className="text-justify hyphens-auto break-words"
                    dangerouslySetInnerHTML={{ __html: UserInfo.biography }}
                    aria-label="User biography"
                />
            ) : (
                <p className="text-gray-500 italic">No biography available.</p>
            )}
        </div>
    );
}
