import { HashRouter as Router, Routes, Route } from "react-router";

import Layout from "@/layout";
import { loadLazy } from "@/lib/loadComponent";
import { ThemeProvider } from "@/components/theme-provider";

const About = loadLazy(() => import("@/pages/about"));
const Movie = loadLazy(() => import("@/pages/movie"));
const Music = loadLazy(() => import("@/pages/music"));
const Project = loadLazy(() => import("@/pages/project"));
const Article = loadLazy(() => import("@/pages/article"));

export default function App() {
    return (
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <Router>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<About />} />
                        <Route path="movie" element={<Movie />} />
                        <Route path="music" element={<Music />} />
                        <Route path="project" element={<Project />} />
                        <Route path="article" element={<Article />} />
                    </Route>
                </Routes>
            </Router>
        </ThemeProvider>
    );
}
