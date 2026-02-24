"use client";

import { useState, useMemo } from "react";
import {
  Search,
  MoreVertical,
  User,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  Repeat
} from "lucide-react";
import { useTasks } from "@/context/TaskContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const { tasks, toggleTaskStatus, setIsModalOpen } = useTasks();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const stats = useMemo(() => {
    return [
      { label: "Total Tasks", value: tasks.length, color: "text-slate-900", bg: "bg-white" },
      { label: "Todo", value: tasks.filter(t => t.status === "Todo").length, color: "text-blue-600", bg: "bg-blue-50" },
      { label: "In Progress", value: tasks.filter(t => t.status === "In Progress").length, color: "text-orange-600", bg: "bg-orange-50" },
      { label: "Completed", value: tasks.filter(t => t.status === "Completed").length, color: "text-emerald-600", bg: "bg-emerald-50" },
      { label: "Recurring", value: tasks.filter(t => t.recurrence && t.recurrence !== "One Time").length, color: "text-indigo-600", bg: "bg-indigo-50" },
    ];
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === "All" ||
        (filter === "Recurring" ? (task.recurrence && task.recurrence !== "One Time") : task.status === filter);
      return matchesSearch && matchesFilter;
    });
  }, [tasks, search, filter]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="max-w-6xl mx-auto space-y-10"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Tasks</h2>
          <p className="text-slate-500 font-medium mt-1">Manage your finance team tasks</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="relative group"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-11 pr-6 py-2.5 bg-white border border-slate-200 rounded-xl w-64 focus:ring-2 focus:ring-indigo-100 focus:border-primary outline-none text-slate-600 transition-all shadow-subtle"
          />
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-5 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="stat-card"
          >
            <p className="text-slate-400 font-bold text-xs uppercase tracking-wider">{stat.label}</p>
            <div className="mt-2 flex items-end justify-between">
              <span className={`text-4xl font-extrabold ${stat.color}`}>{stat.value}</span>
              <div className={`h-1.5 w-16 rounded-full ${stat.bg} relative overflow-hidden`}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '66%' }}
                  transition={{ delay: 0.5 + idx * 0.1, duration: 1 }}
                  className={`absolute left-0 top-0 h-full bg-current opacity-20`}
                ></motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters & Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {["All", "Todo", "In Progress", "Completed", "Recurring"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${filter === f
                ? "bg-primary text-white shadow-md shadow-indigo-100"
                : "bg-white text-slate-500 border border-slate-100 hover:bg-slate-50"
                }`}
            >
              {f} ({f === "All" ? tasks.length :
                f === "Recurring" ? tasks.filter(t => t.recurrence && t.recurrence !== "One Time").length :
                  tasks.filter(t => t.status === f).length})
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-primary flex items-center justify-center gap-2 transform hover:translate-y-[-2px] !py-2 !px-4"
        >
          <Plus size={18} strokeWidth={3} />
          New Task
        </button>
      </div>

      {/* Task List */}
      <div className="space-y-4 pb-10">
        <AnimatePresence mode="popLayout">
          {filteredTasks.map((task) => (
            <motion.div
              layout
              key={task.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="stat-card flex items-center justify-between group cursor-pointer hover:border-indigo-100"
            >
              <div className="flex items-start gap-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleTaskStatus(task.id);
                  }}
                  className={`mt-1.5 h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all ${task.status === 'Completed' ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 group-hover:border-primary'
                    }`}
                >
                  <AnimatePresence>
                    {task.status === 'Completed' && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <CheckCircle2 size={12} strokeWidth={3} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
                <div>
                  <h3 className={`text-lg font-bold text-slate-800 line-clamp-1 transition-all ${task.status === 'Completed' ? 'line-through text-slate-400 opacity-60' : ''
                    }`}>
                    {task.title}
                  </h3>
                  <p className="text-slate-500 text-sm mt-0.5 line-clamp-1">{task.description}</p>
                  <div className="mt-3 flex items-center gap-6">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <User size={14} strokeWidth={2.5} />
                      <span className="text-xs font-bold">{task.owner}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Clock size={14} strokeWidth={2.5} />
                      <span className="text-xs font-bold">{task.date}</span>
                    </div>
                    <div className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide flex items-center gap-1.5 ${task.priority === 'High' ? 'bg-rose-50 text-rose-600' :
                      task.priority === 'Medium' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
                      }`}>
                      <AlertCircle size={10} strokeWidth={3} />
                      {task.priority}
                    </div>
                    <div className="px-2.5 py-1 bg-slate-100 text-slate-500 rounded-md text-[10px] font-bold uppercase tracking-wide">
                      {task.category}
                    </div>
                    {task.recurrence && task.recurrence !== "One Time" && (
                      <div className="px-2.5 py-1 bg-indigo-50 text-primary rounded-md text-[10px] font-bold uppercase tracking-wide flex items-center gap-1.5">
                        <Repeat size={10} strokeWidth={3} />
                        {task.recurrence}
                      </div>
                    )}
                    <motion.div
                      layout
                      className={`text-[11px] font-bold ${task.status === 'In Progress' ? 'text-orange-500' :
                        task.status === 'Completed' ? 'text-emerald-500' : 'text-blue-500'
                        }`}
                    >
                      {task.status}
                    </motion.div>
                  </div>
                </div>
              </div>
              <button className="p-2 text-slate-300 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all">
                <MoreVertical size={20} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredTasks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center space-y-4"
          >
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-300">
              <Search size={32} />
            </div>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No tasks found</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
