"use client";

import { Bloginterface } from "@/interfaces/blog";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Skeleton } from "./ui/skeleton";

const Blogcard = ({
    blog,
    isCreator = false,
}: {
    blog: Bloginterface;
    isCreator: boolean;
}) => {
    const router = useRouter();

    const navigateToBlog = () => {
        router.push(`/blog/${blog._id}`);
    };

    return (
        <div
            onClick={navigateToBlog}
            className="p-3 cursor-pointer shadow-md flex bg-white rounded-md max-w-[400px]"
        >
            <div className="flex flex-col gap-3 items-center">
                <p className="font-bold text-xl">{blog.title}</p>

                <div className="aspect-square w-auto flex justify-center items-center">
                    <Image
                        src={blog.cover.url}
                        alt="image"
                        width={250}
                        height={100}
                        className="aspect-square w-auto h-auto mx-auto"
                    />
                </div>

                <div>
                    <Button variant={"ghost"}>
                        <MessageCircle /> {blog.comments.length}
                    </Button>
                </div>
            </div>
        </div>
    );
};

Blogcard.Skeleton = () => {
    return (
        <div className="p-3 shadow-md flex bg-white rounded-md">
            <div className="flex flex-col gap-3 items-start">
                <Skeleton className="w-28 h-5" />

                <Skeleton className="w-64 aspect-square" />

                <Skeleton className="w-16 h-5" />
            </div>
        </div>
    );
};

export default Blogcard;
