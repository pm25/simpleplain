import {
    FaLinkedin,
    FaGoogleScholar,
    FaRegIdBadge,
    FaGithub,
    FaSquareFacebook,
    FaRegEnvelope,
} from "react-icons/fa6";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const user = {
    name: "Pin-Yen Huang",
    profile_url: "https://avatars.githubusercontent.com/u/33774054?v=4",
    headline: "CLLab • National Taiwan University",
    email: "pyhuang97@gmail.com",
    links: [
        {
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/py-huang",
            icon: FaLinkedin,
        },
        {
            name: "Google Scholar",
            url: "https://scholar.google.com.tw/citations?user=nQdpH2MAAAAJ",
            icon: FaGoogleScholar,
        },
        {
            name: "Résumé",
            url: "https://pm25.github.io/static/media/cv_v3.1ac3c71f.pdf",
            icon: FaRegIdBadge,
        },
        {
            name: "Github",
            url: "https://github.com/pm25",
            icon: FaGithub,
        },
        {
            name: "Facebook",
            url: "https://www.facebook.com/pyhuang97",
            icon: FaSquareFacebook,
        },
    ],
    biography: `
        I'm currently working on [your field or project] and has a deep interest in
        [specific area of focus]. With a background in [mention education or professional
        background], they have contributed to [mention any notable work or achievements, if
        applicable]. [Your Name] is passionate about [mention specific interests or goals]
        and is committed to furthering knowledge in this area. Outside of [work/study], they
        enjoy [mention hobbies or personal interests]. Feel free to reach out via [email or
        contact form] for more information or collaboration inquiries.
    `,
};

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
                src={user.profile_url}
                alt="Profile"
                className="w-60 h-auto rounded-lg object-cover"
            />
            <div className="flex flex-col items-center gap-y-2">
                <p className="text-3xl font-semibold text-foreground">{user.name}</p>
                <p className="text-lg font-medium text-muted-foreground">{user.headline}</p>
                <p className="flex flex-row items-center gap-2 text-base font-medium text-foreground opacity-80">
                    <FaRegEnvelope className="w-4 h-4" />
                    {user.email}
                </p>
                <TooltipProvider delayDuration={100}>
                    <div className="flex flex-row flex-wrap justify-center gap-y-2 gap-x-4 py-2 text-foreground max-w-64">
                        {user.links.map((item, index) => (
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
                                            className="w-8 h-8 cursor-pointer opacity-80 hover:opacity-100 transition-opacity duration-100"
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
        <div className="min-w-64 max-w-prose w-full px-4 sm:px-0">
            <div className="text-2xl font-semibold mb-2">About Me</div>
            <p className="text-justify hyphens-auto break-words">{user.biography}</p>
        </div>
    );
}
