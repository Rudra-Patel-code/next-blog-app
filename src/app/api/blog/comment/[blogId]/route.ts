import { getDataFromToken } from "@/helper";
import { commonBlogAggregator } from "@/helper/aggregator";
import Blog from "@/models/blog.model";
import Comment from "@/models/comment.model";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

const POST = async (
    req: NextRequest,
    { params: { blogId } }: { params: { blogId: string } }
) => {
    try {

        const userId = await getDataFromToken(req);

        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json(
                { error: "User not found, Please Login again" },
                { status: 404 }
            );
        }

        const body = await req.json();

        const { comment } = body;


        const newComment = await Comment.create({
            comment,
            blogId,
            userId: user._id,
        });


        return NextResponse.json({
            message: "Comment created successfully",
            success: true,
            data: {
                comment: newComment,
            },
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
};

export { POST };
