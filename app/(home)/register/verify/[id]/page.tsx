import { redirect } from "next/navigation";
import { Metadata } from "next";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { db } from "@/lib/prisma";
import { VerifyForm } from "./_components/verify-form";

export const metadata: Metadata = {
    title: "AGHS | Application | Verify",
    description: "Armanitola Govt. High School Reunion",
};


interface Props {
    params: {
        id: string;
    }
}

const Verify = async ({ params: { id } }: Props) => {
    const app = await db.application.findUnique({
        where: {
            id,
            isVerified: false
        }
    })

    if (!app) redirect("/")

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <Card className="w-full max-w-[450px]">
                <CardHeader>
                    <CardTitle className="text-xl">Verification</CardTitle>
                    <CardDescription>A verification code sent to your phone.</CardDescription>
                </CardHeader>
                <CardContent>
                    <VerifyForm id={id} />
                </CardContent>
            </Card>
        </div>
    )
}

export default Verify
