"use client"

import { DeleteApplicationModal } from "@/app/dashboard/application/_components/delete-modal"
import { DeleteUserModal } from "@/app/dashboard/user/_components/delete-modal"
import { UpdateUserStatusModal } from "@/app/dashboard/user/_components/status-modal"
import { UpdateModeratorStatusModal } from "@/app/dashboard/user/moderator/_components/status-modal"

export const ModalProvider = () => {
    return (
        <>
            <UpdateUserStatusModal />
            <DeleteUserModal />
            <UpdateModeratorStatusModal />
            <DeleteApplicationModal />
        </>
    )
}