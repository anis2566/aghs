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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { ContentLayout } from "../_components/content-layout";
import { db } from "@/lib/prisma";
import { AppList } from "./_components/app-list";
import { Header } from "./_components/header";
import { CustomPagination } from "@/components/custom-pagination";

export const metadata: Metadata = {
    title: "AGHS | Applications",
    description: "Armanitola Govt. High School Reunion",
};

interface Props {
    searchParams: {
        name?: string;
        phone?: string;
        isPaid?: string;
        page: string;
        perPage: string;
    }
}

const Applications = async ({ searchParams }: Props) => {
    const { name, phone, page, perPage, isPaid } = searchParams;
    const itemsPerPage = parseInt(perPage) || 5;
    const currentPage = parseInt(page) || 1;
    const isPaidBoolean = isPaid === 'true';

    const [apps, totalApp] = await Promise.all([
        await db.application.findMany({
            where: {
                ...(name && { name: { contains: name, mode: "insensitive" } }),
                ...(phone && { phone: { contains: phone, mode: "insensitive" } }),
                ...(isPaidBoolean && { isPaid: isPaidBoolean })
            },
            orderBy: {
                createdAt: "desc"
            },
            skip: (currentPage - 1) * itemsPerPage,
            take: itemsPerPage,
        }),
        await db.application.count({
            where: {
                ...(name && { name: { contains: name, mode: "insensitive" } }),
                ...(phone && { phone: { contains: phone, mode: "insensitive" } }),
                ...(isPaidBoolean && { isPaid: isPaidBoolean })
            },
        })
    ])

    const totalPage = Math.ceil(totalApp / itemsPerPage)

    return (
        <ContentLayout title="Applications">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Applications</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card className="mt-4">
                <CardHeader>
                    <CardTitle className="text-xl">Application List</CardTitle>
                    <CardDescription>
                        A collection of complete application.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Header />
                    <AppList apps={apps} />
                    <CustomPagination totalPage={totalPage} />
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default Applications
