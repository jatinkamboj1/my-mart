import { X } from "lucide-react";
import React from "react";

const Popup = ({ isOpen, onClose, width, height, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="overflow-none fixed left-0 right-0 bottom-0 z-[9999] flex items-center justify-center bg-secondary/50 backdrop-blur-sm"
      style={{ height: "100vh" }} onClick={onClose}
    >
      <div
        className="relative"
        style={{ width: width||"auto", height: height||"auto" }}
        onClick={(e) => e.stopPropagation()}
      >
        <X className="cursor-pointer absolute z-[9999] top-0 right-0 w-10 h-10 text-primary bg-white rounded-lg" onClick={onClose} />
        {children}
      </div>
    </div>
  );
};

export default Popup;
