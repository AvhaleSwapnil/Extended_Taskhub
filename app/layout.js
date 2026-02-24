import "./globals.css";
import Sidebar from "@/components/Sidebar";
import TaskModal from "@/components/TaskModal";
import LayoutWrapper from "@/components/LayoutWrapper";
import { TaskProvider } from "@/context/TaskContext";

export const metadata = {
  title: "TaskHub | Finance Management",
  description: "Manage your finance team tasks efficiently.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <TaskProvider>
          <div className="flex bg-page-bg min-h-screen relative overflow-x-hidden">
            <Sidebar />
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
          </div>
          <TaskModal />
        </TaskProvider>
      </body>
    </html>
  );
}
