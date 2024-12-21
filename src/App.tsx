import { HashRouter as Router, Routes, Route } from "react-router";

import Layout from "@/layout";
import Home from "@/pages/home";
import About from "@/pages/about";
import Movie from "@/pages/movie";
import Music from "@/pages/music";
import Project from "@/pages/project";
import Article from "@/pages/article";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="movie" element={<Movie />} />
                    <Route path="music" element={<Music />} />
                    <Route path="project" element={<Project />} />
                    <Route path="article" element={<Article />} />
                </Route>
            </Routes>
        </Router>
    );
}
