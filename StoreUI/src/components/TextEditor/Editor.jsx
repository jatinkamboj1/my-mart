import { useState } from "react";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";


export default function Editor({ value, onChange }) {
  const [mode, setMode] = useState("visual"); // visual | html

  return (
    <div>
      {/* Toggle */}
      <div className="mb-2">
        <button
          className={`btn btn-sm ${
            mode === "visual" ? "btn-danger" : "btn-outline-danger"
          }`}
          onClick={() => setMode("visual")}
        >
          Visual
        </button>

        <button
          className={`btn btn-sm ms-2 ${
            mode === "html" ? "btn-danger" : "btn-outline-danger"
          }`}
          onClick={() => setMode("html")}
        >
          HTML
        </button>
      </div>

      {/* Editor */}
      {mode === "visual" ? (
        <ReactQuill theme="snow" value={value} onChange={onChange} />
      ) : (
        <textarea
          className="form-control"
          rows={8}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{ fontFamily: "monospace" }}
        />
      )}
    </div>
  );
}