import fs from "fs";
import path from "path";
import matter from "gray-matter";

const articlesDir = path.join(process.cwd(), "src", "data", "articles");
const outputPath = path.join(process.cwd(), "src", "data", "articles.json");

function getSlug(filename) {
  return filename.replace(/\.md$/, "");
}

function generatePostsJson() {
  const files = fs.readdirSync(articlesDir).filter(file => file.endsWith(".md"));

  const articles = {};

  files.forEach(filename => {
    const filePath = path.join(articlesDir, filename);
    const fileContent = fs.readFileSync(filePath, "utf8");

    const { data } = matter(fileContent);
    const slug = getSlug(filename);

    // define default values
    const defaults = {
      title: "Untitled",
      created_at: "",
      updated_at: "",
      summary: "",
      cover_image: "",
      author: "Anonymous",
      draft: false,
    };

    articles[slug] = {
      path: path.relative(process.cwd(), path.join(articlesDir, filename)),
      ...defaults,
      ...data, // data from frontmatter overrides defaults
    };
  });

  // sort articles by created date descending (assuming ISO 8601 date format in frontmatter)
  const sortedEntries = Object.entries(articles).sort(([, a], [, b]) => {
    const dateA = a.created_at || "";
    const dateB = b.created_at || "";
    return dateB.localeCompare(dateA);
  });

  const sortedArticles = Object.fromEntries(sortedEntries);
  const output = JSON.stringify(sortedArticles, null, 4);

  fs.writeFileSync(outputPath, output, "utf-8");
  console.log(`✅ articles.json generated with ${Object.keys(sortedArticles).length} posts`);
}

generatePostsJson();
