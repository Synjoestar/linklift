"use client";

import { useState } from "react";
import { Copy, Loader2 } from "lucide-react";
import Image from "next/image";
import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_INSTRUCTION = `You are a viral LinkedIn influencer. Your task is to take the user's input text (which could be in any language) and translate it into a hyper-professional, overly enthusiastic LinkedIn post IN ENGLISH ONLY. You must: 1) Add unnecessary corporate jargon (e.g., 'synergy', 'game-changer', 'hustle'). 2) Turn mundane events into profound life lessons. 3) Use formatting with line breaks for dramatic effect. 4) End with a rhetorical question to drive engagement (e.g., 'Agree?', 'What are your thoughts on this?'). UNDER NO CIRCUMSTANCES should you output in any language other than English. DO NOT use any emojis.`;

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    setError("");
    setOutputText("");

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) {
        setError("Gemini API key not configured. Please set NEXT_PUBLIC_GEMINI_API_KEY.");
        return;
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        systemInstruction: SYSTEM_INSTRUCTION,
      });

      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: inputText }] }],
        generationConfig: { temperature: 0.9 },
      });

      setOutputText(result.response.text());
    } catch (err: unknown) {
      console.error("Error calling Gemini:", err);
      const message = err instanceof Error ? err.message : String(err);
      setError(`Error: ${message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!outputText) return;
    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text", err);
    }
  };

  return (
    <main className="flex-1 flex flex-col p-[12px] lg:p-[20px] max-w-[1200px] mx-auto w-full relative">
      <header className="flex items-center gap-[16px] mb-[32px] mt-[16px]">
        <div className="w-[48px] h-[48px] card-clean flex items-center justify-center overflow-hidden">
          <Image src="/logo.png" alt="LINKLIFT Logo" width={48} height={48} className="object-cover" />
        </div>
        <h1 className="text-display">LINKLIFT</h1>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-[12px] lg:gap-[20px]">
        {/* Left Column: Input */}
        <section className="flex flex-col gap-[12px] h-full">
          <div className="flex justify-between items-center">
            <h2 className="text-h2">ORIGINAL TEXT</h2>
            <span className="text-label text-[var(--color-text-ghost)]">ANY LANGUAGE</span>
          </div>
          <textarea
            className="input-clean w-full flex-1 min-h-[300px] lg:min-h-[400px] p-[20px] resize-none"
            placeholder="Paste your normal text here (any language)..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />

          <button
            onClick={handleGenerate}
            disabled={isLoading || !inputText.trim()}
            className="btn-primary flex items-center justify-center gap-[8px] py-[16px] w-full mt-auto disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader2 className="animate-spin w-[20px] h-[20px]" /> : "TRANSLATE TO LINKEDIN"}
          </button>
        </section>

        {/* Right Column: Output */}
        <section className="flex flex-col gap-[12px] h-full">
          <div className="flex justify-between items-center">
            <h2 className="text-h2 text-[var(--color-primary)]">LINKEDIN READY</h2>
            <span className="text-label text-[var(--color-primary)]">ENGLISH ONLY</span>
          </div>

          <div className="relative flex-1 min-h-[300px] lg:min-h-[400px] flex flex-col">
            {error ? (
              <div className="input-clean w-full flex-1 p-[20px] flex items-start">
                <p className="text-[var(--color-negative)] text-body">{error}</p>
              </div>
            ) : (
              <textarea
                className="input-clean w-full flex-1 p-[20px] resize-none cursor-default"
                placeholder="Your hyper-professional, overly enthusiastic LinkedIn post will appear here..."
                value={outputText}
                readOnly
              />
            )}

            {outputText && !error && (
              <div className="absolute bottom-[16px] right-[16px]">
                <button
                  onClick={handleCopy}
                  className="btn-outline px-[12px] py-[8px] flex items-center gap-[8px]"
                  title="Copy to clipboard"
                >
                  <Copy className="w-[16px] h-[16px] text-[var(--color-text-secondary)]" />
                  <span className="text-label text-[var(--color-text-secondary)]">{copied ? "COPIED!" : "COPY"}</span>
                </button>
              </div>
            )}
          </div>
        </section>
      </div>

      <footer className="mt-[32px] pt-[16px] border-t border-[var(--color-border-default)] flex flex-col sm:flex-row items-center justify-between gap-[16px] text-[var(--color-text-secondary)]">
        <p className="text-body-small">
          © {new Date().getFullYear()} LINKLIFT. All rights reserved.
        </p>
        <div className="flex items-center gap-[16px]">
          <a
            href="https://github.com/Synjoestar"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-[6px] hover:text-[var(--color-text-primary)] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            <span className="text-label">GITHUB</span>
          </a>
          <a
            href="https://trakteer.id/kaidendesu"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-[6px] hover:text-[#e74c3c] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
              <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
              <line x1="6" x2="6" y1="2" y2="4" />
              <line x1="10" x2="10" y1="2" y2="4" />
              <line x1="14" x2="14" y1="2" y2="4" />
            </svg>
            <span className="text-label">TRAKTEER</span>
          </a>
        </div>
      </footer>
    </main>
  );
}
