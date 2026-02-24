"use client";

import { useState, useMemo } from "react";
import {
    ChevronLeft,
    ChevronRight,
    Clock,
    Calendar as CalendarIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CalendarPage() {
    const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 1)); // February 2026

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const monthName = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();

    const calendarDays = useMemo(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Days from previous month
        const daysInPrevMonth = new Date(year, month, 0).getDate();
        const prevMonthDays = [];
        for (let i = firstDayOfMonth - 1; i >= 0; i--) {
            prevMonthDays.push({ day: daysInPrevMonth - i, isCurrentMonth: false });
        }

        // Days in current month
        const currentMonthDays = [];
        const today = new Date();
        for (let i = 1; i <= daysInMonth; i++) {
            const isToday = today.getDate() === i &&
                today.getMonth() === month &&
                today.getFullYear() === year;

            // Mock events for demo
            const hasEvent = [12, 24, 25].includes(i) && month === 1; // Only for Feb

            currentMonthDays.push({ day: i, isCurrentMonth: true, isToday, hasEvent });
        }

        // Days from next month
        const remainingSlots = 35 - (prevMonthDays.length + currentMonthDays.length);
        const nextMonthDays = [];
        for (let i = 1; i <= (remainingSlots > 0 ? remainingSlots : 42 - (prevMonthDays.length + currentMonthDays.length)); i++) {
            nextMonthDays.push({ day: i, isCurrentMonth: false });
        }

        return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
    }, [currentDate]);

    const changeMonth = (offset) => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
    };

    const upcomingTasks = [
        {
            title: "Process Vendor Invoices",
            time: "Feb 24 at 10:00 AM",
            category: "Payables"
        },
        {
            title: "Review Q1 Financial Statements",
            time: "Feb 25 at 2:00 PM",
            category: "Reporting"
        },
        {
            title: "Prepare Budget Variance Report",
            time: "Feb 28 at 9:00 AM",
            category: "Budgeting"
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-6xl mx-auto space-y-10"
        >
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
            >
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Calendar</h2>
                <p className="text-slate-500 font-medium mt-1 text-sm sm:text-base">View tasks by due date</p>
            </motion.div>

            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8">
                {/* Main Calendar */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="lg:col-span-8 stat-card !p-4 sm:!p-8"
                >
                    <div className="flex items-center justify-between mb-10">
                        <AnimatePresence mode="wait">
                            <motion.h3
                                key={monthName + year}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                className="text-xl font-bold text-slate-800"
                            >
                                {monthName} {year}
                            </motion.h3>
                        </AnimatePresence>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center bg-slate-50 border border-slate-100 rounded-lg p-1">
                                <button
                                    onClick={() => changeMonth(-1)}
                                    className="p-1.5 hover:bg-white hover:shadow-sm rounded-md transition-all text-slate-400 active:scale-90"
                                >
                                    <ChevronLeft size={18} />
                                </button>
                                <button
                                    onClick={() => setCurrentDate(new Date())}
                                    className="px-3 py-1 text-xs font-bold text-slate-600 hover:bg-white hover:shadow-sm rounded-md transition-all"
                                >
                                    Today
                                </button>
                                <button
                                    onClick={() => changeMonth(1)}
                                    className="p-1.5 hover:bg-white hover:shadow-sm rounded-md transition-all text-slate-400 active:scale-90"
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 gap-y-4 text-center">
                        {days.map((day) => (
                            <div key={day} className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 pb-4">
                                {day}
                            </div>
                        ))}

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={monthName + year}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="col-span-7 grid grid-cols-7"
                            >
                                {calendarDays.map((date, idx) => (
                                    <div key={idx} className="relative group cursor-pointer pb-4">
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            className={`
                        mx-auto h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center rounded-xl text-sm font-bold transition-all
                        ${date.isToday ? 'bg-primary text-white shadow-lg shadow-indigo-100 scale-110' :
                                                    date.isCurrentMonth ? 'text-slate-700 hover:bg-indigo-50 hover:text-primary' : 'text-slate-300'}
                      `}
                                        >
                                            {date.day}
                                        </motion.div>
                                        {date.hasEvent && !date.isToday && (
                                            <div className="absolute bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full group-hover:scale-150 transition-transform"></div>
                                        )}
                                    </div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="stat-card"
                    >
                        <h4 className="text-sm font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <CalendarIcon size={16} className="text-primary" />
                            Upcoming Tasks
                        </h4>

                        <div className="space-y-4">
                            {upcomingTasks.map((task, idx) => (
                                <motion.div
                                    key={task.title}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + idx * 0.1 }}
                                    whileHover={{ x: 5 }}
                                    className="p-4 bg-slate-50 border border-slate-100 rounded-xl hover:border-indigo-100 transition-colors cursor-pointer group"
                                >
                                    <h5 className="font-bold text-slate-800 text-sm group-hover:text-primary transition-colors">{task.title}</h5>
                                    <div className="flex items-center gap-3 mt-2">
                                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                                            <Clock size={12} strokeWidth={2.5} />
                                            {task.time}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="stat-card bg-indigo-600 !border-none text-white overflow-hidden relative"
                    >
                        <div className="relative z-10">
                            <h4 className="font-bold mb-2 text-sm uppercase tracking-wider">Sync with Google</h4>
                            <p className="text-xs text-indigo-100 font-medium mb-4">Connect your calendar to see all your meetings in one place.</p>
                            <button className="bg-white text-primary px-4 py-2 rounded-lg text-[10px] font-extrabold uppercase tracking-tight shadow-lg shadow-indigo-800/20 active:scale-95 transition-all">
                                Connect Now
                            </button>
                        </div>
                        {/* Background design */}
                        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                        <div className="absolute -left-4 -top-4 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
