import { Home, PlusCircle, User } from "lucide-react";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";

const FloatBar = () => {
    const icons = [
        {
            Icon: Home,
            to: "/",
        },
        {
            Icon: PlusCircle,
            to: "/blog/create",
        },
        {
            Icon: User,
            to: "/blog/my",
        },
    ];

    return (
        <div className="z-50 fixed top-0 left-0 w-full bg-white/65 backdrop-blur-sm py-2 flex justify-center border-b-2 border-b-black/80">
            <div className="flex gap-4 w-full max-w-[500px] justify-around">
                {icons.map((icon) => (
                    <Link
                        className={buttonVariants({
                            variant: "ghost",
                        })}
                        href={icon.to}
                        key={icon.to}
                    >
                        <icon.Icon />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default FloatBar;
