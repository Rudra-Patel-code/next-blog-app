import { connectToDb } from "@/db";
import { commonBlogAggregator } from "@/helper/aggregator";
import Blog from "@/models/blog.model";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

connectToDb();

const GET = async (req: NextRequest) => {
    try {
        const blogs = await Blog.aggregate([
            ...commonBlogAggregator(),

            {
                $lookup: {
                    from: "comments",
                    localField: "_id",
                    foreignField: "blogId",
                    as: "comments",
                    pipeline: [
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


        return NextResponse.json({
            success: true,
            message: "Blogs fetched Successfully",
            data: blogs,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
};

export { GET };
