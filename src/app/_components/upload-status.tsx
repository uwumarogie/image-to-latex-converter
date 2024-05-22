import React from "react";

type UploadStatusProps = {
  loading: boolean;
  latex: string;
  error: string;
};

export function UploadStatus({ loading, latex, error }: UploadStatusProps) {
  return (
    <div className="flex w-full max-w-md flex-col items-center justify-center gap-4">
      {loading ? <p>Loading...</p> : <p>{latex}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
