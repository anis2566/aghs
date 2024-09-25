import Link from "next/link";
import { Metadata } from "next";
import { Files, HandCoins, ShieldX } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";

import { ContentLayout } from "./_components/content-layout";
import { StatCard } from "./_components/stat-card";
import { db } from "@/lib/prisma";
import { AppChart } from "./_components/app-chart";
import { RecentApps } from "./_components/recent-apps";

export const metadata: Metadata = {
  title: "AGHS | Dashboard",
  description: "Armanitola Govt. High School Reunion",
};

const Dashboard = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Calculate the start of the month
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

  // Calculate the end of the month
  const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  monthEnd.setHours(23, 59, 59, 999); // Set to the end of the day

  const monthFilter = {
    updatedAt: {
      gte: monthStart,
      lt: monthEnd,
    },
  };

  const apps = await db.application.groupBy({
    by: ["createdAt"],
    where: {
      OR: [
        {
          ...monthFilter
        },
      ]
    },
    _count: {
      _all: true
    }
  })

  // Initialize an array with all dates of the current month up to today
  const daysInMonth = today.getDate();
  const appsArray = Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(today.getFullYear(), today.getMonth(), i + 1).toLocaleDateString('en-US');
    return { date, count: 0 };
  });

  // Fill in the student counts
  apps.forEach(item => {
    const date = item.createdAt.toLocaleDateString('en-US');
    const day = appsArray.find(d => d.date === date);
    if (day) {
      day.count = item._count._all ?? 0;
    }
  });

  const recentApps = await db.application.findMany({
    where: {
      isPaid: true,
      isVerified: true
    },
    orderBy: {
      createdAt: "desc"
    },
    take: 3
  })

  return (
    <ContentLayout title="Dashboard">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid md:grid-cols-3 gap-6">
        <StatCard title="Today Application" amount={30} icon={Files} />
        <StatCard title="Unverified Application" amount={30} icon={ShieldX} />
        <StatCard title="Unpaid Application" amount={30} icon={HandCoins} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <AppChart data={appsArray} />
        <RecentApps apps={recentApps} />
      </div>
    </ContentLayout>
  )
}

export default Dashboard
