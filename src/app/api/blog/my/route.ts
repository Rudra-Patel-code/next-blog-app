import { connectToDb } from "@/db";
import { getDataFromToken } from "@/helper";
import { commonBlogAggregator } from "@/helper/aggregator";
import Blog from "@/models/blog.model";
import User from "@/models/user.model";
import mongoose from "mongoose";

import { NextRequest, NextResponse } from "next/server";

connectToDb();

const GET = async (req: NextRequest) => {
    try {
        const userId = await getDataFromToken(req);

        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json(
                { error: "User not found, Please Login again" },
                { status: 404 }
            );
        }

        const blogs = await Blog.aggregate([
            {
                $match: {
                    creator: new mongoose.Types.ObjectId(user._id),
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
            message: "Succefully Got your Blogs",
            success: true,
            data: { blogs },
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
};

export { GET };
