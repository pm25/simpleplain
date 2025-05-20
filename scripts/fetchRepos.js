import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const username = process.env.GITHUB_USERNAME;
const token = process.env.GITHUB_TOKEN;
const outputPath = path.join(process.cwd(), "data", "repos.json");

async function fetchAllRepos() {
  let page = 1;
  const perPage = 100;
  const allRepos = [];

  while (true) {
    console.log(`Fetching page ${page}...`);
    const url = `https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}`;

    const res = await fetch(url, {
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github+json",
      },
    });

    if (!res.ok) {
      throw new Error(`GitHub API responded with status ${res.status}: ${res.statusText}`);
    }

    const repos = await res.json();

    allRepos.push(...repos);

    if (repos.length < perPage) break; // No more pages
    page++;
  }

  return allRepos;
}

async function fetchRepos() {
  try {
    const data = await fetchAllRepos();

    const filtered = data
      .filter((repo) => !repo.fork && !repo.private)
      .map((repo) => ({
        name: repo.name,
        description: repo.description,
        stargazers_count: repo.stargazers_count,
        topics: repo.topics,
        language: repo.language,
        homepage: repo.homepage,
        html_url: repo.html_url,
        created_at: repo.created_at,
        updated_at: repo.updated_at,
      }))
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(filtered, null, 2));
    console.log(`✅ Repos written to ${outputPath}`);
  } catch (error) {
    console.error("❌ Failed to fetch repos:", error);
    process.exit(1);
  }
}

fetchRepos();
