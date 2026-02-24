"use client";

import { useState, useMemo } from "react";
import {
    Mail,
    Phone,
    MoreVertical,
    Search
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TEAM_MEMBERS = [
    {
        name: "Sarah Chen",
        role: "Senior Accountant",
        email: "sarah.chen@company.com",
        phone: "+1 (555) 123-4567",
        initials: "SC",
        tasks: "5/8",
        progress: 62.5
    },
    {
        name: "Mike Johnson",
        role: "Financial Analyst",
        email: "mike.johnson@company.com",
        phone: "+1 (555) 234-5678",
        initials: "MJ",
        tasks: "4/6",
        progress: 66.6
    },
    {
        name: "Emily Davis",
        role: "AP/AR Specialist",
        email: "emily.davis@company.com",
        phone: "+1 (555) 345-6789",
        initials: "ED",
        tasks: "8/10",
        progress: 80
    },
    {
        name: "John Doe",
        role: "Finance Manager",
        email: "john.doe@company.com",
        phone: "+1 (555) 456-7890",
        initials: "JD",
        tasks: "3/5",
        progress: 60
    }
];

export default function TeamPage() {
    const [search, setSearch] = useState("");

    const filteredMembers = useMemo(() => {
        return TEAM_MEMBERS.filter(member =>
            member.name.toLowerCase().includes(search.toLowerCase()) ||
            member.role.toLowerCase().includes(search.toLowerCase())
        );
    }, [search]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-6xl mx-auto space-y-10"
        >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Team</h2>
                    <p className="text-slate-500 font-medium mt-1 text-sm sm:text-base">Finance team members and their tasks</p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="relative group w-full sm:w-auto"
                >
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search members..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-11 pr-6 py-2.5 bg-white border border-slate-200 rounded-xl w-full sm:w-64 focus:ring-2 focus:ring-indigo-100 focus:border-primary outline-none text-slate-600 transition-all shadow-subtle"
                    />
                </motion.div>
            </div>

            {/* Team Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                    {filteredMembers.map((member, idx) => (
                        <motion.div
                            layout
                            key={member.name}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ delay: idx * 0.05 }}
                            className="stat-card group"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        className="h-12 w-12 rounded-full bg-indigo-50 border-2 border-white flex items-center justify-center text-primary font-bold shadow-sm shadow-indigo-100 uppercase"
                                    >
                                        {member.initials}
                                    </motion.div>
                                    <div>
                                        <h3 className="font-bold text-slate-800 leading-tight">{member.name}</h3>
                                        <p className="text-xs text-slate-400 font-bold mt-0.5">{member.role}</p>
                                    </div>
                                </div>
                                <button className="p-1.5 text-slate-300 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all">
                                    <MoreVertical size={18} />
                                </button>
                            </div>

                            <div className="space-y-3 mb-8">
                                <div className="flex items-center gap-2.5 text-slate-500 hover:text-primary transition-colors cursor-pointer group/link">
                                    <Mail size={14} strokeWidth={2.5} className="text-slate-300 group-hover/link:text-primary transition-colors" />
                                    <span className="text-xs font-bold">{member.email}</span>
                                </div>
                                <div className="flex items-center gap-2.5 text-slate-500 hover:text-primary transition-colors cursor-pointer group/link">
                                    <Phone size={14} strokeWidth={2.5} className="text-slate-300 group-hover/link:text-primary transition-colors" />
                                    <span className="text-xs font-bold">{member.phone}</span>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-slate-50">
                                <div className="flex items-center justify-between mb-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                                    <span>Task Progress</span>
                                    <span className="text-slate-900">{member.tasks}</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${member.progress}%` }}
                                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                                        className="h-full bg-primary"
                                    ></motion.div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {filteredMembers.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-20 text-center space-y-4"
                >
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-300">
                        <Search size={32} />
                    </div>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No members found</p>
                </motion.div>
            )}
        </motion.div>
    );
}
