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

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

  const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  monthEnd.setHours(23, 59, 59, 999); // Set to the end of the day

  const monthFilter = {
    updatedAt: {
      gte: monthStart,
      lt: monthEnd,
    },
  };

  const [apps, recentApps, toadayApp, unverifiedApp, unpaidApp] = await Promise.all([
    await db.application.groupBy({
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
    }),
    await db.application.findMany({
      where: {
        isPaid: true,
        isVerified: true
      },
      orderBy: {
        createdAt: "desc"
      },
      take: 3
    }),
    await db.application.count({
      where: {
        createdAt: { gte: today, lt: tomorrow },
      }
    }),
    await db.application.count({
      where: {
        isVerified: false
      }
    }),
    await db.application.count({
      where: {
        isPaid: false
      }
    })
  ])

  const daysInMonth = today.getDate();
  const appsArray = Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(today.getFullYear(), today.getMonth(), i + 1).toLocaleDateString('en-US');
    return { date, count: 0 };
  });

  apps.forEach(item => {
    const date = item.createdAt.toLocaleDateString('en-US');
    const day = appsArray.find(d => d.date === date);
    if (day) {
      day.count = item._count._all ?? 0;
    }
  });


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
        <StatCard title="Today Application" amount={toadayApp} icon={Files} />
        <StatCard title="Unverified Application" amount={unverifiedApp} icon={ShieldX} />
        <StatCard title="Unpaid Application" amount={unpaidApp} icon={HandCoins} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <AppChart data={appsArray} />
        <RecentApps apps={recentApps} />
      </div>
    </ContentLayout>
  )
}

export default Dashboard
