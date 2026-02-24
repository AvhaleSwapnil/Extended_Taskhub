"use client";

import { useState } from "react";
import {
    User,
    Bell,
    Shield,
    CreditCard,
    Mail,
    Lock,
    ChevronRight,
    CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SettingsPage() {
    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [profile, setProfile] = useState({
        name: "John Doe",
        email: "john.doe@finance.co",
        role: "Finance Manager"
    });

    const [notifications, setNotifications] = useState({
        email: true,
        push: false,
        reminders: true
    });

    const handleSave = () => {
        setIsSaving(true);
        // Simulate API call
        setTimeout(() => {
            setIsSaving(false);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        }, 1000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-4xl mx-auto space-y-6 sm:space-y-10"
        >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Settings</h2>
                    <p className="text-slate-500 font-medium mt-1 text-sm sm:text-base">Manage your account and preferences</p>
                </motion.div>
                <AnimatePresence>
                    {showSuccess && (
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100"
                        >
                            <CheckCircle2 size={16} />
                            <span className="text-sm font-bold">Settings saved successfully</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="space-y-6">
                {/* Profile Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="stat-card"
                >
                    <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-6">
                        <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center text-primary">
                            <User size={20} />
                        </div>
                        <div className="min-w-0">
                            <h3 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider truncate">Profile Information</h3>
                            <p className="text-xs text-slate-400 font-bold mt-0.5 truncate">Update your personal details</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Full Name</label>
                            <input
                                type="text"
                                value={profile.name}
                                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-primary outline-none transition-all font-medium text-slate-700"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                                <input
                                    type="email"
                                    value={profile.email}
                                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-primary outline-none transition-all font-medium text-slate-700"
                                />
                            </div>
                        </div>
                        <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                            <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Current Role</label>
                            <input
                                type="text"
                                value={profile.role}
                                disabled
                                className="w-full px-4 py-3 bg-slate-100 border border-slate-100 rounded-xl font-medium text-slate-400 cursor-not-allowed"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Notifications Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="stat-card"
                >
                    <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-6">
                        <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                            <Bell size={20} />
                        </div>
                        <div className="min-w-0">
                            <h3 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider truncate">Notifications</h3>
                            <p className="text-xs text-slate-400 font-bold mt-0.5 truncate">Control how you receive updates</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {[
                            { key: 'email', label: 'Email Notifications', desc: 'Receive daily summary of tasks and alerts' },
                            { key: 'push', label: 'Push Notifications', desc: 'Get real-time updates on your desktop' },
                            { key: 'reminders', label: 'Task Reminders', desc: 'Notify me before a task is due' }
                        ].map((item) => (
                            <div key={item.key} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-50 rounded-2xl hover:bg-white hover:border-slate-100 transition-all group">
                                <div className="min-w-0">
                                    <h4 className="text-sm font-bold text-slate-800 truncate">{item.label}</h4>
                                    <p className="text-xs text-slate-400 font-medium mt-0.5 truncate">{item.desc}</p>
                                </div>
                                <button
                                    onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key] })}
                                    className={`h-6 w-11 rounded-full transition-all relative ${notifications[item.key] ? 'bg-primary' : 'bg-slate-200'
                                        }`}
                                >
                                    <motion.div
                                        animate={{ x: notifications[item.key] ? 20 : 0 }}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                        className="absolute top-1 left-1 h-4 w-4 rounded-full bg-white shadow-sm"
                                    ></motion.div>
                                </button>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Security Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="stat-card"
                >
                    <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-6">
                        <div className="h-10 w-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600">
                            <Shield size={20} />
                        </div>
                        <div>
                            <h3 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider">Security</h3>
                            <p className="text-xs text-slate-400 font-bold mt-0.5">Manage your password and security</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                <Lock size={20} />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-slate-800">Password</h4>
                                <p className="text-xs text-slate-400 font-medium mt-0.5">Change your account password regularly</p>
                            </div>
                        </div>
                        <button className="flex items-center gap-2 text-primary font-extrabold text-xs uppercase tracking-widest hover:gap-3 transition-all">
                            Change Password
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </motion.div>

                {/* Footer Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center justify-end gap-3 pt-6"
                >
                    <button className="px-6 py-3 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">Discard Changes</button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className={`btn-primary !px-10 h-[50px] shadow-lg shadow-indigo-200 ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isSaving ? (
                            <div className="flex items-center gap-2">
                                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Saving...
                            </div>
                        ) : "Save Settings"}
                    </button>
                </motion.div>
            </div>

            <div className="py-10 text-center">
                <p className="text-[10px] text-slate-300 font-bold uppercase tracking-[0.2em]">TaskHub v1.0.4 • © 2026</p>
            </div>
        </motion.div>
    );
}
