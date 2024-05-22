"use client";

import React, { useState } from "react";
import { sendFileToServer } from "@/app/_utils/handleInput";
import {DragAndDropArea} from "@/app/_components/drag-and-drop-area";
import {CloudUploadIcon} from "../../../public/cloud-upload-icon";
import {UploadStatus} from "@/app/_components/upload-status";

export function UploadForm () {
    const [file, setFile] = useState<File | null>(null);
    const [latex, setLatex] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleInputChange = async (file: File | null) => {
        if (!file) {
            setError("Please select a file before submitting.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        setLoading(true);

        const response = await sendFileToServer(formData, "/api/convert");

        if (response.text !== undefined) {
            setLatex(response.text);
            setError("");
        } else {
            setError("Failed to convert image to LaTeX");
        }
        setLoading(false);
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (!event.target.files) return;
        const file = event.target.files[0];
        setFile(file);
        await handleInputChange(file);
    };

    const handleDrop = async (file: File | null) => {
        setFile(file);
        await handleInputChange(file);
    };

    const copyTextToClipboard = () => {
        navigator.clipboard.writeText(latex)
            .then(() => alert('Text copied to clipboard'))
            .catch((err) => console.error('Failed to copy text: ', err));
    };

    return (
        <div className="flex flex-col items-center justify-center gap-6 py-12 md:py-24">
            <DragAndDropArea onDrop={handleDrop}>
                <label
                    htmlFor="file"
                    className="flex flex-col items-center gap-2 cursor-pointer"
                >
                    {file === null ? (
                        <React.Fragment>
                            <h2 className="text-2xl font-bold text-black">Upload Formula</h2>
                            <input
                                type="file"
                                id="file"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <CloudUploadIcon className="h-12 w-12 text-indigo-500" />
                            <p className="text-gray-600">
                                Drag and drop your formula image or click to upload
                            </p>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <h1>FILE UPLOADED: {file.name}</h1>
                        </React.Fragment>
                    )}
                </label>
            </DragAndDropArea>
            <UploadStatus loading={loading} latex={latex} error={error} />
            <button className="w-6/12 rounded-xl p-5 bg-purple-500 text-white hover:bg-purple-600" onClick={copyTextToClipboard}>
                Copy to Clipboard
            </button>
        </div>
    );
}