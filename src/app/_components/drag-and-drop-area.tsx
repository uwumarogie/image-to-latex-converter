import React, { useState } from "react";

type DragAndDropArea = {
  onDrop: (file: File | null) => void;
  children: React.ReactNode;
};

export function DragAndDropArea({ onDrop, children }: DragAndDropArea) {
  const [dragActive, setDragActive] = useState(false);
  type DragEvent = React.DragEvent<HTMLDivElement>;
  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    onDrop(file);
    setDragActive(false);
  };

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`bg-white flex flex-col justify-center items-center rounded-xl p-5 border border-black ${dragActive ? "border-dashed" : ""}`}
    >
      {children}
    </div>
  );
}
