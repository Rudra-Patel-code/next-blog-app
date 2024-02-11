import { getSingleBlogDetails } from "@/apiRoutes";
import Comments from "@/components/blog/Comments";
import { Bloginterface } from "@/interfaces/blog";
import { notFound } from "next/navigation";

const getBlogbyId = async (id: string) => {
    try {
        const { data } = await getSingleBlogDetails(id);

        if (!data.success) return [];

        return data.data;
    } catch (error) {
        return [];
    }
};

const page = async ({ params: { blogId } }: { params: { blogId: string } }) => {
    const blog: Bloginterface = await getBlogbyId(blogId);

    return (
        <>
            <div className="w-full flex flex-col gap-4 p-3">
                <h1 className="text-3xl ml-2">{blog.title}</h1>

                <div className="max-w-[800px] mx-auto bg-white p-3 mb-3">
                    <div
                        dangerouslySetInnerHTML={{
                            __html: blog.content.join(""),
                        }}
                    />
                </div>

                <div className="max-w-[800px] mx-auto w-full">
                    <Comments blogId={blog._id} blog={blog} />
                </div>
            </div>
        </>
    );
};

export default page;
