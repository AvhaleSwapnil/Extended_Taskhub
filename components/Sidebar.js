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
    Briefcase,
    X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { useTasks } from "@/context/TaskContext";

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function Sidebar() {
    const pathname = usePathname();
    const { setIsModalOpen, companies, selectedCompany, setSelectedCompany, isSidebarOpen, setIsSidebarOpen } = useTasks();

    const menuItems = [
        { name: "All Tasks", icon: LayoutGrid, href: "/" },
        { name: "Team", icon: Users, href: "/team" },
        { name: "Calendar", icon: Calendar, href: "/calendar" },
        { name: "Settings", icon: Settings, href: "/settings" },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>

            <aside className={cn(
                "fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-100 flex flex-col p-6 z-50 transition-transform duration-300 lg:translate-x-0",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                {/* Logo & Close Button */}
                <div className="flex items-center justify-between mb-10 px-2">
                    <div className="flex items-center gap-3 transition-transform hover:scale-105 cursor-pointer">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                            <Briefcase size={24} strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col min-w-0">
                            <h1 className="font-bold text-xl text-slate-900 leading-none truncate">TaskHub</h1>
                            <p className="text-xs text-slate-400 font-medium mt-1 truncate">Finance Team</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="lg:hidden p-2 text-slate-400 hover:text-slate-900 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-1 overflow-y-auto custom-scrollbar pr-2 min-w-0">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsSidebarOpen(false)}
                                className={cn(
                                    "nav-item group",
                                    isActive && "nav-item-active"
                                )}
                            >
                                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} className="flex-shrink-0" />
                                <span className="truncate">{item.name}</span>
                            </Link>
                        );
                    })}

                    <div className="pt-8 pb-4">
                        <h2 className="px-4 text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-4">Companies</h2>
                        <div className="space-y-1">
                            <button
                                onClick={() => {
                                    setSelectedCompany("All");
                                    setIsSidebarOpen(false);
                                }}
                                className={cn(
                                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                                    selectedCompany === "All"
                                        ? "bg-indigo-50 text-primary"
                                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                )}
                            >
                                <div className={cn(
                                    "w-2 h-2 rounded-full",
                                    selectedCompany === "All" ? "bg-primary" : "bg-slate-300"
                                )} />
                                All Companies
                            </button>
                            {companies.map((company) => (
                                <button
                                    key={company}
                                    onClick={() => {
                                        setSelectedCompany(company);
                                        setIsSidebarOpen(false);
                                    }}
                                    className={cn(
                                        "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                                        selectedCompany === company
                                            ? "bg-indigo-50 text-primary"
                                            : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                    )}
                                >
                                    <div className={cn(
                                        "w-2 h-2 rounded-full opacity-0 transition-opacity",
                                        selectedCompany === company && "opacity-100 bg-primary"
                                    )} />
                                    <span className="truncate">{company}</span>
                                </button>
                            ))}
                        </div>
                    </div>
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
        </>
    );
}
