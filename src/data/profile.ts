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
    // you can use HTML syntax here (e.g. <br/>, <a>, <strong>, ...)
    biography: `
        Hi! I'm [Your Name], a [Your Title] passionate about [field or topic]. I'm currently working as [current role] at [organization or context], where I [briefly describe your work or mission]. With a background in [academic or professional background], I've developed a strong interest in [key interests or specialties], and have worked on projects like <i>[example project]</i> and <i>[another example]</i>, all centered around [what ties them together or your broader goal].
        <div class="my-2"></div>
        Outside of work, I enjoy [hobbies or personal interests], which keep me grounded and spark new ideas. Thanks for visiting! Feel free to <a href="[contact link or email]" target="_blank" rel="noopener noreferrer">get in touch</a> if you'd like to connect.
    `
}