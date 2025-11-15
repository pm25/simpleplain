import { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router";
import fm from "front-matter";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import Giscus from "@giscus/react";
import { FaArrowLeft } from "react-icons/fa6";

import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/components/theme-provider";
import { usePageTitle } from "@/hooks/use-pagetitle";
import { Button } from "@/components/ui/button";

interface Metadata {
    title?: string;
}

// import markdown files lazily
const markdownFiles = import.meta.glob("/src/data/articles/*.md", {
    query: "?raw",
    import: "default",
    eager: false,
});

export default function Article() {
    const { slug } = useParams<{ slug: string }>();
    const [content, setContent] = useState<string>("");
    const [metadata, setMetadata] = useState<Metadata>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    usePageTitle(metadata.title ?? slug ?? "");

    useEffect(() => {
        if (!slug) return;

        setLoading(true);
        setError(null);

        const path = `/src/data/articles/${slug}.md`;

        if (markdownFiles[path]) {
            markdownFiles[path]()
                .then((rawContent) => {
                    const { attributes, body } = fm(rawContent as string) as {
                        attributes: Metadata;
                        body: string;
                    };
                    setContent(body);
                    setMetadata(attributes);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setError("Failed to load the article.");
                    setMetadata({ title: "Error" });
                    setLoading(false);
                });
        } else {
            setError(`The article "${slug}" could not be found.`);
            setContent("");
            setMetadata({ title: "Not Found" });
            setLoading(false);
        }
    }, [slug]);

    if (error) {
        return (
            <div className="flex justify-center">
                <div className="text-center max-w-6xl w-full bg-muted rounded-lg space-y-4 p-6 sm:p-12 border shadow-sm">
                    <div className="text-4xl font-semibold">{metadata.title || "Error"}</div>
                    <p>{error}</p>
                    <Button asChild variant="outline" className="mt-2 gap-1">
                        <Link to="/articles">
                            <FaArrowLeft className="w-4 h-4" /> Back to Articles
                        </Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="prose dark:prose-invert max-w-6xl w-full bg-muted rounded-lg overflow-hidden p-6 sm:p-12 border shadow-sm">
                <ReactMarkdown rehypePlugins={[rehypeRaw]} skipHtml={false}>
                    {content}
                </ReactMarkdown>

                {!loading && <Separator className="my-6 sm:my-12" />}
                {!loading && <ArticleComments />}
            </div>

            <div className="relative w-full max-w-6xl mt-4">
                <div className="absolute top-0 right-0">
                    <Button
                        asChild
                        variant="ghost"
                        size="default"
                        className="gap-1 text-muted-foreground"
                    >
                        <Link to="/articles">
                            <FaArrowLeft className="w-4 h-4" /> Back to Articles
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}

function ArticleComments() {
    const location = useLocation();

    const { theme } = useTheme();
    const [giscusTheme, setGiscusTheme] = useState<"light" | "dark_dimmed">("light");

    useEffect(() => {
        if (theme === "dark") {
            setGiscusTheme("dark_dimmed");
        } else if (theme === "light") {
            setGiscusTheme("light");
        } else {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            setGiscusTheme(prefersDark ? "dark_dimmed" : "light");
        }
    }, [theme]);

    return (
        <Giscus
            repo="pm25/showlit"
            repoId="R_kgDONgMOyA"
            category="General"
            categoryId="DIC_kwDONgMOyM4Cq4Ga"
            mapping="specific"
            term={location.pathname}
            strict="0"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="top"
            theme={giscusTheme}
            lang="en"
            loading="lazy"
        />
    );
}
