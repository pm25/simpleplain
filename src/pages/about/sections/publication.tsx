import { Link } from "react-router";
import { FaArrowRight, FaBook, FaUsers } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { PubData } from "@/data/publications";

export default function Publication() {
    return (
        <div className="w-full max-w-5xl space-y-6">
            <div className="flex flex-row justify-center items-center gap-2 text-plus font-semibold">
                <FaBook />
                Publications
            </div>

            <div className="px-2 sm:px-6 overflow-hidden">
                <Table className="table-fixed w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[calc(100%-50px)]">Publication</TableHead>
                            <TableHead className="w-[50px] text-right">Year</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {PubData.publications.map((pub, index) => (
                            <TableRow
                                key={index}
                                className="cursor-pointer transition-none"
                                onClick={() => window.open(pub.link, "_blank")}
                            >
                                <TableCell className="pr-4 break-words whitespace-normal space-y-0.5">
                                    <div className="text-base font-semibold">{pub.title}</div>

                                    <div className="flex items-center text-sm text-muted-foreground gap-2">
                                        <FaUsers className="shrink-0" />
                                        <span>
                                            {pub.authors.split(", ").map((author, i) => (
                                                <span
                                                    key={i}
                                                    className={
                                                        author === PubData.author_name
                                                            ? "font-semibold"
                                                            : ""
                                                    }
                                                >
                                                    {author}
                                                    {i < pub.authors.split(", ").length - 1 && ", "}
                                                </span>
                                            ))}
                                        </span>
                                    </div>

                                    <div className="flex items-center text-sm text-muted-foreground gap-2">
                                        <FaBook className="shrink-0" />
                                        <span>{pub.booktitle}</span>
                                    </div>
                                </TableCell>

                                <TableCell className="text-sm text-right text-muted-foreground">
                                    {pub.year}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="relative w-full">
                <div className="absolute right-6">
                    <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="gap-1 text-muted-foreground"
                    >
                        <Link to="/publications">
                            View all
                            <FaArrowRight className="w-4 h-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
