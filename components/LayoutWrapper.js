"use client";

import { Menu, Briefcase } from "lucide-react";
import { useTasks } from "@/context/TaskContext";

export default function LayoutWrapper({ children }) {
    const { setIsSidebarOpen } = useTasks();

    return (
        <div className="flex-1 flex flex-col min-h-screen">
            {/* Mobile Header */}
            <header className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-slate-100 sticky top-0 z-30 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-white shadow-md shadow-indigo-100">
                        <Briefcase size={20} strokeWidth={2.5} />
                    </div>
                    <div>
                        <h1 className="font-bold text-lg text-slate-900 leading-none">TaskHub</h1>
                        <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-wider">Finance Team</p>
                    </div>
                </div>
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-2 text-slate-500 hover:text-slate-900 transition-colors border border-slate-100 rounded-xl"
                >
                    <Menu size={24} />
                </button>
            </header>

            <main className="flex-1 p-4 sm:p-6 lg:p-10 lg:ml-64 transition-all duration-300">
                {children}
            </main>
        </div>
    );
}
