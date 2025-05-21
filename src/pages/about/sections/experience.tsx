import { FaGraduationCap, FaBriefcase } from "react-icons/fa6";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EduData } from "@/data/education";
import { WorkData } from "@/data/work";

export default function Experience() {
    return (
        <div className="flex flex-row items-center gap-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="rounded-lg gap-2">
                    <CardHeader>
                        <CardTitle className="flex flex-row justify-center items-center gap-2 text-xl">
                            <FaGraduationCap />
                            Education
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc pl-6 space-y-1">
                            {EduData.map((edu, index) => (
                                <li key={index}>
                                    <strong>{edu.degree}</strong> - {edu.school} ({edu.years})
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                <Card className="rounded-lg gap-2">
                    <CardHeader>
                        <CardTitle className="flex flex-row justify-center items-center gap-2 text-xl">
                            <FaBriefcase />
                            Work Experiences
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc pl-6 space-y-1">
                            {WorkData.map((job, index) => (
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
