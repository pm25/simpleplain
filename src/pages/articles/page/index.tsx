import { useEffect, useState } from "react";
import { useParams } from "react-router";
import fm from "front-matter";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export default function ArticlePage() {
    const { slug } = useParams<{ slug: string }>();
    const [htmlContent, setHtmlContent] = useState<string>("");
    const [articleTitle, setArticleTitle] = useState<string>("Untitled");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchMarkdown() {
            setLoading(true);
            setError(null);

            try {
                const res = await fetch(`${import.meta.env.BASE_URL}articles/${slug}.md`);
                if (!res.ok) throw new Error(`HTTP error ${res.status}`);

                const rawContent = await res.text();

                const { attributes, body } = fm(rawContent) as {
                    attributes: { title?: string };
                    body: string;
                };

                setHtmlContent(body);
                setArticleTitle(attributes.title || "Untitled");
            } catch (e) {
                setError("Failed to load article: " + (e instanceof Error ? e.message : String(e)));
            } finally {
                setLoading(false);
            }
        }

        if (slug) fetchMarkdown();
    }, [slug]);

    if (loading) return <p>Loading article...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="flex justify-center">
            <div className="prose dark:prose-invert max-w-6xl w-full bg-muted rounded-lg overflow-hidden p-12 gap-0 border shadow-sm">
                <ReactMarkdown rehypePlugins={[rehypeRaw]} skipHtml={false}>
                    {htmlContent}
                </ReactMarkdown>
            </div>
        </div>
    );
}
