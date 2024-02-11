import FloatBar from "@/components/FloatBar";
import React from "react";
import { Toaster } from "react-hot-toast";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="relative border-2 min-h-[100vh]">
            <FloatBar />
            <div className="w-full h-16" />
            {children}
            <Toaster />
        </div>
    );
};

export default MainLayout;
