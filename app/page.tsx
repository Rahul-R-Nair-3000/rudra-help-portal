import { Hero } from "@/components/hero";
import { ChatWindow } from "@/components/chatbot";
import { IntroSequence } from "@/components/intro";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0C0E14] text-[#F0F4F8]">
      {/* Session Intro Sequence Overlay */}
      <IntroSequence />

      {/* Hero Section */}
      <Hero />

      {/* Chatbot Interface */}
      <ChatWindow />
    </main>
  );
}

