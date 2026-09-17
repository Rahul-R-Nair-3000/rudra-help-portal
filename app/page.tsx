import { ChatWindow } from "@/components/chatbot";
import { IntroSequence } from "@/components/intro";
import { BackgroundAsteroids } from "@/components/ui/BackgroundAsteroids";
import { VideoScrollCanvas } from "@/components/scroll-animation";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0C0E14] text-[#F0F4F8] [overflow-x:clip]">
      {/* Dynamic Space Background Asteroid Field */}
      <BackgroundAsteroids />

      {/* Session Intro Sequence Overlay */}
      <IntroSequence />

      {/* Primary Video Scroll Frame-by-Frame Hero Experience */}
      <VideoScrollCanvas />

      {/* Chatbot Interface */}
      <ChatWindow />
    </main>
  );
}
