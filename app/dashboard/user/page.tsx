import Link from "next/link";
import { Metadata } from "next";
import { Role } from "@prisma/client";

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
import { UserList } from "./_components/user-list";
import { CustomPagination } from "@/components/custom-pagination";
import { Header } from "./_components/header";

export const metadata: Metadata = {
    title: "AGHS | Users",
    description: "Armanitola Govt. High School Reunion",
};

interface Props {
    searchParams: {
        name: string;
        page: string;
        perPage: string;
    }
}


const Users = async ({ searchParams }: Props) => {
    const { name, page, perPage } = searchParams;
    const itemsPerPage = parseInt(perPage) || 5;
    const currentPage = parseInt(page) || 1;

    const users = await db.user.findMany({
        where: {
            role: Role.User,
            ...(name && { name: { contains: name, mode: "insensitive" } })
        },
        orderBy: {
            createdAt: "desc"
        },
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
    })

    const totalUser = await db.user.count({
        where: {
            role: Role.User,
            ...(name && { name: { contains: name, mode: "insensitive" } })
        },
    })

    const totalPage = Math.ceil(totalUser / itemsPerPage)

    return (
        <ContentLayout title="Users">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Users</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>User List</CardTitle>
                    <CardDescription>
                        A collection of user.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Header />
                    <UserList users={users} />
                    <CustomPagination totalPage={totalPage} />
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default Users
