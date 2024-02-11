"use client";

import { getMyBlogsApi } from "@/apiRoutes";
import Blogcard from "@/components/blog-card";
import { Button } from "@/components/ui/button";
import { requestHandler } from "@/helper";
import { Bloginterface } from "@/interfaces/blog";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const MyBlogsPage = () => {
    const [blogs, setBlogs] = useState<Bloginterface[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const getMyBlogs = async () => {
        await requestHandler(
            async () => await getMyBlogsApi(),
            setLoading,
            (res) => {
                setBlogs(res.data.blogs);
            },
            (error) => {
                toast.error(error);
            }
        );
    };


    const handleLogout = () => {

    }

    useEffect(() => {
        getMyBlogs();
    }, []);

    return (
        <>
            <div className="w-full flex flex-wrap p-4 gap-3 justify-center">
                {!loading &&
                    blogs?.map((blog) => (
                        <div key={blog._id}>
                            <Blogcard blog={blog} isCreator={true} />
                        </div>
                    ))}

                {loading && (
                    <>
                        <Blogcard.Skeleton />
                        <Blogcard.Skeleton />
                        <Blogcard.Skeleton />
                    </>
                )}
            </div>

            {!loading && (
                <div className="w-full text-center">
                    <Button onClick={handleLogout} variant={"destructive"} className="mx-auto">
                        Logout
                    </Button>
                </div>
            )}
        </>
    );
};

export default MyBlogsPage;
