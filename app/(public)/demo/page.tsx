"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardBody,
  Button,
  Input,
  Avatar,
  Chip,
  Tabs,
  Tab,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatMessage {
  id: string;
  user: string;
  message: string;
  avatar: string;
  timestamp: Date;
}

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState<"video" | "audio">("video");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      user: "Sarah Johnson",
      message: "Great lesson today! 👍",
      avatar: "https://i.pravatar.cc/150?img=1",
      timestamp: new Date(Date.now() - 300000),
    },
    {
      id: "2",
      user: "Mike Chen",
      message: "Can you explain the grammar part again?",
      avatar: "https://i.pravatar.cc/150?img=2",
      timestamp: new Date(Date.now() - 240000),
    },
    {
      id: "3",
      user: "Emma Davis",
      message: "This is so helpful! Thank you! 🙏",
      avatar: "https://i.pravatar.cc/150?img=3",
      timestamp: new Date(Date.now() - 180000),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [viewerCount, setViewerCount] = useState(234);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount((prev) => prev + Math.floor(Math.random() * 10) - 4);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      user: "You",
      message: newMessage,
      avatar: "https://i.pravatar.cc/150?img=10",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");
  };

  const shareToSocial = (platform: string) => {
    const url = window.location.href;
    const text =
      activeTab === "video"
        ? "Join me watching Fortuna Center English Learning Live!"
        : "🎙️ Listening to Fortuna Center English Podcast Live!";

    const urls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(text)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(text)}`,
    };

    window.open(urls[platform], "_blank", "width=600,height=400");
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-12">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4">
        {/* Tabs */}
        <div className="mb-8">
          <Tabs
            selectedKey={activeTab}
            onSelectionChange={(key) => setActiveTab(key as "video" | "audio")}
            size="lg"
            variant="underlined"
            classNames={{
              tabList:
                "gap-6 w-full relative rounded-none p-0 border-b border-gray-200",
              cursor: "w-full bg-blue-600",
              tab: "max-w-fit px-0 h-12",
              tabContent:
                "group-data-[selected=true]:text-blue-600 text-gray-500 font-medium",
            }}
          >
            <Tab
              key="video"
              title={
                <div className="flex items-center gap-2">
                  <Icon
                    icon="solar:videocamera-record-bold"
                    className="text-xl"
                  />
                  <span>Video Broadcast</span>
                </div>
              }
            />
            <Tab
              key="audio"
              title={
                <div className="flex items-center gap-2">
                  <Icon
                    icon="solar:radio-minimalistic-bold"
                    className="text-xl"
                  />
                  <span>Audio Broadcast</span>
                </div>
              }
            />
          </Tabs>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Player */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-black border-0 shadow-2xl shadow-blue-900/10 rounded-2xl overflow-hidden relative group">
              <CardBody className="p-0">
                {activeTab === "video" ? <VideoPlayer /> : <AudioPlayer />}

                {/* Viewer Count Overlay */}
                <div className="absolute top-6 right-6 flex items-center gap-3 z-20">
                  <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-white text-sm font-medium">
                    <Icon icon="solar:eye-bold" className="text-blue-400" />
                    <span>{viewerCount.toLocaleString()}</span>
                  </div>
                  <div className="px-3 py-1.5 bg-red-600 text-white rounded-full text-sm font-bold flex items-center gap-2 shadow-lg animate-pulse">
                    <span className="w-2 h-2 bg-white rounded-full" />
                    LIVE
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Stream Info */}
            <Card className="bg-white border border-gray-100 shadow-sm rounded-2xl">
              <CardBody className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {activeTab === "video"
                        ? "English Grammar Masterclass - Present Perfect Tense"
                        : "🎙️ Daily English Conversation - Episode 47"}
                    </h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {activeTab === "video"
                        ? "Learn how to use present perfect tense correctly with practical examples and exercises. Perfect for intermediate to advanced learners!"
                        : 'Today\'s topic: "Business English - How to conduct professional meetings in English". Join us for practical phrases and real-world examples!'}
                    </p>
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Icon
                          icon="solar:clock-circle-bold"
                          className="text-blue-600"
                        />
                        <span>
                          {activeTab === "video"
                            ? "Started 45 minutes ago"
                            : "Live for 32 minutes"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon
                          icon="solar:user-bold"
                          className="text-blue-600"
                        />
                        <span>
                          Teacher:{" "}
                          {activeTab === "video"
                            ? "Ms. Anderson"
                            : "James Parker"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Share Buttons */}
                <div className="flex items-center gap-3 pt-6 border-t border-gray-100">
                  <span className="text-sm font-medium text-gray-500 mr-2">
                    Share:
                  </span>
                  <Button
                    size="sm"
                    variant="flat"
                    className="bg-blue-50 text-blue-600 hover:bg-blue-100"
                    startContent={<Icon icon="logos:facebook" />}
                    onPress={() => shareToSocial("facebook")}
                  >
                    Facebook
                  </Button>
                  <Button
                    size="sm"
                    variant="flat"
                    className="bg-sky-50 text-sky-600 hover:bg-sky-100"
                    startContent={<Icon icon="logos:twitter" />}
                    onPress={() => shareToSocial("twitter")}
                  >
                    Twitter
                  </Button>
                  <Button
                    size="sm"
                    variant="flat"
                    className="bg-green-50 text-green-600 hover:bg-green-100"
                    startContent={<Icon icon="logos:whatsapp-icon" />}
                    onPress={() => shareToSocial("whatsapp")}
                  >
                    WhatsApp
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Live Chat */}
          <div className="lg:col-span-1">
            <Card className="bg-white border border-gray-100 shadow-sm h-[calc(100vh-140px)] flex flex-col rounded-2xl sticky top-24">
              <CardBody className="p-0 flex flex-col h-full">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <Icon
                      icon="solar:chat-round-dots-bold"
                      className="text-blue-600"
                    />
                    Live Chat
                  </h3>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
                  <AnimatePresence>
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex gap-3 group"
                      >
                        <Avatar
                          src={msg.avatar}
                          size="sm"
                          className="shrink-0 ring-2 ring-gray-100"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-2 mb-1">
                            <span className="font-semibold text-gray-900 text-sm">
                              {msg.user}
                            </span>
                            <span className="text-xs text-gray-400">
                              {msg.timestamp.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                          <div className="bg-gray-50 rounded-2xl rounded-tl-none px-4 py-2 inline-block max-w-full">
                            <p className="text-gray-700 text-sm break-words">
                              {msg.message}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  <div ref={chatEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-gray-100 bg-white">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onValueChange={setNewMessage}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleSendMessage()
                      }
                      classNames={{
                        input: "text-gray-900",
                        inputWrapper:
                          "bg-gray-50 border-gray-200 hover:bg-gray-100 focus-within:!bg-white shadow-none",
                      }}
                      variant="bordered"
                    />
                    <Button
                      isIconOnly
                      className="bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                      onPress={handleSendMessage}
                    >
                      <Icon icon="solar:plain-2-bold" className="text-xl" />
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// Video Player Component
function VideoPlayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { title: "Present Perfect Tense", subtitle: "Usage & Examples" },
    { title: "Have / Has + Past Participle", subtitle: "Structure" },
    { title: "Time Expressions", subtitle: "already, yet, just, ever, never" },
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(slideInterval);
  }, [slides.length]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{ x: number; y: number; vx: number; vy: number }> = [];

    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }

    const animate = () => {
      // Background
      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
      );
      gradient.addColorStop(0, "#1e293b");
      gradient.addColorStop(1, "#0f172a");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(37, 99, 235, 0.3)"; // Blue particles
        ctx.fill();
      });

      // Teacher video box
      const teacherW = canvas.width * 0.25;
      const teacherH = canvas.height * 0.35;
      const teacherX = 40;
      const teacherY = 40;

      // Box shadow/border for teacher
      ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
      ctx.shadowBlur = 20;
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(teacherX, teacherY, teacherW, teacherH);
      ctx.shadowBlur = 0;

      // Teacher content
      ctx.font = "bold 64px Arial";
      ctx.fillStyle = "#3b82f6"; // Blue
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("👩‍🏫", teacherX + teacherW / 2, teacherY + teacherH / 2 - 20);

      ctx.font = "bold 20px Inter, Arial";
      ctx.fillStyle = "#ffffff";
      ctx.fillText(
        "Ms. Anderson",
        teacherX + teacherW / 2,
        teacherY + teacherH - 40
      );

      // Presentation slide
      const slideX = 40;
      const slideY = teacherY + teacherH + 40;
      const slideW = canvas.width - 80;
      const slideH = canvas.height - slideY - 40;

      // Slide background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(slideX, slideY, slideW, slideH);

      const slide = slides[currentSlide];

      // Slide content
      ctx.font = "bold 56px Inter, Arial";
      ctx.fillStyle = "#1e293b";
      ctx.fillText(slide.title, slideX + slideW / 2, slideY + 100);

      ctx.font = "36px Inter, Arial";
      ctx.fillStyle = "#64748b";
      ctx.fillText(slide.subtitle, slideX + slideW / 2, slideY + 180);

      // Example box
      ctx.fillStyle = "#eff6ff"; // Light blue
      ctx.fillRect(slideX + 80, slideY + 240, slideW - 160, 140);
      ctx.strokeStyle = "#bfdbfe";
      ctx.lineWidth = 2;
      ctx.strokeRect(slideX + 80, slideY + 240, slideW - 160, 140);

      ctx.font = "bold 28px Inter, Arial";
      ctx.fillStyle = "#2563eb"; // Blue
      ctx.textAlign = "left";
      ctx.fillText("Example:", slideX + 120, slideY + 290);

      ctx.font = "24px Inter, Arial";
      ctx.fillStyle = "#334155";
      ctx.fillText(
        "I have studied English for 5 years.",
        slideX + 120,
        slideY + 340
      );

      animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [currentSlide, slides]);

  return (
    <div className="relative aspect-video bg-slate-900">
      <canvas
        ref={canvasRef}
        width={1280}
        height={720}
        className="w-full h-full"
      />

      <div className="absolute top-6 left-6 px-4 py-2 bg-black/40 backdrop-blur-md rounded-lg text-white text-xs font-medium border border-white/10">
        HD 1080p
      </div>

      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/20">
        <Button
          isIconOnly
          size="lg"
          className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full hover:scale-110 transition-transform"
          onPress={() => setIsPlaying(!isPlaying)}
        >
          <Icon
            icon={isPlaying ? "solar:pause-bold" : "solar:play-bold"}
            className="text-4xl text-white"
          />
        </Button>
      </div>
    </div>
  );
}

// Audio Player Component
function AudioPlayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [audioLevel, setAudioLevel] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;
    const bars = 60;

    const animate = () => {
      time += 0.1;

      // Dark elegant background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#1e3a8a"); // Dark blue
      gradient.addColorStop(1, "#0f172a"); // Slate 900
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = canvas.width / bars;
      let maxHeight = 0;

      for (let i = 0; i < bars; i++) {
        const frequency = Math.sin(time + i * 0.5) * 0.5 + 0.5;
        const noise = Math.random() * 0.3;
        const height = (frequency + noise) * canvas.height * 0.6;
        maxHeight = Math.max(maxHeight, height);

        const x = i * barWidth;
        const y = canvas.height - height;

        const barGradient = ctx.createLinearGradient(x, y, x, canvas.height);
        barGradient.addColorStop(0, "#60a5fa"); // Light blue
        barGradient.addColorStop(1, "#2563eb"); // Blue

        ctx.fillStyle = barGradient;
        ctx.fillRect(x, y, barWidth - 4, height);
      }

      setAudioLevel(Math.round((maxHeight / (canvas.height * 0.6)) * 100));

      ctx.font = "bold 72px Arial";
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("🎙️", canvas.width / 2, canvas.height / 2 - 50);

      ctx.font = "bold 36px Inter, Arial";
      ctx.fillText("Fortuna Radio", canvas.width / 2, canvas.height / 2 + 40);

      animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="relative">
      <canvas ref={canvasRef} width={1280} height={600} className="w-full" />

      <div className="absolute top-6 left-6 bg-black/40 backdrop-blur-md rounded-xl p-4 min-w-[200px] border border-white/10">
        <div className="flex items-center gap-3 mb-2">
          <Icon
            icon="solar:soundwave-bold"
            className="text-2xl text-blue-400"
          />
          <div className="flex-1">
            <p className="text-xs text-white/60">Audio Level</p>
            <p className="text-lg font-bold text-white">{audioLevel}%</p>
          </div>
        </div>
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-blue-500"
            animate={{ width: `${audioLevel}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 bg-black/60 backdrop-blur-md rounded-full px-8 py-4 border border-white/10">
        <Button
          isIconOnly
          size="lg"
          className="bg-blue-600 text-white rounded-full hover:scale-105 transition-transform"
          onPress={() => setIsPlaying(!isPlaying)}
        >
          <Icon
            icon={isPlaying ? "solar:pause-bold" : "solar:play-bold"}
            className="text-2xl"
          />
        </Button>
        <div className="text-white">
          <p className="text-xs text-blue-200 font-medium">LIVE DURATION</p>
          <p className="font-bold text-xl font-mono">32:15</p>
        </div>
      </div>
    </div>
  );
}
