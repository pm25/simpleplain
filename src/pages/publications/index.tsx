import { HiUsers, HiDocumentText } from "react-icons/hi2";
import { IoLibrary } from "react-icons/io5";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { usePageTitle } from "@/hooks/use-pagetitle";

import AllPubData from "@/data/publications.json";

export default function Publications() {
    usePageTitle("Publications");

    return (
        <div className="flex flex-1 flex-col items-center gap-10">
            <div className="w-full max-w-6xl">
                <div className="flex flex-row justify-center items-center gap-4 text-4xl font-semibold">
                    <IoLibrary />
                    Publications
                </div>

                <div className="w-full px-2 sm:px-6 overflow-hidden mt-10">
                    <Table className="table-fixed w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[calc(100%-50px)]">Publication</TableHead>
                                <TableHead className="w-[46px] text-right">Year</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {AllPubData.publications.map((pub, index) => (
                                <TableRow key={index} className="transition-none">
                                    <TableCell className="whitespace-normal space-y-1">
                                        <a
                                            href={pub.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-base text-base/4 font-semibold hover:underline underline-offset-4"
                                        >
                                            {pub.title}
                                        </a>

                                        <div className="flex items-center text-sm text-muted-foreground gap-2 mt-1">
                                            <HiUsers className="shrink-0" />
                                            <span className="leading-4.5">
                                                {pub.authors.split(", ").map((author, i) => (
                                                    <span
                                                        key={i}
                                                        className={
                                                            author === AllPubData.author_name
                                                                ? "font-semibold"
                                                                : ""
                                                        }
                                                    >
                                                        {author}
                                                        {i < pub.authors.split(", ").length - 1 &&
                                                            ", "}
                                                    </span>
                                                ))}
                                            </span>
                                        </div>

                                        <div className="flex items-center text-sm leading-4.5 text-muted-foreground gap-2">
                                            <HiDocumentText className="shrink-0" />
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
            </div>
        </div>
    );
}
