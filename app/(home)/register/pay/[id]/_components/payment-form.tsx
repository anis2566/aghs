"use client"

import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";

import { CREATE_PAYMENT, GENERATE_BKASH_TOKEN } from "@/services/payment.service";

interface PaymentFormProps {
    id: string;
}

export const PaymentForm = ({ id }: PaymentFormProps) => {

    const { mutate: generateToken, isPending } = useMutation({
        mutationFn: () => GENERATE_BKASH_TOKEN(),
        onSuccess: (data) => {
            if (data?.token) {
                createPayment({ id, amount: 1020, token: data?.token })
            }
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const { mutate: createPayment, isPending: isLoading } = useMutation({
        mutationFn: CREATE_PAYMENT,
        onSuccess: (data) => {
            if (data?.url) {
                window.location.replace(data?.url)
            }
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const handlePay = () => {
        generateToken()
    }

    return (
        <div className="space-y-6">
            <h1 className="text-lg">Your payment amount is <span className="text-2xl font-bold text-primary">&#2547;{1020}</span></h1>
            <Button disabled={isPending || isLoading} onClick={handlePay}>Pay with Bkash</Button>
        </div>
    )
}