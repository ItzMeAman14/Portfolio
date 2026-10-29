"use client";

import React, { useState } from "react";
import { useToast } from "./Toast";
import { siteConfig } from "@/data/site";
import { Magnetic } from "./MagneticButton";

export function CopyEmailButton() {
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();
  const email = siteConfig.email;

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();

    const onCopySuccess = () => {
      setCopied(true);
      showToast(`Copied ${email} to clipboard!`);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    };

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(email)
        .then(onCopySuccess)
        .catch(() => fallbackCopy(email, onCopySuccess));
    } else {
      fallbackCopy(email, onCopySuccess);
    }
  };

  const fallbackCopy = (text: string, callback: () => void) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    textarea.style.top = "-9999px";
    textarea.setAttribute("readonly", "");
    document.body.appendChild(textarea);
    textarea.select();
    try {
      const successful = document.execCommand("copy");
      if (successful) callback();
    } catch {
      showToast(`Email: ${email}`);
    }
    document.body.removeChild(textarea);
  };

  return (
    <Magnetic>
      <button
        type="button"
        className={`btn-copy-email ${copied ? "copied" : ""}`}
        id="email-copy-btn"
        aria-label="Copy email address to clipboard"
        onClick={handleCopy}
      >
        {!copied ? (
          <svg
            className="copy-icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        ) : (
          <svg
            className="check-icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        )}
        <span className="btn-copy-text" id="btn-copy-label" aria-live="polite">
          {copied ? "Copied!" : "Copy email"}
        </span>
      </button>
    </Magnetic>
  );
}
