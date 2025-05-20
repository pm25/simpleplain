import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "public", "articles");
const outputPath = path.join(process.cwd(), "src", "data", "posts.json");

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
      path: path.relative(process.cwd(), path.join(postsDir, filename)),
      url: `/articles/${filename}`,
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
