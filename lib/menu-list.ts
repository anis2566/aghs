import {
  Users,
  LayoutGrid,
  LucideIcon,
  UserCog,
  UsersRound,
  Files,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname === "/dashboard",
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Application",
      menus: [
        {
          href: "/dashboard/application",
          label: "Application",
          active: pathname.includes("/dashboard/application"),
          icon: Files,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Users",
      menus: [
        {
          href: "",
          label: "Users",
          active: pathname.includes("/dashboard/user"),
          icon: Users,
          submenus: [
            {
              href: "/dashboard/user/moderator",
              label: "Moderator",
              active: pathname === "/dashboard/user/moderator",
              icon: UserCog,
            },
            {
              href: "/dashboard/user",
              label: "Users",
              active: pathname === "/dashboard/user",
              icon: UsersRound,
            },
          ],
        },
      ],
    },
  ];
}

// export function getMenuListTeacher(pathname: string): GroupTeacher[] {
//   return [
//     {
//       groupLabel: "",
//       status: Status.Active,
//       menus: [
//         {
//           href: "/teacher",
//           label: "Dashboard",
//           active: pathname === "/teacher",
//           icon: LayoutGrid,
//           submenus: [],
//           status: Status.Active,
//         },
//       ],
//     },
//     {
//       groupLabel: "",
//       status: Status.Active,
//       menus: [
//         {
//           href: "",
//           label: "Class",
//           active: pathname.includes("/teacher/class"),
//           icon: BookOpen,
//           submenus: [
//             {
//               href: "/teacher/class",
//               label: "Regualr",
//               active: pathname === "/teacher/class",
//               icon: CalendarDays,
//             },
//             {
//               href: "/teacher/class/proxy",
//               label: "Proxy",
//               active: pathname === "/teacher/class/proxy",
//               icon: Waypoints,
//             },
//           ],
//           status: Status.Active,
//         },
//         {
//           href: "",
//           label: "Leave",
//           active: pathname.includes("/teacher/leave"),
//           icon: LogOut,
//           submenus: [
//             {
//               href: "/teacher/leave/apply",
//               label: "Apply",
//               active: pathname === "/teacher/leave/apply",
//               icon: FilePen,
//             },
//             {
//               href: "/teacher/leave/history",
//               label: "History",
//               active: pathname === "/teacher/leave/history",
//               icon: History,
//             },
//           ],
//           status: Status.Active,
//         },
//         {
//           href: "/teacher/payment",
//           label: "Payment",
//           active: pathname.includes("/teacher/payment"),
//           icon: HandCoins,
//           submenus: [],
//           status: Status.Active,
//         },
//         {
//           href: "/teacher/account",
//           label: "Account",
//           active: pathname.includes("/teacher/account"),
//           icon: Landmark,
//           submenus: [],
//           status: Status.Active,
//         },
//         {
//           href: "/teacher/profile",
//           label: "Profile",
//           active: pathname.includes("/teacher/profile"),
//           icon: UserCog,
//           submenus: [],
//           status: Status.Active,
//         },
//       ],
//     },
//   ];
// }
