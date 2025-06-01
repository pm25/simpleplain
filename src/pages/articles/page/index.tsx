import { useEffect, useState } from "react";
import { useParams } from "react-router";
import fm from "front-matter";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import Giscus from "@giscus/react";

import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/components/theme-provider";

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
                    setError("Failed to load article.");
                    setLoading(false);
                });
        } else {
            setError("Article not found.");
            setContent("");
            setMetadata({ title: "Not Found" });
            setLoading(false);
        }
    }, [slug]);

    if (loading) {
        return (
            <div className="flex justify-center p-12">
                <p>Loading article...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center p-12">
                <h1 className="text-4xl">{metadata.title || "Error"}</h1>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="flex justify-center">
            <div className="prose dark:prose-invert max-w-6xl w-full bg-muted rounded-lg overflow-hidden p-12 border shadow-sm">
                <ReactMarkdown rehypePlugins={[rehypeRaw]} skipHtml={false}>
                    {content}
                </ReactMarkdown>

                <Separator className="my-12" />
                <ArticleComments />
            </div>
        </div>
    );
}

function ArticleComments() {
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
            repo="pm25/simpleplain"
            repoId="R_kgDONgMOyA"
            category="General"
            categoryId="DIC_kwDONgMOyM4Cq4Ga"
            mapping="pathname"
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
