"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import { usePathname } from "next/navigation"

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Button, buttonVariants } from "@/components/ui/button"

import { cn } from "@/lib/utils"
import { navs } from "@/constant"
import { ModeToggle } from "@/components/mode-toggle"
import { Logo } from "@/components/logo"
import { Drawer } from "./drawer"


export const Header = () => {
    const pathname = usePathname()

    return (
        <header className="w-full max-w-screen-xl mx-auto top-5 mx-auto sticky border z-40 rounded-2xl flex justify-between items-center p-2 bg-card shadow-md">
            <Logo />

            <NavigationMenu className="hidden md:flex">
                <NavigationMenuList>
                    {
                        navs.map(nav => (

                            <NavigationMenuItem key={nav.href}>
                                <NavigationMenuLink asChild>
                                    <Link href={nav.href} className={cn(buttonVariants({ variant: "ghost" }), "justify-start text-base", pathname === nav.href && "bg-accent")}>
                                        {nav.title}
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ))
                    }
                </NavigationMenuList>
            </NavigationMenu >

            <Drawer>
                <Button className="md:hidden">
                    <Menu />
                </Button>
            </Drawer>

            <div className="hidden md:flex">
                <ModeToggle />
            </div>
        </header >
    )
}