"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardBody, Button, Input, Avatar, Chip } from "@heroui/react";
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

export default function AudioDemoPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      user: 'Lisa Wong',
      message: 'Love this podcast! 🎧',
      avatar: 'https://i.pravatar.cc/150?img=5',
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: '2',
      user: 'David Kim',
      message: 'Great pronunciation tips!',
      avatar: 'https://i.pravatar.cc/150?img=7',
      timestamp: new Date(Date.now() - 240000)
    },
    {
      id: '3',
      user: 'Anna Martinez',
      message: 'Can you recommend some books? 📚',
      avatar: 'https://i.pravatar.cc/150?img=9',
      timestamp: new Date(Date.now() - 180000)
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [listenerCount, setListenerCount] = useState(156);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setListenerCount(prev => prev + Math.floor(Math.random() * 8) - 3);
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
    const text = '🎙️ Listening to Fortuna Center English Podcast Live!';
    
    const urls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
    };
    
    window.open(urls[platform], '_blank', 'width=600,height=400');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-pink-900 to-slate-900">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center">
                <Icon icon="solar:radio-minimalistic-bold" className="text-2xl text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Fortuna Radio</h1>
                <p className="text-xs text-white/60">English Learning Podcast</p>
              </div>
            </Link>
            
            <div className="flex items-center gap-3">
              <Chip 
                color="danger" 
                variant="flat"
                startContent={<span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />}
                className="font-bold"
              >
                ON AIR
              </Chip>
              <div className="flex items-center gap-2 text-white">
                <Icon icon="solar:headphones-bold" className="text-pink-400" />
                <span className="font-bold">{listenerCount.toLocaleString()}</span>
                <span className="text-sm text-white/60">listeners</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Audio Player */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-md border border-white/10">
              <CardBody className="p-0">
                <AudioPlayer />
              </CardBody>
            </Card>

            {/* Stream Info */}
            <Card className="bg-white/5 backdrop-blur-md border border-white/10">
              <CardBody className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      🎙️ Daily English Conversation - Episode 47
                    </h2>
                    <p className="text-white/70 mb-4">
                      Today's topic: "Business English - How to conduct professional meetings in English".
                      Join us for practical phrases and real-world examples!
                    </p>
                    <div className="flex items-center gap-4 text-sm text-white/60">
                      <div className="flex items-center gap-2">
                        <Icon icon="solar:clock-circle-bold" />
                        <span>Live for 32 minutes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon icon="solar:microphone-3-bold" />
                        <span>Host: James Parker</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon icon="solar:soundwave-bold" />
                        <span>128 kbps</span>
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

            {/* Now Playing */}
            <Card className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-md border border-white/10">
              <CardBody className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center shrink-0">
                    <Icon icon="solar:music-note-2-bold" className="text-3xl text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-white/60 mb-1">NOW DISCUSSING</p>
                    <h4 className="font-bold text-white text-lg">Meeting Etiquette & Professional Phrases</h4>
                    <p className="text-sm text-white/70">Learn key expressions for business meetings</p>
                  </div>
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
                    <Icon icon="solar:chat-round-dots-bold" className="text-pink-400" />
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
                      className="bg-gradient-to-r from-pink-500 to-purple-600"
                      onPress={handleSendMessage}
                    >
                      <Icon icon="solar:plain-2-bold" className="text-xl text-white" />
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
      
      // Clear canvas
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#581c87'); // purple-900
      gradient.addColorStop(0.5, '#831843'); // pink-900
      gradient.addColorStop(1, '#0f172a'); // slate-900
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw large central equalizer
      const barWidth = canvas.width / bars;
      let maxHeight = 0;

      for (let i = 0; i < bars; i++) {
        const frequency = Math.sin(time + i * 0.5) * 0.5 + 0.5;
        const noise = Math.random() * 0.3;
        const height = (frequency + noise) * canvas.height * 0.7;
        maxHeight = Math.max(maxHeight, height);

        const x = i * barWidth;
        const y = canvas.height - height;

        // Gradient for each bar
        const barGradient = ctx.createLinearGradient(x, y, x, canvas.height);
        barGradient.addColorStop(0, '#ec4899'); // pink-500
        barGradient.addColorStop(0.5, '#a855f7'); // purple-500
        barGradient.addColorStop(1, '#06b6d4'); // cyan-500

        ctx.fillStyle = barGradient;
        ctx.fillRect(x, y, barWidth - 2, height);

        // Glow effect
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#ec4899';
      }

      setAudioLevel(Math.round((maxHeight / (canvas.height * 0.7)) * 100));

      // Draw center icon and text
      ctx.shadowBlur = 0;
      ctx.font = 'bold 64px Arial';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🎙️', canvas.width / 2, canvas.height / 2 - 40);

      ctx.font = 'bold 32px Arial';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.fillText('Fortuna Radio', canvas.width / 2, canvas.height / 2 + 30);

      ctx.font = '20px Arial';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.fillText('Live English Podcast', canvas.width / 2, canvas.height / 2 + 65);

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="relative">
      <canvas 
        ref={canvasRef} 
        width={1280} 
        height={600}
        className="w-full"
      />
      
      {/* ON AIR Indicator */}
      <div className="absolute top-6 right-6 px-4 py-2 bg-red-500 text-white rounded-full text-sm font-bold flex items-center gap-2 shadow-lg shadow-red-500/50">
        <span className="w-3 h-3 bg-white rounded-full animate-pulse" />
        ON AIR
      </div>

      {/* Audio Level Indicator */}
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

      {/* Play Controls */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/50 backdrop-blur-md rounded-full px-6 py-3">
        <Button
          isIconOnly
          size="lg"
          className="bg-gradient-to-r from-pink-500 to-purple-600"
          onPress={() => setIsPlaying(!isPlaying)}
        >
          <Icon 
            icon={isPlaying ? "solar:pause-bold" : "solar:play-bold"} 
            className="text-2xl text-white" 
          />
        </Button>
        <div className="text-white">
          <p className="text-xs text-white/60">Duration</p>
          <p className="font-bold">32:15 / Live</p>
        </div>
        <Button
          isIconOnly
          variant="flat"
          className="bg-white/10 text-white"
        >
          <Icon icon="solar:volume-loud-bold" className="text-xl" />
        </Button>
      </div>
    </div>
  );
}
