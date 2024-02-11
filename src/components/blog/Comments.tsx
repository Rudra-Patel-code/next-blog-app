"use client";
// eslint-disable-next-line react/display-name
import { FormEvent, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import toast from "react-hot-toast";
import { requestHandler } from "@/helper";
import { addCommentApi } from "@/apiRoutes";
import { CircleDashed } from "lucide-react";
import { Bloginterface } from "@/interfaces/blog";
import CommentCard from "./CommentCard";

const Comments = ({
    blogId,
    blog,
}: {
    blogId: string;
    blog: Bloginterface;
}) => {
    const [addLoading, setAddLoading] = useState<boolean>(false);
    const [myComment, setMyComment] = useState<string>("");
    const [commentsLoading, setCommentsLoading] = useState<boolean>(true);
    const [commentsList, setCommentsList] = useState<any>([]);

    useEffect(() => {
        setCommentsList(blog.comments);
        setCommentsLoading(false);
    }, []);

    const addCommentHandler = async (e: FormEvent<HTMLFormElement>) => {
        if (myComment.length < 3) {
            toast.error("Comment should be more than 3 characters long");
        }

        await requestHandler(
            async () => await addCommentApi(blogId, myComment),
            setAddLoading,
            (res) => {
                setCommentsList((prev: any) => [res.data.comment, ...prev]);
                toast.success(res.message);
            },
            (error) => {
                toast.error(error);
            }
        );
    };

    return (
        <>
            <div className="w-full flex flex-col">
                <form
                    onSubmit={addCommentHandler}
                    className="flex w-full gap-3"
                >
                    <Button>
                        {addLoading ? (
                            <>
                                <CircleDashed className="animate-spin" /> Adding
                            </>
                        ) : (
                            "Add"
                        )}
                    </Button>
                    <Input
                        value={myComment}
                        onChange={(e) => setMyComment(e.target.value)}
                        placeholder="Add a Comment..."
                    />
                </form>

                <div>
                    {commentsLoading && (
                        <>
                            <CommentCard.Skeleton />
                            <CommentCard.Skeleton />
                            <CommentCard.Skeleton />
                        </>
                    )}
                    {commentsList.map((comment: any) => (
                        <CommentCard comment={comment} key={comment._id} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Comments;
