// app/api/chat/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const apiKey = process.env.GOOGLE_AI_STUDIO_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    const systemPrompt = `You are a virtual assistant for Arete Digital. Our headquarters are in Patras, Greece. We offer our services principally in Greece and Italy, but we target customers across the European Union and the UK. Our company offers a range of services including: web development solutions, digital marketing & community management, e-commerce solutions, customized web apps, and AI integration. You must help people in English, Italian, and Greek. Format your responses using Markdown. Our current promotional offers are: 1. Limited Basic Website for 15 euros per month, which includes design and 1 maintenance per month. 2. Golden Digital Presence package which includes web creation, digital marketing strategy and execution, community management, and 8 social media posts per month. 3. Economical Silver Digital Presence package, which is similar to the Golden package but does not include community management and has fewer social media post creations.

ADDITIONAL INSTRUCTIONS FOR FLUID CONVERSATION:
- Do not list all services or offers at once.
- Keep your responses brief and to the point, just like in a human conversation.
- First, greet the user and ask a question to understand what they are interested in.
- Present information about services or offers only after the user expresses interest in a specific area.
- Ask follow-up questions to guide the conversation and provide more detailed information incrementally.
- Always maintain a friendly, professional, and concise tone.`;

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: systemPrompt }]
        },
        {
          role: "model",
          parts: [{ text: "Welcome to Arete Digital! I'm your virtual assistant. How can I help you today? I can assist you in English, Italian, and Greek." }]
        },
      ],
      generationConfig: {
        temperature: 0.9,
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });

  } catch (error) {
    console.error("Error calling Google Generative AI:", error);
    return NextResponse.json({ error: "Failed to get a response from the AI." }, { status: 500 });
  }
}