import { CommentInterface } from "@/interfaces/blog";
import { Skeleton } from "../ui/skeleton";
// eslint-disable-next-line react/display-name
const CommentCard = ({ comment }: { comment: CommentInterface }) => {
    return (
        <div className="bg-white p-3 my-2 rounded-lg">
            <p className="text-slate-400">{comment.user.username}</p>
            <p className="text-lg">{comment.comment}</p>
        </div>
    );
};

CommentCard.displayName = "CommentCard";

CommentCard.Skeleton = () => {
    return (
        <div className="bg-white p-3 my-2 rounded-lg w-full flex flex-col gap-3">
            <Skeleton className="h-5 w-[40%]" />
            <Skeleton className="h-16 w-full" />
        </div>
    );
};

export default CommentCard;
