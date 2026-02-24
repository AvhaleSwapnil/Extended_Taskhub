"use client";

import { createContext, useContext, useState, useMemo } from "react";

const TaskContext = createContext();

const INITIAL_TASKS = [
    {
        id: 1,
        title: "Review Q1 Financial Statements",
        description: "Complete review of quarterly financial reports",
        owner: "Sarah Chen",
        date: "2026-02-25",
        priority: "High",
        category: "Reporting",
        status: "In Progress",
        recurrence: "Monthly"
    },
    {
        id: 2,
        title: "Process Vendor Invoices",
        description: "Process and approve outstanding vendor invoices",
        owner: "Mike Johnson",
        date: "2026-02-24",
        priority: "Medium",
        category: "Accounts Payable",
        status: "Todo",
        recurrence: "Weekly"
    },
    {
        id: 3,
        title: "Reconcile Bank Statements",
        description: "Monthly bank reconciliation for all accounts",
        owner: "John Doe",
        date: "2026-02-28",
        priority: "High",
        category: "Reconciliation",
        status: "Completed",
        recurrence: "One Time"
    }
];

export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState(INITIAL_TASKS);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const addTask = (newTask) => {
        setTasks(prev => [{ ...newTask, id: Date.now() }, ...prev]);
        setIsModalOpen(false);
    };

    const toggleTaskStatus = (id) => {
        setTasks(prev => prev.map(task => {
            if (task.id === id) {
                const nextStatus = task.status === "Completed" ? "Todo" : "Completed";
                return { ...task, status: nextStatus };
            }
            return task;
        }));
    };

    const value = {
        tasks,
        addTask,
        toggleTaskStatus,
        isModalOpen,
        setIsModalOpen
    };

    return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    );
}

export function useTasks() {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error("useTasks must be used within a TaskProvider");
    }
    return context;
}
