"use client";

import { loginApi } from "@/apiRoutes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { requestHandler } from "@/helper";

import { CircleDashed } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";

const LoginPage = () => {
    const router = useRouter();

    const [user, setuser] = useState<{
        email: string;
        password: string;
    }>({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState<boolean>(false);

    const loginHandler = async (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        await requestHandler(
            async () => await loginApi(user),
            setLoading,
            (res) => {
                localStorage.setItem("user", JSON.stringify(res.data.user));
                toast.success(res.message);
                router.push("/");
            },
            (error) => {
                toast.error(error);
            }
        );
    };

    return (
        <>
            <h1 className="text-3xl font-bold text-center mb-5">Login</h1>
            <form
                onSubmit={loginHandler}
                className="flex flex-col gap-3 w-full"
            >
                <Input
                    type="email"
                    required
                    value={user.email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setuser({ ...user, email: e.target.value })
                    }
                    placeholder="Enter your Email"
                />
                <Input
                    type={"password"}
                    required
                    value={user.password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setuser({ ...user, password: e.target.value })
                    }
                    placeholder="Enter your password"
                />

                <Button type="submit" disabled={loading}>
                    {loading ? (
                        <>
                            <CircleDashed className="animate-spin" /> submiting
                        </>
                    ) : (
                        "Login"
                    )}
                </Button>
            </form>

            <div className="flex w-full items-center gap-2 my-3">
                <div className="w-full bg-slate-600 h-[1px]" />
                <p>or</p>
                <div className="w-full bg-slate-600 h-[1px]" />
            </div>

            <div>
                Create Account.
                <Link href={"/register"} className="text-purple-500">
                    {" "}
                    Register Here
                </Link>
            </div>
        </>
    );
};

export default LoginPage;
