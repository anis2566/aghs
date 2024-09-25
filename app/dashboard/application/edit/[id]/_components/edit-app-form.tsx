"use client"

import { Application } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Image from "next/image";
import { toast } from "sonner";
import { Trash2 } from "lucide-react"
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { UploadButton } from "@/lib/uploadthing";
import { RegistrationSchema } from "@/app/(home)/register/schema";
import { UPDATE_APPLICATION } from "../action";

interface Props {
    application: Application;
}

export const EditApplicationForm = ({ application }: Props) => {
    const router = useRouter()

    const { mutate: updateApplication, isPending } = useMutation({
        mutationFn: UPDATE_APPLICATION,
        onSuccess: (data) => {
            toast.success(data.success, {
                id: "update-app"
            })
            router.push(`/dashboard/application`)
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "update-app",
                duration: 2000
            })
        },
        onSettled: () => {
            form.reset()
        }
    })

    const form = useForm<z.infer<typeof RegistrationSchema>>({
        resolver: zodResolver(RegistrationSchema),
        defaultValues: {
            name: application.name || "",
            email: application.email || "",
            phone: application.phone || "",
            imageUrl: application.imageUrl || "",
            batch: application.batch || undefined,
        },
    })

    function onSubmit(values: z.infer<typeof RegistrationSchema>) {
        toast.loading("Registering...", {
            id: "update-app"
        })
        updateApplication({ id: application.id, values })
    }

    const years = Array.from({ length: 2024 - 1950 + 1 }, (_, i) => 2024 - i);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} disabled={isPending} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                <Input {...field} disabled={isPending} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} disabled={isPending} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="batch"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Passing Year</FormLabel>
                            <Select onValueChange={(value) => field.onChange(parseInt(value))} disabled={isPending}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select pass year" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {years.map((year) => (
                                        <SelectItem key={year} value={year.toString()}>
                                            {year}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image</FormLabel>
                            <FormControl>
                                {
                                    form.getValues("imageUrl") ? (
                                        <div className="relative">
                                            <Image
                                                alt="Upload"
                                                width={80}
                                                height={80}
                                                className="rounded-full w-14 h-14"
                                                src={form.getValues("imageUrl")}
                                            />
                                            <Button className="absolute top-0 right-0" variant="ghost" size="icon" onClick={() => form.setValue("imageUrl", "")} type="button" disabled={isPending}>
                                                <Trash2 className="text-rose-500" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center">
                                            <UploadButton
                                                endpoint="imageUploader"
                                                onClientUploadComplete={(res) => {
                                                    field.onChange(res[0].url)
                                                    toast.success("Image uploaded")
                                                }}
                                                onUploadError={(error: Error) => {
                                                    toast.error("Image upload failed")
                                                }}
                                            />
                                        </div>
                                    )
                                }
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isPending}>Submit</Button>
            </form>
        </Form>
    )
}