import { usePageTitle } from "@/hooks/use-pagetitle";

export default function Movies() {
    usePageTitle("Movies");

    return (
        <div>
            <span className="text-2xl">Movies</span>
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
            </div>
            {/* <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
        </div>
    );
}
