import { FaGraduationCap, FaBriefcase } from "react-icons/fa6";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EduData } from "@/data/education";
import { WorkData } from "@/data/work";

export default function Experience() {
    return (
        <div className="w-full max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-2 sm:px-6">
                <Card className="rounded-lg gap-4 px-2 max-h-116 overflow-scroll hidden-scrollbar">
                    <CardHeader>
                        <CardTitle className="flex flex-row justify-center items-center gap-2 text-plus">
                            <FaGraduationCap />
                            Education
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {EduData.map((edu, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <img
                                    src={edu.logo}
                                    alt={`${edu.school} logo`}
                                    className="w-12 h-12 object-contain rounded"
                                />
                                <div>
                                    <div className="font-semibold">{edu.school}</div>
                                    <div className="text-sm text-muted-foreground">{edu.years}</div>
                                    <div className="text-sm">{edu.degree}</div>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card className="rounded-lg gap-4 px-2 max-h-116 overflow-scroll hidden-scrollbar">
                    <CardHeader>
                        <CardTitle className="flex flex-row justify-center items-center gap-2 text-plus">
                            <FaBriefcase />
                            Work Experiences
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {WorkData.map((job, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <img
                                    src={job.logo}
                                    alt={`${job.company} logo`}
                                    className="w-12 h-12 object-contain rounded"
                                />
                                <div>
                                    <div className="font-semibold">{job.company}</div>
                                    <div className="text-sm text-muted-foreground">{job.years}</div>
                                    <div className="text-sm">{job.title}</div>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
