import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="w-full border-2 h-[100vh] flex justify-center items-center">
            <div className="p-5 flex flex-col w-full items-center max-w-[600px]">
                {children}
            </div>
            <Toaster />
        </div>
    );
};

export default AuthLayout;
