import { BrowserRouter as Router, Routes, Route } from "react-router";

import Layout from "@/layout";
import Home from "@/pages/home/page";
import About from "@/pages/about/page";

export default function App() {
    const basename =
        process.env.REACT_APP_BASENAME || window.location.pathname.split("/")[1]
            ? `/${window.location.pathname.split("/")[1]}`
            : "/";

    return (
        <Router basename={basename}>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                </Route>
            </Routes>
        </Router>
    );
}
