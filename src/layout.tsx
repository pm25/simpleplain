import { Outlet } from "react-router";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

export default function Layout() {
    return (
        <SidebarProvider defaultOpen={false}>
            <AppSidebar variant="floating" />
            <SidebarInset className="min-h-screen">
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="fixed flex items-center px-4">
                        <SidebarTrigger className="-ml-1" />
                    </div>
                </header>

                <div className="p-6 sm:p-12 flex-grow">
                    <Outlet />
                </div>

                {/* It would be greatly appreciated if you could leave the footer as it is! */}
                <footer className="text-sm w-full text-center border-t py-2 sm:py-4">
                    Created by
                    <Button variant="link" className="px-1">
                        <a
                            href="https://github.com/pm25/simpleplain"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            SimplePlain Template
                        </a>
                    </Button>
                </footer>
            </SidebarInset>
        </SidebarProvider>
    );
}
