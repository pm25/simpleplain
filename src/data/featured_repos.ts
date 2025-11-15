import AllRepoData from "@/data/repos.json";

export const featuredRepos = [
    "showlit",
    "pm25.github.io",
    "SimplePlus-BeamerTheme",
    "SimpleDarkBlue-BeamerTheme",
    "Semi-Supervised-Regression",
    "showlit",
] as (keyof typeof AllRepoData)[];

export const FeaturedRepoData = featuredRepos.map((key) => AllRepoData[key]);