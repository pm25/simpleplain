import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const username = process.env.GITHUB_USERNAME;
const token = process.env.GITHUB_TOKEN;
const outputPath = path.join(process.cwd(), "data", "repos.json");

async function fetchRepos() {
    try {
        const res = await fetch(`https://api.github.com/users/${username}/repos`, {
            headers: {
                Authorization: `token ${token}`,
            },
        });

        if (!res.ok) {
            throw new Error(`GitHub API responded with status ${res.status}: ${res.statusText}`);
        }

        const data = await res.json();

        const filtered = data
            .filter((repo) => !repo.fork)
            .map((repo) => ({
                name: repo.name,
                description: repo.description,
                stargazers_count: repo.stargazers_count,
                topics: repo.topics,
                language: repo.language,
                homepage: repo.homepage,
                html_url: repo.html_url,
            }));

        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        fs.writeFileSync(outputPath, JSON.stringify(filtered, null, 2));
        console.log(`✅ Repos written to ${outputPath}`);
    } catch (error) {
        console.error("❌ Failed to fetch repos:", error);
        process.exit(1);
    }
}

fetchRepos();
