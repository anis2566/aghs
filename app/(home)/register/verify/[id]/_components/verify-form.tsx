"use client"

import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"

import { VERIFY_APPLICATION } from "../action"

interface Props {
    id: string;
}

export const VerifyForm = ({ id }: Props) => {
    const [value, setValue] = useState<string>("")

    const router = useRouter()

    const { mutate: verifyApp, isPending } = useMutation({
        mutationFn: VERIFY_APPLICATION,
        onSuccess: async (data) => {
            toast.success(data?.success, {
                id: "verify-app"
            })
            router.push(`/register/pay/${data.id}`)
        },
        onError: (error) => {
            setValue("")
            toast.error(error.message, {
                id: "verify-app"
            })
        }
    })

    const handleComplete = () => {
        toast.loading("Verifing...", {
            id: "verify-app"
        })
        verifyApp({ id, code: value })
    }

    return (
        <div className="space-y-2 mx-auto flex">
            <InputOTP
                maxLength={6}
                value={value}
                onChange={(value) => setValue(value)}
                onComplete={handleComplete}
                disabled={isPending}
                autoFocus
            >
                <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSeparator />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSeparator />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                </InputOTPGroup>
            </InputOTP>
        </div>
    )
}