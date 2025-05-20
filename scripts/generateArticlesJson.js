import fs from "fs";
import path from "path";
import matter from "gray-matter";

const articlesDir = path.join(process.cwd(), "public", "articles");
const outputPath = path.join(process.cwd(), "src", "data", "articles.json");

function getSlug(filename) {
  return filename.replace(/\.md$/, "");
}

function generatePostsJson() {
  const files = fs.readdirSync(articlesDir).filter(file => file.endsWith(".md"));

  const articles = files.map(filename => {
    const filePath = path.join(articlesDir, filename);
    const fileContent = fs.readFileSync(filePath, "utf8");

    const { data } = matter(fileContent);
    const slug = getSlug(filename);

    return {
      slug,
      path: path.relative(process.cwd(), path.join(articlesDir, filename)),
      url: `/articles/${filename}`,
      ...data,
    };
  });

  // sort articles by date descending (assuming ISO 8601 date format in frontmatter)
  articles.sort((a, b) => {
    const dateA = a.date || "";
    const dateB = b.date || "";
    return dateB.localeCompare(dateA);
  });

  fs.writeFileSync(outputPath, JSON.stringify(articles, null, 2));
  console.log(`✅ articles.json generated with ${articles.length} posts`);
}

generatePostsJson();
