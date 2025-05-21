import {
    FaLinkedin,
    FaGoogleScholar,
    FaRegIdBadge,
    FaGithub,
    FaSquareFacebook,
} from "react-icons/fa6";


export const UserInfo = {
    name: "Pin-Yen Huang",
    profile_url: "https://avatars.githubusercontent.com/u/33774054?v=4",
    headline: "CLLab • National Taiwan University",
    email: "pyhuang97@gmail.com",
    links: [
        {
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/py-huang",
            icon: FaLinkedin,
        },
        {
            name: "Google Scholar",
            url: "https://scholar.google.com.tw/citations?user=nQdpH2MAAAAJ",
            icon: FaGoogleScholar,
        },
        {
            name: "Résumé",
            url: "https://pm25.github.io/static/media/cv_v3.1ac3c71f.pdf",
            icon: FaRegIdBadge,
        },
        {
            name: "Github",
            url: "https://github.com/pm25",
            icon: FaGithub,
        },
        {
            name: "Facebook",
            url: "https://www.facebook.com/pyhuang97",
            icon: FaSquareFacebook,
        },
    ],
    biography: `
        I'm currently working on [your field or project] and has a deep interest in
        [specific area of focus]. With a background in [mention education or professional
        background], they have contributed to [mention any notable work or achievements, if
        applicable]. [Your Name] is passionate about [mention specific interests or goals]
        and is committed to furthering knowledge in this area. Outside of [work/study], they
        enjoy [mention hobbies or personal interests]. Feel free to reach out via [email or
        contact form] for more information or collaboration inquiries.
    `
}