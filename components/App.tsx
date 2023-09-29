"use client";

import Editor from "@/components/Editor";
import LanguageSelector from "@/components/LanguageSelector";
import { useState } from "react";
import { Rock_Salt } from "next/font/google";
import html2canvas from "html2canvas";

const rock_salt = Rock_Salt({ weight: "400", subsets: ["latin"] });

export default function App() {
  const [language, setLanguage] = useState("javascript");

  function handleDownload() {
    const capture = document.querySelector("#capture");
    html2canvas(capture, { useCORS: true }).then((canvas) => {
      document.querySelector("canvas")?.remove();
      document.querySelector("#canvasContainer")!.appendChild(canvas);
      const link = document.createElement("a");
      link.download = "code.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  }

  return (
    <div className="overflow-auto bg-[#1A1A1A] text-white h-screen flex flex-col justify-center items-center">
      <h1 className={`${rock_salt.className} text-8xl my-16`}>Graphite</h1>
      <div className="w-[75%]">
        <LanguageSelector setLanguage={setLanguage} />
        <div id="capture">
          <Editor
            url="https://images.unsplash.com/photo-1695670147761-3406bd9ba64e"
            language={language}
          />
        </div>
        <div id="canvasContainer" hidden />
        <button
          className="bg-[#333] rounded-lg px-4 py-2 my-2"
          onClick={handleDownload}
        >
          Download
        </button>
      </div>
    </div>
  );
}
