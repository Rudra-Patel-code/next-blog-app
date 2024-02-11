import { getAllBlogsApi } from "@/apiRoutes";
import Blogcard from "@/components/blog-card";
import { Bloginterface } from "@/interfaces/blog";
import { notFound } from "next/navigation";

const getBlogs = async () => {
    try {
        const { data } = await getAllBlogsApi();
        if (!data.success) return [];

        return data.data;
    } catch (error) {
        return [];
    }
};

const Home = async () => {
    const blogs: Bloginterface[] | [] = await getBlogs();

    if (!blogs) {
        return notFound();
    }
    return (
        <div className="">
            <h1 className="text-3xl text-center my-6 underline">
                Welcome to TriBlogs
            </h1>
            <div className="w-full flex flex-wrap p-4 gap-3 justify-center">
                {blogs?.map((blog) => (
                    <div key={blog._id}>
                        <Blogcard blog={blog} isCreator={false} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
