import { redirect } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { db } from "@/lib/prisma";
import { ContentLayout } from "../../_components/content-layout";
import { ServiceList } from "./_components/service-list";

export const metadata: Metadata = {
    title: "AGHS | Applications | Details",
    description: "Armanitola Govt. High School Reunion",
};


interface Props {
    params: {
        id: string;
    }
}

const ApplicationDetails = async ({ params: { id } }: Props) => {
    const app = await db.application.findUnique({
        where: {
            id
        },
        include: {
            service: {
                orderBy: {
                    isCompleted: "asc"
                }
            }
        }
    })

    if (!app) redirect("/dashboard")

    return (
        <ContentLayout title="Application">
            <Card className="rounded-sm" >
                <CardContent className="flex flex-col md:flex-row items-center gap-4 p-4 md:p-6">
                    <Image
                        alt="Avatar"
                        className="rounded-full"
                        height="100"
                        src={app.imageUrl || ""}
                        style={{
                            aspectRatio: "100/100",
                            objectFit: "cover",
                        }}
                        width="100"
                    />
                    <div className="space-y-1">
                        <div className="font-semibold text-xl text-primary">{app.name}</div>
                        <div>{app.phone}</div>
                        <div>{app.email}</div>
                    </div>
                </CardContent>
            </Card>

            <Card className="rounded-sm">
                <CardHeader>
                    <CardTitle className="text-xl">Food & Gift</CardTitle>
                </CardHeader>
                <CardContent>
                    <ServiceList services={app.service} />
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default ApplicationDetails
