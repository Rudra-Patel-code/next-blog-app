import { connectToDb } from "@/db";
import { getDataFromToken } from "@/helper";
import Blog from "@/models/blog.model";
import User from "@/models/user.model";
import cloudinary from "cloudinary";
import DataUriParser from "datauri/parser";

import { NextRequest, NextResponse } from "next/server";

connectToDb();

const POST = async (req: NextRequest) => {
    try {
        const userId = await getDataFromToken(req);

        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json(
                { error: "User not found, Please Login again" },
                { status: 404 }
            );
        }
        //
        const body = await req.formData();
        const title = body.get("title");
        const content = body.get("content") as string;
        const image = body.get("image") as string;
        const mimeType = body.get("mimeType") as string;

        const buffer = Buffer.from(image, "base64");

        const parser = new DataUriParser();
        const extension = mimeType.split("/")[1];
        const dataUri = parser.format(`.${extension}`, buffer);

        cloudinary.v2.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });

        const res = await cloudinary.v2.uploader.upload(dataUri.content!, {
            resource_type: "auto",
        });

        await Blog.create({
            title,
            content: JSON.parse(content),
            creator: user._id,
            cover: {
                url: res.url,
                public_id: res.public_id,
            },
        });

        return NextResponse.json({
            message: "Blog created successfully",
            success: true,
            data: {},
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
};

export { POST };
