"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutGrid,
    Users,
    Calendar,
    Settings,
    Plus,
    Bell,
    TrendingUp,
    Briefcase
} from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { useTasks } from "@/context/TaskContext";

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function Sidebar() {
    const pathname = usePathname();
    const { setIsModalOpen } = useTasks();

    const menuItems = [
        { name: "All Tasks", icon: LayoutGrid, href: "/" },
        { name: "Team", icon: Users, href: "/team" },
        { name: "Calendar", icon: Calendar, href: "/calendar" },
        { name: "Settings", icon: Settings, href: "/settings" },
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-100 flex flex-col p-6 z-50">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-10 px-2 transition-transform hover:scale-105 cursor-pointer">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                    <Briefcase size={24} strokeWidth={2.5} />
                </div>
                <div>
                    <h1 className="font-bold text-xl text-slate-900 leading-none">TaskHub</h1>
                    <p className="text-xs text-slate-400 font-medium mt-1">Finance Team</p>
                </div>
            </div>



            {/* Navigation */}
            <nav className="flex-1 space-y-1">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "nav-item",
                                isActive && "nav-item-active"
                            )}
                        >
                            <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-slate-50 space-y-1">
                <div className="mt-8 flex items-center gap-3 px-2 py-3 bg-slate-50 rounded-xl border border-slate-100 hover:bg-white transition-colors cursor-pointer group">
                    <div className="h-10 w-10 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-slate-500 font-bold group-hover:bg-indigo-100 group-hover:text-primary transition-colors">
                        JD
                    </div>
                    <div>
                        <p className="text-sm font-bold text-slate-800 leading-none">John Doe</p>
                        <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-wider">Finance Manager</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
