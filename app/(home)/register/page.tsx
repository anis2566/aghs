import { Metadata } from "next";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RegistrationForm } from "./_components/registration-form";

export const metadata: Metadata = {
    title: "AGHS 120 | Register",
    description: "Armanitola Govt. High School Reunion",
};

const Register = () => {
    return (
        <div className="w-full max-w-5xl mx-auto mt-6 items-center">
            <Card className="md:col-span-2">
                <CardHeader>
                    <CardTitle className="text-xl">Registration Form</CardTitle>
                    <CardDescription>Fill up the form with authentic information.</CardDescription>
                </CardHeader>
                <CardContent>
                    <RegistrationForm />
                </CardContent>
            </Card>
        </div>
    )
}

export default Register
