"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardBody, Button, Input, Avatar, Chip, Tabs, Tab } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';

interface ChatMessage {
  id: string;
  user: string;
  message: string;
  avatar: string;
  timestamp: Date;
}

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState<'video' | 'audio'>('video');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      user: 'Sarah Johnson',
      message: 'Great lesson today! 👍',
      avatar: 'https://i.pravatar.cc/150?img=1',
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: '2',
      user: 'Mike Chen',
      message: 'Can you explain the grammar part again?',
      avatar: 'https://i.pravatar.cc/150?img=2',
      timestamp: new Date(Date.now() - 240000)
    },
    {
      id: '3',
      user: 'Emma Davis',
      message: 'This is so helpful! Thank you! 🙏',
      avatar: 'https://i.pravatar.cc/150?img=3',
      timestamp: new Date(Date.now() - 180000)
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [viewerCount, setViewerCount] = useState(234);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount(prev => prev + Math.floor(Math.random() * 10) - 4);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message: ChatMessage = {
      id: Date.now().toString(),
      user: 'You',
      message: newMessage,
      avatar: 'https://i.pravatar.cc/150?img=10',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const shareToSocial = (platform: string) => {
    const url = window.location.href;
    const text = activeTab === 'video' 
      ? 'Join me watching Fortuna Center English Learning Live!'
      : '🎙️ Listening to Fortuna Center English Podcast Live!';
    
    const urls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
    };
    
    window.open(urls[platform], '_blank', 'width=600,height=400');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                <Icon icon="solar:book-bold" className="text-2xl text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Fortuna Center</h1>
                <p className="text-xs text-white/60">English Learning Platform</p>
              </div>
            </Link>
            
            <div className="flex items-center gap-3">
              <Chip 
                color="danger" 
                variant="flat"
                startContent={<span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />}
                className="font-bold"
              >
                LIVE
              </Chip>
              <div className="flex items-center gap-2 text-white">
                <Icon icon="solar:eye-bold" className="text-cyan-400" />
                <span className="font-bold">{viewerCount.toLocaleString()}</span>
                <span className="text-sm text-white/60">watching</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="mb-6">
          <Tabs 
            selectedKey={activeTab}
            onSelectionChange={(key) => setActiveTab(key as 'video' | 'audio')}
            size="lg"
            classNames={{
              tabList: "bg-white/5 backdrop-blur-md border border-white/10",
              cursor: "bg-gradient-to-r from-cyan-400 to-blue-600",
              tab: "data-[selected=true]:text-white text-white/60",
            }}
          >
            <Tab
              key="video"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="solar:videocamera-record-bold" className="text-xl" />
                  <span>Video Broadcast</span>
                </div>
              }
            />
            <Tab
              key="audio"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="solar:radio-minimalistic-bold" className="text-xl" />
                  <span>Audio Broadcast</span>
                </div>
              }
            />
          </Tabs>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Player */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="bg-black border border-white/10">
              <CardBody className="p-0">
                {activeTab === 'video' ? <VideoPlayer /> : <AudioPlayer />}
              </CardBody>
            </Card>

            {/* Stream Info */}
            <Card className="bg-white/5 backdrop-blur-md border border-white/10">
              <CardBody className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {activeTab === 'video' 
                        ? 'English Grammar Masterclass - Present Perfect Tense'
                        : '🎙️ Daily English Conversation - Episode 47'}
                    </h2>
                    <p className="text-white/70 mb-4">
                      {activeTab === 'video'
                        ? 'Learn how to use present perfect tense correctly with practical examples and exercises. Perfect for intermediate to advanced learners!'
                        : 'Today\'s topic: "Business English - How to conduct professional meetings in English". Join us for practical phrases and real-world examples!'}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-white/60">
                      <div className="flex items-center gap-2">
                        <Icon icon="solar:clock-circle-bold" />
                        <span>{activeTab === 'video' ? 'Started 45 minutes ago' : 'Live for 32 minutes'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon icon="solar:user-bold" />
                        <span>Teacher: {activeTab === 'video' ? 'Ms. Anderson' : 'James Parker'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Share Buttons */}
                <div className="flex items-center gap-2 pt-4 border-t border-white/10">
                  <span className="text-sm text-white/60 mr-2">Share:</span>
                  <Button
                    size="sm"
                    variant="flat"
                    className="bg-blue-600 text-white"
                    startContent={<Icon icon="logos:facebook" />}
                    onPress={() => shareToSocial('facebook')}
                  >
                    Facebook
                  </Button>
                  <Button
                    size="sm"
                    variant="flat"
                    className="bg-sky-500 text-white"
                    startContent={<Icon icon="logos:twitter" />}
                    onPress={() => shareToSocial('twitter')}
                  >
                    Twitter
                  </Button>
                  <Button
                    size="sm"
                    variant="flat"
                    className="bg-green-600 text-white"
                    startContent={<Icon icon="logos:whatsapp-icon" />}
                    onPress={() => shareToSocial('whatsapp')}
                  >
                    WhatsApp
                  </Button>
                  <Button
                    size="sm"
                    variant="flat"
                    className="bg-cyan-500 text-white"
                    startContent={<Icon icon="logos:telegram" />}
                    onPress={() => shareToSocial('telegram')}
                  >
                    Telegram
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Live Chat */}
          <div className="lg:col-span-1">
            <Card className="bg-white/5 backdrop-blur-md border border-white/10 h-[calc(100vh-180px)] flex flex-col">
              <CardBody className="p-0 flex flex-col h-full">
                <div className="p-4 border-b border-white/10">
                  <h3 className="font-bold text-white flex items-center gap-2">
                    <Icon icon="solar:chat-round-dots-bold" className="text-cyan-400" />
                    Live Chat
                  </h3>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  <AnimatePresence>
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex gap-3"
                      >
                        <Avatar src={msg.avatar} size="sm" className="shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-2 mb-1">
                            <span className="font-semibold text-white text-sm">{msg.user}</span>
                            <span className="text-xs text-white/40">
                              {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <p className="text-white/80 text-sm break-words">{msg.message}</p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  <div ref={chatEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-white/10">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onValueChange={setNewMessage}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      classNames={{
                        input: "text-white",
                        inputWrapper: "bg-white/10 border-white/20"
                      }}
                    />
                    <Button
                      isIconOnly
                      color="primary"
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
    { title: "Time Expressions", subtitle: "already, yet, just, ever, never" }
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(slideInterval);
  }, [slides.length]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{x: number, y: number, vx: number, vy: number}> = [];
    
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5
      });
    }

    const animate = () => {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#1e293b');
      gradient.addColorStop(0.5, '#334155');
      gradient.addColorStop(1, '#475569');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(6, 182, 212, 0.3)';
        ctx.fill();
      });

      // Teacher video box
      const teacherW = canvas.width * 0.25;
      const teacherH = canvas.height * 0.35;
      const teacherX = 20;
      const teacherY = 20;

      ctx.fillStyle = '#0f172a';
      ctx.fillRect(teacherX, teacherY, teacherW, teacherH);
      
      ctx.font = 'bold 48px Arial';
      ctx.fillStyle = '#06b6d4';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('👩‍🏫', teacherX + teacherW/2, teacherY + teacherH/2 - 20);
      
      ctx.font = 'bold 16px Arial';
      ctx.fillStyle = '#ffffff';
      ctx.fillText('Ms. Anderson', teacherX + teacherW/2, teacherY + teacherH - 30);

      // Presentation slide
      const slideX = 20;
      const slideY = teacherY + teacherH + 40;
      const slideW = canvas.width - 40;
      const slideH = canvas.height - slideY - 20;

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(slideX, slideY, slideW, slideH);

      const slide = slides[currentSlide];
      
      ctx.font = 'bold 48px Arial';
      ctx.fillStyle = '#0f172a';
      ctx.fillText(slide.title, slideX + slideW/2, slideY + 80);

      ctx.font = '32px Arial';
      ctx.fillStyle = '#64748b';
      ctx.fillText(slide.subtitle, slideX + slideW/2, slideY + 140);

      ctx.fillStyle = '#f1f5f9';
      ctx.fillRect(slideX + 50, slideY + 200, slideW - 100, 120);
      
      ctx.font = 'bold 24px Arial';
      ctx.fillStyle = '#0f172a';
      ctx.textAlign = 'left';
      ctx.fillText('Example:', slideX + 70, slideY + 240);
      
      ctx.font = '20px Arial';
      ctx.fillStyle = '#475569';
      ctx.fillText('I have studied English for 5 years.', slideX + 70, slideY + 280);

      animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => { if (animationId) cancelAnimationFrame(animationId); };
  }, [currentSlide, slides]);

  return (
    <div className="relative aspect-video bg-slate-900">
      <canvas ref={canvasRef} width={1280} height={720} className="w-full h-full" />
      
      <div className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white rounded-full text-sm font-bold flex items-center gap-2">
        <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
        LIVE
      </div>

      <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-lg text-white text-xs font-medium">
        HD 1080p
      </div>

      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/20">
        <Button isIconOnly size="lg" className="w-16 h-16 bg-white/20 backdrop-blur-md" onPress={() => setIsPlaying(!isPlaying)}>
          <Icon icon={isPlaying ? "solar:pause-bold" : "solar:play-bold"} className="text-3xl text-white" />
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

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;
    const bars = 60;

    const animate = () => {
      time += 0.1;
      
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#581c87');
      gradient.addColorStop(0.5, '#831843');
      gradient.addColorStop(1, '#0f172a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = canvas.width / bars;
      let maxHeight = 0;

      for (let i = 0; i < bars; i++) {
        const frequency = Math.sin(time + i * 0.5) * 0.5 + 0.5;
        const noise = Math.random() * 0.3;
        const height = (frequency + noise) * canvas.height * 0.7;
        maxHeight = Math.max(maxHeight, height);

        const x = i * barWidth;
        const y = canvas.height - height;

        const barGradient = ctx.createLinearGradient(x, y, x, canvas.height);
        barGradient.addColorStop(0, '#ec4899');
        barGradient.addColorStop(0.5, '#a855f7');
        barGradient.addColorStop(1, '#06b6d4');

        ctx.fillStyle = barGradient;
        ctx.fillRect(x, y, barWidth - 2, height);
      }

      setAudioLevel(Math.round((maxHeight / (canvas.height * 0.7)) * 100));

      ctx.font = 'bold 64px Arial';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🎙️', canvas.width / 2, canvas.height / 2 - 40);

      ctx.font = 'bold 32px Arial';
      ctx.fillText('Fortuna Radio', canvas.width / 2, canvas.height / 2 + 30);

      animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => { if (animationId) cancelAnimationFrame(animationId); };
  }, []);

  return (
    <div className="relative">
      <canvas ref={canvasRef} width={1280} height={600} className="w-full" />
      
      <div className="absolute top-6 right-6 px-4 py-2 bg-red-500 text-white rounded-full text-sm font-bold flex items-center gap-2">
        <span className="w-3 h-3 bg-white rounded-full animate-pulse" />
        ON AIR
      </div>

      <div className="absolute top-6 left-6 bg-black/50 backdrop-blur-md rounded-xl p-4 min-w-[200px]">
        <div className="flex items-center gap-3 mb-2">
          <Icon icon="solar:soundwave-bold" className="text-2xl text-pink-400" />
          <div className="flex-1">
            <p className="text-xs text-white/60">Audio Level</p>
            <p className="text-lg font-bold text-white">{audioLevel}%</p>
          </div>
        </div>
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
            animate={{ width: `${audioLevel}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/50 backdrop-blur-md rounded-full px-6 py-3">
        <Button isIconOnly size="lg" className="bg-gradient-to-r from-pink-500 to-purple-600" onPress={() => setIsPlaying(!isPlaying)}>
          <Icon icon={isPlaying ? "solar:pause-bold" : "solar:play-bold"} className="text-2xl text-white" />
        </Button>
        <div className="text-white">
          <p className="text-xs text-white/60">Duration</p>
          <p className="font-bold">32:15 / Live</p>
        </div>
      </div>
    </div>
  );
}
