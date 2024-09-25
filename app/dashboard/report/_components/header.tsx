"use client"

import { SearchIcon } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import queryString from "query-string"
import { useEffect, useState } from "react"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { useDebounce } from "@/hooks/use-debounce"
import { Button } from "@/components/ui/button"
import { FilterDrawer } from "./filter-drawer"

export const Header = () => {
    const [search, setSearch] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [perPage, setPerPage] = useState<string>()
    const [open, setOpen] = useState<boolean>(false)

    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()
    const searchValue = useDebounce(search, 500)
    const phoneValue = useDebounce(phone, 500)

    const handleClose = () => {
        setOpen(false)
    }

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
        setPerPage(undefined)
    }

    return (
        <div className="space-y-2 shadow-sm shadow-primary px-2 py-3">
            <FilterDrawer open={open} handleClose={handleClose} />
            <Button className="md:hidden" onClick={() => setOpen(true)}>Filter</Button>
            <div className="hidden md:flex items-center justify-between gap-x-3">
                <div className="flex items-center gap-x-3">
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
                    <Button
                        variant="destructive"
                        className=""
                        onClick={handleReset}
                    >
                        Reset
                    </Button>
                </div>
                <Select value={perPage || ""} onValueChange={(value) => handlePerPageChange(value)}>
                    <SelectTrigger className="w-[130px]">
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
            </div>
        </div>
    )
}