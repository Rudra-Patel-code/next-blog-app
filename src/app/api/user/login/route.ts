import { connectToDb } from "@/db";
import User from "@/models/user.model";
import jwt from "jsonwebtoken";

import { NextRequest, NextResponse } from "next/server";

connectToDb();

const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { email, password } = body;

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { error: "user does not exists" },
                { status: 404 }
            );
        }


        const isPasswordCorrect = user.isPasswordCorrect(password);

        if (!isPasswordCorrect) {
            return NextResponse.json(
                { error: "Invalid password" },
                { status: 400 }
            );
        }


        const token = await jwt.sign(
            {
                id: user._id,
                username: user.username,
                email: user.email,
            },
            process.env.TOKEN_SECRET!,
            {
                expiresIn: "30d",
            }
        );


        const _user = await User.findById(user._id).select("-password");

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
            data: {
                user: _user,
            },
        });
        response.cookies.set("token", token, {
            httpOnly: true,
        });
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

export { POST };
