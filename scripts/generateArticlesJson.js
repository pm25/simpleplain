import fs from "fs";
import path from "path";
import yaml from "js-yaml";

const articlesDir = path.join(process.cwd(), "src", "data", "articles");
const outputPath = path.join(process.cwd(), "src", "data", "articles.json");

function getSlug(filename) {
  return filename.replace(/\.md$/, "");
}

// frontmatter extractor
function parseFrontmatter(content) {
  const match = /^---\n([\s\S]*?)\n---\n?/.exec(content);

  if (!match) {
    return { data: {}, content };
  }

  const yamlBlock = match[1];
  const body = content.slice(match[0].length);

  let data = {};
  try {
    data = yaml.load(yamlBlock) || {};
  } catch (err) {
    console.error("YAML parse error:", err);
  }

  return { data, content: body };
}

function generatePostsJson() {
  const files = fs.readdirSync(articlesDir).filter(file => file.endsWith(".md"));

  const articles = {};

  files.forEach(filename => {
    const filePath = path.join(articlesDir, filename);
    const fileContent = fs.readFileSync(filePath, "utf8");

    const { data } = parseFrontmatter(fileContent);
    const slug = getSlug(filename);

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
      ...data,
    };
  });

  const sortedEntries = Object.entries(articles).sort(([, a], [, b]) => {
    const dateA = a.created_at || "";
    const dateB = b.created_at || "";
    return dateB.localeCompare(dateA);
  });

  const sortedArticles = Object.fromEntries(sortedEntries);

  fs.writeFileSync(outputPath, JSON.stringify(sortedArticles, null, 4), "utf-8");
  console.log(`✅ articles.json generated with ${Object.keys(sortedArticles).length} posts`);
}

generatePostsJson();
