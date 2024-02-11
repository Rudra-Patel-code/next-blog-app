"use client";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CircleDashed } from "lucide-react";
import { requestHandler } from "@/helper";
import { createBlogApi } from "@/apiRoutes";
import toast from "react-hot-toast";
import { Label } from "../ui/label";

const QuillEditor = () => {
    const [content, setContent] = useState("");
    const [title, setTitle] = useState<string>("");
    const quillRef = useRef<any | null>(null);
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [imagePrev, setImagePrev] = useState<string | null>(null);
    const [image, setImage] = useState<string | null>(null);

    const handleChange = (value: string) => {
        setContent(value);
    };

    const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onloadend = () => {
            if (typeof reader.result === "string") {
                setImagePrev(reader.result);
                setImage(reader.result);
            }
        };
    };

   

    const chunkContent = (content: string, chunkSize: number): any => {
        return new Promise((resolve, reject) => {
            try {
                const stringChunks = [];
                for (let i = 0; i < content.length; i += chunkSize) {
                    stringChunks.push(content.slice(i, i + chunkSize));
                }
                resolve(stringChunks);
            } catch (error) {
                reject(error);
            }
        });
    };

    const createBlogHandler = async () => {
        const formData = new FormData();

        const resultChunks = await chunkContent(content, 500);

        const resultString = JSON.stringify(resultChunks);


        formData.append("title", title);
        formData.append("content", resultString);
        const base64Image = image!.split(",")[1];
        const mimeType = image!.split(",")[0].split(":")[1].split(";")[0];
        formData.append("image", base64Image);
        formData.append("mimeType", mimeType);

        await requestHandler(
            async () => await createBlogApi(formData),
            setLoading,
            (res) => {
                setContent("");
                setTitle("");
                setImagePrev(null);
                setImage(null);
                toast.success(res.message);
            },
            (error) => {
                toast.error(error);
            }
        );
    };

    useEffect(() => {
        if (title.length < 3 || content.length < 100) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
    }, [content, title]);

    return (
        <>
            <div className="flex flex-col gap-3 mt-4">
                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter Title..."
                />

                <div className="flex flex-col w-full items-start gap-2 my-4">
                    <Label htmlFor="image">Add Cover Image</Label>
                    <Input
                        accept="image/*"
                        name="image"
                        type="file"
                        onChange={changeImageHandler}
                    />
                </div>

                <div className="bg-white">
                    {ReactQuill && (
                        <ReactQuill
                            ref={quillRef}
                            modules={{
                                toolbar: [
                                    [{ header: [1, 2, false] }],
                                    ["bold", "italic", "underline"],
                                    ["link", "image", "video"],
                                    ["clean"],
                                    [{ list: "bullet" }],
                                    [{ list: "ordered" }],
                                    [{ align: [] }], // For all alignment options
                                    // Or individual buttons:
                                    [{ align: "left" }],
                                    [{ align: "center" }],
                                    [{ align: "right" }],
                                    [{ align: "justify" }],
                                ],
                            }}
                            formats={[
                                "header",
                                "bold",
                                "italic",
                                "underline",
                                "list",
                                "align",
                                "link",
                                "image",
                                "video",
                            ]}
                            theme="snow"
                            value={content}
                            onChange={handleChange}
                        />
                    )}
                </div>

                <div className="flex justify-end ">
                    <Button
                        onClick={createBlogHandler}
                        disabled={isDisabled || loading}
                    >
                        {loading ? (
                            <>
                                <CircleDashed className="animate-spin" />{" "}
                                submiting
                            </>
                        ) : (
                            "Post"
                        )}
                    </Button>
                </div>

                {imagePrev && (
                    <div className="max-w-[70%] mx-auto aspect-square">
                        <img
                            src={imagePrev}
                            className="object-cover"
                            alt="coverImage"
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export default QuillEditor;
