import { Application } from "@prisma/client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
    apps: Application[]
}

export const RecentApps = ({ apps }: Props) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">Recent Applications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Phone</TableHead>
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
                                    <TableCell>{app.name}</TableCell>
                                    <TableCell>{app.phone}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}