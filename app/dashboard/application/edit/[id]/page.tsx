import Link from "next/link";
import { Metadata } from "next";
import { redirect } from "next/navigation";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ContentLayout } from "@/app/dashboard/_components/content-layout";
import { db } from "@/lib/prisma";
import { EditApplicationForm } from "./_components/edit-app-form";

export const metadata: Metadata = {
    title: "AGHS | Application | Edit",
    description: "Armanitola Govt. High School Reunion",
};

interface Props {
    params: {
        id: string;
    }
}

const EditApplication = async ({params: {id}}:Props) => {
    const application = await db.application.findUnique({
        where: {
            id
        }
    })

    if(!application) redirect("/dashboard")

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
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard/application">Applications</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Edit</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card>
                <CardHeader>
                    <CardTitle>Edit Application</CardTitle>
                </CardHeader>
                <CardContent>
                    <EditApplicationForm application={application} />
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default EditApplication
