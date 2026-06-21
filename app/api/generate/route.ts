import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Only initialize Upstash if environment variables are present
const redis = (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

const ratelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(15, "10 m"),
    })
  : null;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "dummy");

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting Check
    if (ratelimit) {
      // In App Router Edge/Node API routes, we can try to get IP from headers
      const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
      const { success } = await ratelimit.limit(`ratelimit_${ip}`);
      if (!success) {
        return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
      }
    }

    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
       return NextResponse.json({ result: "⚠️ Warning: Please set GEMINI_API_KEY environment variable. For now, here's a dummy generated text: Synergy is a game-changer! 🚀 Agree?" }, { status: 200 });
    }

    // 2. Call Gemini
    const systemInstruction = `You are a viral LinkedIn influencer. Your task is to take the user's input text (which could be in any language) and translate it into a hyper-professional, overly enthusiastic LinkedIn post IN ENGLISH ONLY. You must: 1) Add unnecessary corporate jargon (e.g., 'synergy', 'game-changer', 'hustle'). 2) Turn mundane events into profound life lessons. 3) Use formatting with line breaks for dramatic effect. 4) End with a rhetorical question to drive engagement (e.g., 'Agree?', 'What are your thoughts on this?'). UNDER NO CIRCUMSTANCES should you output in any language other than English. DO NOT use any emojis.`;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction,
    });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text }] }],
      generationConfig: {
        temperature: 0.9,
      }
    });

    return NextResponse.json({ result: result.response.text() });
  } catch (error) {
    console.error("Error in generate API:", error);
    return NextResponse.json({ error: "Failed to generate text" }, { status: 500 });
  }
}
