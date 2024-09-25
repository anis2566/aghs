import { Metadata } from "next";
import { Header } from "./_components/navbar";

interface Props {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: "AGHS | Reunion 2024",
    description: "Armanitola Govt. High School Reunion",
};

const HomeLayout = ({ children }: Props) => {
    return (
        <div className="container p-4">
            <Header />
            {children}
        </div>
    )
}

export default HomeLayout
