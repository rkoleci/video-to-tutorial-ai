import React, { useState } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import WelcomeHeader from "./welcome-header";
import { useAuth } from "../hooks/useAuth";

interface IProps {
    children: React.ReactNode
}

export default function AppContainer({ children }: IProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { isAuthed} = useAuth()

    const onSearch = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const onMenuItemClick = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="h-screen flex flex-col bg-[#f6f8ff] w-full">
            <div className="flex-none">
                <Navbar onSearch={onSearch} onMenuItemClick={onMenuItemClick} />
            </div>

            {/* Main content area */}
            <div className="flex flex-1 overflow-hidden ">
                {/* Sidebar - Hidden on mobile, shown as overlay when hamburger clicked */}
               {isAuthed && (
                 <div className={`
                    fixed inset-y-0 left-0 z-50 w-80 transform transition-transform duration-300 ease-in-out
                    lg:relative lg:translate-x-0 lg:flex lg:flex-shrink-0  
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                `}>
                    <Sidebar onClose={() => setIsSidebarOpen(false)} />
                </div>
               )}

                {/* Overlay for mobile when sidebar is open */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 z-40 bg-white/70 lg:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                {/* Main content - Scrollable */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    <main className="flex-1 overflow-y-auto  pt-4 lg:pt-10 px-4 2xl:px-12     ">
                        <WelcomeHeader />
                        <div className="min-h-screen" >
                            {children}
                        </div>
                    </main>
                </div>

              
            </div>
        </div>
    );
}