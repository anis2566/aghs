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

import { useUserDelete } from "@/hooks/use-user"
import { DELETE_USER } from "../action"


export const DeleteUserModal = () => {
    const { open, id, onClose } = useUserDelete()

    const { mutate: deleteUser, isPending } = useMutation({
        mutationFn: DELETE_USER,
        onSuccess: (data) => {
            onClose()
            toast.success(data?.success, {
                id: "delete-user"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "delete-user"
            });
        }
    })

    const handleDelete = () => {
        toast.loading("User deleting...", {
            id: "delete-user"
        })
        deleteUser(id)
    }

    return (
        <AlertDialog open={open && !!id}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this user
                        and remove the data from your servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose} disabled={isPending}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} disabled={isPending} className="bg-rose-500 hover:bg-rose-700 text-white">Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}