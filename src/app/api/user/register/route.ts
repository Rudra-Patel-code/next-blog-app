import mongoose from "mongoose";
import User from "@/models/user.model";
import { connectToDb } from "@/db";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

connectToDb();

const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();

        const { email, username, password } = body;

        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            );
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        return NextResponse.json({
            message: "Registered Successfully, Login",
            success: true,
            data: {},
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

export { POST };
