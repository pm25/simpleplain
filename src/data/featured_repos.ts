import AllRepoData from "@/data/repos.json";

export const featuredRepos = [
    "simpleplain",
    "pm25.github.io",
    "SimplePlus-BeamerTheme",
    "SimpleDarkBlue-BeamerTheme",
    "Semi-Supervised-Regression",
    "simpleplain",
] as (keyof typeof AllRepoData)[];

export const FeaturedRepoData = featuredRepos.map((key) => AllRepoData[key]);