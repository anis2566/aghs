"use client"

import { Application } from "@prisma/client";
import { ArrowDownToLine, Edit, EllipsisVertical, Eye, Trash2 } from "lucide-react";
import Link from "next/link";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { useApplication } from "@/hooks/use-application";

interface Props {
    apps: Application[]
}

export const AppList = ({ apps }: Props) => {
    const {onOpen} = useApplication()

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Batch</TableHead>
                    <TableHead>Is Verified</TableHead>
                    <TableHead>Is Paid</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    apps.map((app) => (
                        <TableRow key={app.id}>
                            <TableCell>
                                <Avatar>
                                    <AvatarImage src={app.imageUrl || ""} />
                                    <AvatarFallback>{app.name?.charAt(0)}</AvatarFallback>
                                </Avatar>
                            </TableCell>
                            <TableCell>
                                <Link href={`/dashboard/application/${app.id}`} className="hover:underline">{app.name}</Link>
                            </TableCell>
                            <TableCell>{app.phone}</TableCell>
                            <TableCell>{app.batch}</TableCell>
                            <TableCell>
                                <Badge className={cn("text-white", app.isVerified ? "bg-green-600" : "bg-rose-500")}>{app.isVerified ? "Verified" : "Unverified"}</Badge>
                            </TableCell>
                            <TableCell>
                                <Badge className={cn("text-white", app.isPaid ? "bg-green-600" : "bg-rose-500")}>{app.isPaid ? "Paid" : "Unpaid"}</Badge>
                            </TableCell>
                            <TableCell className="py-1">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <span className="sr-only">Open menu</span>
                                            <EllipsisVertical className="h-5 w-5" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem asChild>
                                            <Link href={`/dashboard/application/${app.id}`} className="flex items-center gap-x-3">
                                                <Eye className="w-5 h-5" />
                                                View
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href={`/dashboard/application/edit/${app.id}`} className="flex items-center gap-x-3">
                                                <Edit className="w-5 h-5" />
                                                Edit
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href={`/dashboard/ticket/${app.id}`} className="flex items-center gap-x-3" target="_blank">
                                                <ArrowDownToLine className="w-5 h-5" />
                                                Download Ticket
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="flex items-center gap-x-3 text-rose-500 group" onClick={() => onOpen(app.id)}>
                                            <Trash2 className="w-5 h-5 group-hover:text-rose-600" />
                                            <p className="group-hover:text-rose-600">Delete</p>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}