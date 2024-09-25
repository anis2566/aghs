import { Metadata } from "next";
import { redirect } from "next/navigation";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { PaymentForm } from "./_components/payment-form";
import { db } from "@/lib/prisma";

export const metadata: Metadata = {
    title: "AGHS | Application | Payment",
    description: "Armanitola Govt. High School Reunion",
};

interface Props {
    params: {
        id: string;
    }
}

const Payment = async ({ params: { id } }: Props) => {
    const app = await db.application.findUnique({
        where: {
            id,
            isPaid: false
        }
    })

    if (!app) redirect("/")

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-[450px] mx-auto">
                <CardHeader>
                    <CardTitle className="text-xl">Payment</CardTitle>
                    <CardDescription>Pay for complete your registration.</CardDescription>
                </CardHeader>
                <CardContent>
                    <PaymentForm id={id} />
                </CardContent>
            </Card>
        </div>
    )
}

export default Payment
