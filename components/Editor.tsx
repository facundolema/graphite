"use client";

import hljs from "highlight.js";
import "highlight.js/styles/monokai.css";
import { useEffect, useState } from "react";
import { Fira_Code } from "next/font/google";

const fira_code = Fira_Code({ subsets: ["latin"] });

export default function Editor({
  url,
  language,
}: {
  url: string;
  language: string;
}) {
  function setEndOfContenteditable(contentEditableElement: HTMLElement) {
    let range = document.createRange();
    range.selectNodeContents(contentEditableElement);
    range.collapse(false);
    let selection = window.getSelection();
    if (!selection) return;
    selection.removeAllRanges();
    selection.addRange(range);
  }

  function handleInput() {
    const target = document.querySelector("[contentEditable]") as HTMLElement;
    const post = hljs.highlight(target.innerText, {
      language: language,
    }).value;
    target.innerHTML = post;
    setEndOfContenteditable(target);
  }

  useEffect(() => {
    handleInput();
  }, [language]);

  return (
    <div
      className="overflow-auto w-full h-full bg-[#222] flex justify-center items-center p-16"
      style={{ backgroundImage: `url(${url})`, backgroundSize: "cover" }}
    >
      <div
        contentEditable
        className={`
        ${fira_code.className} h-24 w-[75%] bg-[#222] whitespace-pre-wrap
        text-white rounded-lg p-8 overflow-auto drop-shadow-2xl min-h-[24rem] resize`}
        onInput={handleInput}
      />
    </div>
  );
}
