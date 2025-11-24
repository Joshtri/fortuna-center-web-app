'use client';

import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-default-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <Icon icon="fa6-solid:broadcast-tower" className="text-lg text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg text-default-900">Fortuna Center</h1>
                <p className="text-xs text-default-500">Broadcast Platform</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/admin"
                className="px-4 py-2 rounded-xl text-default-500 hover:text-default-900 hover:bg-default-100 transition-all text-sm font-medium"
              >
                Admin
              </Link>
              <Link
                href="#start"
                className="px-6 py-2 rounded-xl bg-primary text-black font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Icon icon="solar:star-bold" className="text-lg" />
              <span>The Future of Broadcasting</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-default-900 via-default-800 to-default-600">
              Broadcast Your
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                Vision to the World
              </span>
            </h1>

            <p className="text-xl text-default-500 mb-10 max-w-2xl mx-auto leading-relaxed">
              Create stunning broadcast experiences with our minimalist platform.
              Stream YouTube content with real-time viewer engagement and analytics.
            </p>

            <div className="flex items-center justify-center gap-4">
              <Link
                href="/demo"
                className="group px-8 py-4 rounded-xl bg-primary text-black font-bold hover:bg-primary/90 transition-all shadow-2xl shadow-primary/30 flex items-center gap-2"
              >
                View Live Demo
                <Icon
                  icon="solar:arrow-right-bold"
                  className="text-xl group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <Link
                href="/admin"
                className="px-8 py-4 rounded-xl bg-default-100 text-default-900 font-bold hover:bg-default-200 transition-all flex items-center gap-2"
              >
                <Icon icon="solar:login-3-bold" className="text-xl" />
                Admin Dashboard
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-default-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-default-500 text-lg">
              Everything you need to create amazing broadcasts
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              icon: 'solar:video-library-bold-duotone',
              title: 'YouTube Integration',
              description: 'Seamlessly integrate with YouTube for instant broadcasting',
              color: 'from-red-500 to-pink-500',
              bgColor: 'bg-red-500/10',
            },
            {
              icon: 'solar:chart-2-bold-duotone',
              title: 'Real-time Analytics',
              description: 'Track viewer engagement and performance metrics live',
              color: 'from-blue-500 to-cyan-500',
              bgColor: 'bg-blue-500/10',
            },
            {
              icon: 'solar:users-group-rounded-bold-duotone',
              title: 'Viewer Management',
              description: 'Manage and engage with your audience effectively',
              color: 'from-purple-500 to-pink-500',
              bgColor: 'bg-purple-500/10',
            },
            {
              icon: 'solar:widget-5-bold-duotone',
              title: 'Customizable Interface',
              description: 'Tailor the broadcast experience to your brand',
              color: 'from-amber-500 to-orange-500',
              bgColor: 'bg-amber-500/10',
            },
            {
              icon: 'solar:shield-check-bold-duotone',
              title: 'Secure & Reliable',
              description: 'Enterprise-grade security for your broadcasts',
              color: 'from-green-500 to-emerald-500',
              bgColor: 'bg-green-500/10',
            },
            {
              icon: 'solar:rocket-2-bold-duotone',
              title: 'Lightning Fast',
              description: 'Optimized performance for smooth streaming',
              color: 'from-indigo-500 to-purple-500',
              bgColor: 'bg-indigo-500/10',
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="glass-panel rounded-2xl p-8 border border-default-200 hover:border-default-300 transition-all group hover:scale-105"
            >
              <div className={`w-14 h-14 rounded-xl ${feature.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <Icon icon={feature.icon} className={`text-3xl bg-clip-text text-transparent bg-gradient-to-r ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold text-default-900 mb-3">{feature.title}</h3>
              <p className="text-default-500 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section id="start" className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto glass-panel rounded-3xl p-12 border border-default-200 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-blue-500/5" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-default-900 mb-6">
              Ready to Start Broadcasting?
            </h2>
            <p className="text-xl text-default-500 mb-10 max-w-2xl mx-auto">
              Join thousands of creators who trust Fortuna Center for their broadcasting needs
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/admin"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-black font-bold hover:bg-primary/90 transition-all shadow-2xl shadow-primary/30 flex items-center justify-center gap-2"
              >
                <Icon icon="solar:play-circle-bold" className="text-xl" />
                Launch Your Broadcast
              </Link>
              <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-default-50 hover:bg-default-100 text-default-900 font-medium border border-default-200 hover:border-default-300 transition-all">
                Learn More
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 border-t border-default-200">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <Icon icon="fa6-solid:broadcast-tower" className="text-sm text-white" />
            </div>
            <span className="text-default-500 text-sm">© 2024 Fortuna Center. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            {['Privacy', 'Terms', 'Contact'].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-default-400 hover:text-default-900 text-sm transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
