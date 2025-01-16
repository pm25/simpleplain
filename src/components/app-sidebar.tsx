import * as React from "react";
import { User, Clapperboard, Hammer, Music, Newspaper } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { Separator } from "@/components/ui/separator";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
    SidebarTrigger,
} from "@/components/ui/sidebar";

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "About",
            url: "/",
            icon: User,
        },
        {
            title: "Project",
            url: "/project",
            icon: Hammer,
        },
        {
            title: "Article",
            url: "/article",
            icon: Newspaper,
        },
        {
            title: "Movie",
            url: "/movie",
            icon: Clapperboard,
        },
        {
            title: "Music",
            url: "/music",
            icon: Music,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarTrigger className="flex aspect-square size-8 items-center justify-center hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" />
                <Separator orientation="horizontal" />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
