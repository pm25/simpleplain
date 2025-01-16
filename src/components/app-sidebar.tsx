import * as React from "react";
import { User, Clapperboard, Hammer, Music, Newspaper } from "lucide-react";

import { DarkModeToggleButton } from "@/components/mode-toggle";
import { NavMain } from "@/components/nav-main";
import { Separator } from "@/components/ui/separator";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenuButton,
    SidebarRail,
    SidebarTrigger,
} from "@/components/ui/sidebar";

const navMain = [
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
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenuButton tooltip="Toggle Sidebar" asChild>
                    <SidebarTrigger />
                </SidebarMenuButton>
                <Separator orientation="horizontal" />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={navMain} />
            </SidebarContent>
            <SidebarFooter>
                <DarkModeToggleButton />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
