import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export const Hero = () => {
    return (
        <section className="container">
            <div
                className="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-20 md:py-32"
            >
                <div className="text-center space-y-8">
                    <Badge
                        variant="outline"
                        className="text-sm py-2 rounded-full"
                    >
                        <span className="mr-2 text-primary">
                            <Badge className="rounded-full">Start</Badge>
                        </span>
                        <span> 1 January 2025</span>
                    </Badge>
                </div>

                <div
                    className="max-w-screen-xl mx-auto text-center text-3xl md:text-5xl font-bold"
                >
                    <h1>
                        Reunion 2024
                    </h1>
                    <h1>
                        <span
                            className="text-transparent bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text"
                        > Armanitola {" "}
                        </span>
                        Government High School
                    </h1>
                </div>

                <p className="max-w-screen-sm mx-auto text-center text-sm md:text-xl text-muted-foreground">
                    Join us for a memorable reunion event where alumni from all over the world will gather to celebrate and reconnect. Don't miss this opportunity to relive old memories and create new ones!
                </p>

                <div className="space-y-4 md:space-y-0 md:space-x-4">
                    <Button
                        variant="secondary"
                        className="font-bold"
                        asChild
                    >
                        <Link href="/ticket">
                            Download Ticket
                        </Link>
                    </Button>
                    <Button className="font-bold group/arrow" asChild>
                        <Link href="/register">
                            Register Now
                            <ArrowRight
                                className="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform"
                            />
                        </Link>
                    </Button>
                </div>

                <div className="relative group mt-14">
                    <div
                        className="absolute -top-6 right-12 w-[90%] h-12 lg:h-[80%] bg-primary/50 blur-3xl rounded-full img-shadow-animation"
                    />

                    <img
                        className="w-full md:w-[1200px] mx-auto rounded-lg relative rouded-lg leading-none flex items-center border border-t-2 border-t-primary/30 img-border-animation"
                        alt="dashboard using shadcn-vue"
                        src="/hero-image-dark.jpg"
                    />
                    <div
                        className="absolute bottom-0 left-0 w-full h-20 md:h-28 bg-gradient-to-b from-background/0 via-background/50 to-background rounded-lg"
                    />
                </div>
            </div>
        </section>
    )
}