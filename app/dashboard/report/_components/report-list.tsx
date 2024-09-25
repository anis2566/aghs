"use client"

import { Application, Service, ServiceType } from "@prisma/client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface ApplicationWithService extends Application {
    service: Service[];
}

interface Props {
    reports: ApplicationWithService[];
}

export const ReportList = ({ reports }: Props) => {
    const handleExportCSV = () => {
        const headers = ["Name", "Phone", ...Object.values(ServiceType)];

        const rows = reports.map((report) => {
            const services = Object.values(ServiceType).map((type) => {
                const isChecked = report.service.some((s) => s.type === type);
                return isChecked ? "Yes" : "No";
            });

            return [
                report.name,
                report.phone,
                ...services,
            ];
        });

        const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "report_list.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            <Button onClick={handleExportCSV}>Export as CSV</Button>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Phone</TableHead>
                        {Object.values(ServiceType).map((v, i) => (
                            <TableHead key={i}>{v}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {reports.map((report) => (
                        <TableRow key={report.id}>
                            <TableCell>
                                <Avatar>
                                    <AvatarImage src={report.imageUrl || ""} />
                                    <AvatarFallback>{report.name?.charAt(0)}</AvatarFallback>
                                </Avatar>
                            </TableCell>
                            <TableCell>{report.name}</TableCell>
                            <TableCell>{report.phone}</TableCell>
                            {Object.values(ServiceType).map((type, i) => {
                                const isChecked = report.service.some((item) => item.type === type);
                                return (
                                    <TableCell key={i}>
                                        <Checkbox
                                            className="data-[state=checked]:bg-transparent data-[state=checked]:text-black"
                                            checked={isChecked}
                                        />
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
};
