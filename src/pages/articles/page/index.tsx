import { useEffect, useState } from "react";
import { useParams } from "react-router";
import fm from "front-matter";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

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
            <div className="prose dark:prose-invert max-w-6xl w-full bg-muted rounded-lg overflow-hidden p-12 gap-0 border shadow-sm">
                <ReactMarkdown rehypePlugins={[rehypeRaw]} skipHtml={false}>
                    {content}
                </ReactMarkdown>
            </div>
        </div>
    );
}
