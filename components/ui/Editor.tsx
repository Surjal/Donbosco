"use client";

import React, { useMemo, useState } from "react";
import "quill/dist/quill.bubble.css";
import dynamic from "next/dynamic";
interface PreviewProps {
  value: string;
  className?: string;
}
export default function Preview({ value, className }: PreviewProps) {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill-new"), { ssr: false }),
    [],
  );

  return (
    <div
      className={`w-full overflow-hidden [&_.ql-editor]:text-justify [&_.ql-editor]:hyphens-auto [&_.ql-editor_p]:text-justify [&_.ql-editor_li]:text-justify [&_.ql-editor]:!px-0 ${className ?? ""}`}
    >
      <ReactQuill
        theme="bubble"
        value={value}
        modules={{ toolbar: false }}
        readOnly
      />
    </div>
  );
}
