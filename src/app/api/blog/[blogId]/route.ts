import { commonBlogAggregator } from "@/helper/aggregator";
import Blog from "@/models/blog.model";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

const GET = async (
    req: NextRequest,
    { params: { blogId } }: { params: { blogId: string } }
) => {
    try {

        const blogs = await Blog.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(blogId),
                },
            },
            ...commonBlogAggregator(),
            {
                $lookup: {
                    from: "comments",
                    localField: "_id",
                    foreignField: "blogId",
                    as: "comments",
                    pipeline: [
                        {
                            $match: {
                                blogId: new mongoose.Types.ObjectId(blogId),
                            },
                        },
                        {
                            $lookup: {
                                localField: "userId",
                                foreignField: "_id",
                                from: "users",
                                as: "user",
                                pipeline: [
                                    {
                                        $project: {
                                            username: 1,
                                            email: 1,
                                        },
                                    },
                                ],
                            },
                        },
                        { $addFields: { user: { $first: "$user" } } },
                    ],
                },
            },
        ]);

        const aggregatedBlog = blogs[0];

        if (!aggregatedBlog) {
            return NextResponse.json(
                {
                    error: "Blog Not Found",
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Details fetched Successfully",
            data: aggregatedBlog,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
};

export { GET };
