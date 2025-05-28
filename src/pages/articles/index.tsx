import { FaNewspaper } from "react-icons/fa6";
import { Link } from "react-router";
import { usePageTitle } from "@/hooks/use-pagetitle";

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import articlesData from "@/data/articles.json";

export default function Articles() {
    usePageTitle("Articles");

    const sortedArticles = [...articlesData].sort((a, b) => {
        if (!a.date) return 1;
        if (!b.date) return -1;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return (
        <div className="flex flex-1 flex-col items-center gap-10">
            <div className="w-full max-w-6xl space-y-10">
                <div className="flex flex-row justify-center items-center gap-4 text-4xl font-semibold">
                    <FaNewspaper />
                    Articles
                </div>
                <Separator />

                <div className="grid grid-cols-1 gap-4 px-6">
                    {sortedArticles.map((article) => (
                        <ArticleCard key={article.slug} article={article} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function ArticleCard({ article }: { article: (typeof articlesData)[number] }) {
    return (
        <Link
            to={`/articles/${article.slug}`}
            aria-label={`Read full article: ${article.title}`}
            className="block"
        >
            <Card className="rounded-lg overflow-hidden px-8 py-4 cursor-pointer hover:shadow-[0_0_6px_1px_rgba(59,130,246,0.4)] transition-shadow duration-50">
                <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-semibold">{article.title}</h2>
                    <p className="text-base text-muted-foreground line-clamp-3">
                        {article.summary || "No summary available."}
                    </p>

                    {article.tags && article.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                            {article.tags.map((tag: string) => (
                                <span
                                    key={tag}
                                    className="bg-muted px-3 py-1 rounded-md text-sm font-medium"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="flex justify-between items-center text-sm text-muted-foreground mt-auto pt-2">
                        <time dateTime={article.date}>
                            {new Date(article.date).toLocaleDateString()}
                        </time>
                        <span className="text-primary underline">Read More →</span>
                    </div>
                </div>
            </Card>
        </Link>
    );
}
