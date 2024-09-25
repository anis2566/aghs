"use client"

import { Service } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch"

import { UPDATE_SERVICE } from "../action";

interface Props {
    services: Service[]
}

export const ServiceList = ({ services }: Props) => {
    const { mutate: updateService, isPending } = useMutation({
        mutationFn: UPDATE_SERVICE,
        onSuccess: (data) => {
            toast.success(data?.success, {
                id: "update-service"
            })
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "update-service"
            })
        }
    })

    const handleCheckChange = (id: string, isCompleted: boolean) => {
        toast.loading("Updating...", {
            id: "update-service"
        })
        updateService({ id, isCompleted })
    }

    return (
        <Table>
            <TableHeader>
                <TableHead>Item</TableHead>
                <TableHead>Is Completed</TableHead>
                <TableHead>Time</TableHead>
            </TableHeader>
            <TableBody>
                {
                    services.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell className="py-4">{item.type}</TableCell>
                            <TableCell className="py-4">
                                <Switch
                                    checked={item.isCompleted}
                                    onCheckedChange={() => handleCheckChange(item.id, !item.isCompleted)}
                                    disabled={isPending}
                                />
                            </TableCell>
                            <TableCell className="py-4">
                                {item.isCompleted ? new Date(item.updatedAt).toLocaleTimeString() : "-"}
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}