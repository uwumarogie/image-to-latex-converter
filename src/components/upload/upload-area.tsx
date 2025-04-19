import React from "react";
import { Upload } from "lucide-react";

type UploadArea = {
  onClick(): void;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  inputRef: React.RefObject<HTMLInputElement | null>;
};

export function UploadArea({ onClick, onChange, inputRef }: UploadArea) {
  return (
    <span
      className="flex flex-col items-center justify-center h-64 cursor-pointer rounded-lg border border-dashed p-12 text-center"
      onClick={onClick}
    >
      <Upload className="h-10 w-10 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium">Upload an image</h3>
      <p className="text-sm text-muted-foreground mt-1">Click to upload</p>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onChange}
      />
    </span>
  );
}
