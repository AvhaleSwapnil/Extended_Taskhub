"use client";

import { useState } from "react";
import { X, Plus, Calendar, User, Tag, AlertCircle, Briefcase } from "lucide-react";
import { useTasks } from "@/context/TaskContext";
import { motion, AnimatePresence } from "framer-motion";

export default function TaskModal() {
    const { isModalOpen, setIsModalOpen, addTask, companies } = useTasks();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        owner: "John Doe",
        date: new Date().toISOString().split('T')[0],
        priority: "Medium",
        category: "General",
        status: "Todo",
        recurrence: "One Time",
        company: companies?.[0] || "Sage Healthy"
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title) return;
        addTask(formData);
        setFormData({
            title: "",
            description: "",
            owner: "John Doe",
            date: new Date().toISOString().split('T')[0],
            priority: "Medium",
            category: "General",
            status: "Todo",
            recurrence: "One Time",
            company: companies?.[0] || "Sage Healthy"
        });
    };

    return (
        <AnimatePresence>
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsModalOpen(false)}
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh] relative z-10"
                    >
                        {/* Header */}
                        <div className="p-6 sm:p-8 border-b border-slate-50 flex items-center justify-between bg-white sticky top-0">
                            <div>
                                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Create New Task</h3>
                                <p className="text-slate-400 text-xs sm:text-sm font-medium mt-1">Add a new task to your finance dashboard</p>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Form Body */}
                        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 overflow-y-auto">
                            <div className="space-y-2">
                                <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Task Title</label>
                                <input
                                    type="text"
                                    placeholder="e.g., Monthly Tax Reconciliation"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-primary outline-none transition-all font-medium text-slate-700 placeholder:text-slate-300"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Description</label>
                                <textarea
                                    placeholder="Briefly describe the task scope..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-primary outline-none transition-all font-medium text-slate-700 placeholder:text-slate-300 resize-none"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Owner</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                                        <select
                                            value={formData.owner}
                                            onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                                            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-primary outline-none appearance-none transition-all font-medium text-slate-700"
                                        >
                                            <option>John Doe</option>
                                            <option>Sarah Chen</option>
                                            <option>Mike Johnson</option>
                                            <option>Emily Davis</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Due Date</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                                        <input
                                            type="date"
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-primary outline-none transition-all font-medium text-slate-700"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Priority</label>
                                    <div className="relative">
                                        <AlertCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                                        <select
                                            value={formData.priority}
                                            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-primary outline-none appearance-none transition-all font-medium text-slate-700"
                                        >
                                            <option>Low</option>
                                            <option>Medium</option>
                                            <option>High</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Category</label>
                                    <div className="relative">
                                        <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                                        <select
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-primary outline-none appearance-none transition-all font-medium text-slate-700"
                                        >
                                            <option>Reporting</option>
                                            <option>Payables</option>
                                            <option>Tax</option>
                                            <option>Compliance</option>
                                            <option>General</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Company</label>
                                    <div className="relative">
                                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                                        <select
                                            value={formData.company}
                                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-primary outline-none appearance-none transition-all font-medium text-slate-700"
                                        >
                                            {companies.map(company => (
                                                <option key={company}>{company}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Recurrence</label>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                        {["One Time", "Weekly", "Monthly"].map((type) => (
                                            <button
                                                key={type}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, recurrence: type })}
                                                className={`px-3 py-2 rounded-xl border text-[11px] sm:text-xs font-bold transition-all ${formData.recurrence === type
                                                    ? "bg-indigo-50 border-primary text-primary"
                                                    : "bg-slate-50 border-slate-100 text-slate-400 hover:bg-slate-100"
                                                    }`}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </form>

                        {/* Footer */}
                        <div className="p-6 sm:p-8 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-3 sticky bottom-0">
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="w-full sm:w-auto px-6 py-3 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="btn-primary w-full sm:w-auto !px-10 h-[50px] shadow-lg shadow-indigo-200"
                            >
                                <Plus size={20} strokeWidth={3} />
                                Create Task
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
