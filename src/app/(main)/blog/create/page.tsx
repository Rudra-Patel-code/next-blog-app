import React, { useState } from "react";

import QuillEditor from "@/components/editor/Editor";

const CreatePage = () => {
    return (
        <div className="p-3 max-w-[800px] mx-auto">
            <h2 className="font-bold text-2xl">Create Blog</h2>

            <div className="border-gray-600">
                <QuillEditor />
            </div>
        </div>
    );
};

export default CreatePage;
