import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { FaGraduationCap, FaBriefcase } from "react-icons/fa6";

const user = {
    education: [
        { degree: "Ph.D. in Computer Science", school: "XYZ University", years: "2020 - Present" },
        { degree: "M.S. in Data Science", school: "ABC University", years: "2018 - 2020" },
        { degree: "B.S. in Computer Engineering", school: "LMN University", years: "2014 - 2018" },
    ],
    work: [
        { title: "Research Assistant", company: "XYZ University", years: "2020 - Present" },
        { title: "Software Engineer", company: "ABC Tech", years: "2018 - 2020" },
        { title: "Intern", company: "LMN Corp", years: "2017 - 2018" },
    ],
};

export default function Experience() {
    return (
        <div className="flex flex-row items-center gap-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="rounded-xl">
                    <CardHeader>
                        <CardTitle className="flex flex-row justify-center items-center gap-2">
                            <FaGraduationCap />
                            Education
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc pl-6 space-y-1">
                            {user.education.map((edu, index) => (
                                <li key={index}>
                                    <strong>{edu.degree}</strong> - {edu.school} ({edu.years})
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                <Card className="rounded-xl">
                    <CardHeader>
                        <CardTitle className="flex flex-row justify-center items-center gap-2">
                            <FaBriefcase />
                            Work Experiences
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc pl-6 space-y-1">
                            {user.work.map((job, index) => (
                                <li key={index}>
                                    <strong>{job.title}</strong> - {job.company} ({job.years})
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
