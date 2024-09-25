import Link from "next/link";
import { Metadata } from "next";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ContentLayout } from "../_components/content-layout";
import { db } from "@/lib/prisma";
import { ReportList } from "./_components/report-list";
import { Header } from "./_components/header";

export const metadata: Metadata = {
    title: "AGHS | Report",
    description: "Armanitola Govt. High School Reunion",
};

interface Props {
    searchParams: {
        name?: string;
        phone?: string;
        page: string;
        perPage: string;
    }
}

const Report = async ({ searchParams }: Props) => {
    const { name, phone, page, perPage } = searchParams;
    const itemsPerPage = parseInt(perPage) || 5;
    const currentPage = parseInt(page) || 1;

    const [reports, totalApplication] = await Promise.all([
        await db.application.findMany({
            where: {
                ...(name && {
                    name: { contains: name, mode: "insensitive" }
                }),
                ...(phone && {
                    phone: { contains: phone, mode: "insensitive" }
                }),
            },
            include: {
                service: true
            },
            orderBy: {
                createdAt: "desc"
            },
            skip: (currentPage - 1) * itemsPerPage,
            take: itemsPerPage,
        }),
        await db.application.count({
            where: {
                ...(name && {
                    name: { contains: name, mode: "insensitive" }
                }),
                ...(phone && {
                    phone: { contains: phone, mode: "insensitive" }
                }),
            }
        })
    ])

    const totalPage = Math.ceil(totalApplication / itemsPerPage)

    return (
        <ContentLayout title="Report">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Report</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>Reports</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Header />
                    <ReportList reports={reports} />
                    {/* <Header />
                    <UserList users={users} />
                    <CustomPagination totalPage={totalPage} /> */}
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default Report
