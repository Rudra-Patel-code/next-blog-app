import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="w-full border-2 h-[100vh] flex justify-center items-center">
            <div className="p-5 flex flex-col w-full items-center max-w-[600px]">
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;
