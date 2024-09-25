"use client"

import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { useApplication } from "@/hooks/use-application"
import { DELETE_APPLICATION } from "../action"

export const DeleteApplicationModal = () => {
    const { open, id, onClose } = useApplication()

    const { mutate: deleteFee, isPending } = useMutation({
        mutationFn: DELETE_APPLICATION,
        onSuccess: (data) => {
            onClose()
            toast.success(data?.success, {
                id: "delete-app"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "delete-app"
            });
        }
    })

    const handleDelete = () => {
        toast.loading("Deleting...", {
            id: "delete-app"
        })
        deleteFee(id)
    }

    return (
        <AlertDialog open={open && !!id}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this application
                        and remove the data from your servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose} disabled={isPending}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} disabled={isPending} className="bg-rose-500 hover:bg-rose-600 text-white">Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}