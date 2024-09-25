"use client"

import { SearchIcon } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import queryString from "query-string"
import { useEffect, useState } from "react"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"

import { useDebounce } from "@/hooks/use-debounce"


interface Props {
    open: boolean;
    handleClose: () => void;
}

export const FilterDrawer = ({ open, handleClose }: Props) => {
    const [search, setSearch] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [isPaid, setIsPaid] = useState<string>("")
    const [perPage, setPerPage] = useState<string>()

    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()
    const searchValue = useDebounce(search, 500)
    const phoneValue = useDebounce(phone, 500)

    useEffect(() => {
        const params = Object.fromEntries(searchParams.entries());
        const url = queryString.stringifyUrl({
            url: pathname,
            query: {
                ...params,
                phone: phoneValue
            }
        }, { skipEmptyString: true, skipNull: true });

        router.push(url);
    }, [phoneValue, router, pathname])

    useEffect(() => {
        const params = Object.fromEntries(searchParams.entries());
        const url = queryString.stringifyUrl({
            url: pathname,
            query: {
                ...params,
                name: searchValue
            }
        }, { skipEmptyString: true, skipNull: true });

        router.push(url);
    }, [searchValue, router, pathname])

    const handleStatusChange = (isPaid: string) => {
        setIsPaid(isPaid)
        const params = Object.fromEntries(searchParams.entries());
        const url = queryString.stringifyUrl({
            url: pathname,
            query: {
                ...params,
                isPaid,
            }
        }, { skipNull: true, skipEmptyString: true })

        router.push(url)
    }

    const handlePerPageChange = (perPage: string) => {
        const params = Object.fromEntries(searchParams.entries());
        const url = queryString.stringifyUrl({
            url: pathname,
            query: {
                ...params,
                perPage,
            }
        }, { skipNull: true, skipEmptyString: true })

        router.push(url)
    }

    const handleReset = () => {
        router.push(pathname)
        setSearch("")
        setPhone("")
        setIsPaid("")
        setPerPage(undefined)
    }

    return (
        <Sheet open={open} onOpenChange={handleClose}>
            <SheetContent>
                <SheetHeader className="space-y-0">
                    <SheetTitle className="text-start">Filter</SheetTitle>
                    <SheetDescription className="text-start">
                        Filter search result
                    </SheetDescription>
                </SheetHeader>

                <div className="space-y-3 mt-4">
                    <div>
                        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search by name..."
                            className="w-full appearance-none bg-background pl-8 shadow-none"
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                        />
                    </div>
                    <div>
                        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search by phone..."
                            className="w-full appearance-none bg-background pl-8 shadow-none"
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                        />
                    </div>
                    <Select value={isPaid} onValueChange={(value) => handleStatusChange(value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="true">Paid</SelectItem>
                            <SelectItem value="false">Unpaid</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={perPage || ""} onValueChange={(value) => handlePerPageChange(value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Limit" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                ["5", "10", "20", "50", "100", "200"].map((v, i) => (
                                    <SelectItem value={v} key={i}>{v}</SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                    <Button
                        className="bg-rose-500 text-white"
                        onClick={handleReset}
                    >
                        Reset
                    </Button>
                </div>
            </SheetContent>
        </Sheet>

    )
}