import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const username = process.env.GITHUB_USERNAME;
const token = process.env.GITHUB_TOKEN;
const outputPath = path.join(process.cwd(), "src", "data", "repos.json");
const skipListPath = path.join(process.cwd(), "src", "data", "skip-repos.txt");

async function fetchAllRepos() {
    let page = 1;
    const perPage = 100;
    const allRepos = [];

    while (true) {
        console.log(`Fetching page ${page}...`);
        const url = `https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}`;

        const headers = {
            Accept: "application/vnd.github+json",
        };

        if (token) {
            headers["Authorization"] = `token ${token}`;
        } else {
            console.warn("⚠️ No GitHub token found. Using public API (may be rate-limited).");
        }

        const res = await fetch(url, { headers });

        if (!res.ok) {
            throw new Error(`GitHub API responded with status ${res.status}: ${res.statusText}`);
        }

        const repos = await res.json();
        allRepos.push(...repos);

        if (repos.length < perPage) break;
        page++;
    }

    return allRepos;
}

function getSkipList() {
    if (!fs.existsSync(skipListPath)) return new Set();
    const raw = fs.readFileSync(skipListPath, "utf-8");
    return new Set(raw.split("\n").map((line) => line.trim()).filter(Boolean));
}

async function fetchRepos() {
    try {
        // Load existing preview data (if available)
        let existingData = {};
        if (fs.existsSync(outputPath)) {
            const raw = fs.readFileSync(outputPath, "utf-8");
            existingData = JSON.parse(raw);
        }

        const data = await fetchAllRepos();
        const skipList = getSkipList();
        const merged = {};

        data.filter((repo) => !repo.fork && !repo.private && !skipList.has(repo.name))
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
            .forEach((repo) => {
                const existing = existingData[repo.name] || {};
                merged[repo.name] = {
                    name: repo.name,
                    display_name: existing.display_name || "",
                    description: repo.description,
                    stargazers_count: repo.stargazers_count,
                    topics: repo.topics,
                    language: repo.language,
                    homepage: repo.homepage,
                    html_url: repo.html_url,
                    created_at: repo.created_at,
                    updated_at: repo.updated_at,
                    pushed_at: repo.pushed_at,
                    preview_image: existing.preview_image || "",
                };
            });

        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        fs.writeFileSync(outputPath, JSON.stringify(merged, null, 2));
        console.log(`✅ Repos written to ${outputPath}`);
    } catch (error) {
        console.error("❌ Failed to fetch repos:", error);
        process.exit(1);
    }
}

fetchRepos();
