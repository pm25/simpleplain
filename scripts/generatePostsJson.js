import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const postsDir = path.join(__dirname, "..", "src", "data", "posts");
const outputPath = path.join(__dirname, "..", "src", "data", "posts.json");

function getSlug(filename) {
  return filename.replace(/\.md$/, "");
}

function generatePostsJson() {
  const files = fs.readdirSync(postsDir).filter(file => file.endsWith(".md"));

  const posts = files.map(filename => {
    const filePath = path.join(postsDir, filename);
    const fileContent = fs.readFileSync(filePath, "utf8");

    const { data } = matter(fileContent);
    const slug = getSlug(filename);

    return {
      slug,
      path: `./src/data/posts/${filename}`,
      ...data, // Spread all frontmatter attributes here
    };
  });

  // Sort posts by date descending (assuming ISO 8601 date format in frontmatter)
  posts.sort((a, b) => {
    const dateA = a.date || "";
    const dateB = b.date || "";
    return dateB.localeCompare(dateA);
  });

  fs.writeFileSync(outputPath, JSON.stringify(posts, null, 2));
  console.log(`✅ posts.json generated with ${posts.length} posts`);
}

generatePostsJson();
