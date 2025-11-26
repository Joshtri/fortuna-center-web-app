"use client";

import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

export default function ProgramsSection() {
  return (
    <section id="programs" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Programs
            </h2>
            <p className="text-gray-600 text-lg">
              Specialized training designed to equip you with modern skills for
              the digital age.
            </p>
          </div>
          <button className="px-6 py-3 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors">
            View All Programs
          </button>
        </div>

        <div className="space-y-24">
          {/* Broadcast Program */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 text-sm font-medium mb-6">
                <Icon
                  icon="solar:record-circle-bold"
                  className="animate-pulse"
                />
                Live On Air
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Broadcast Live Audio & Video
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Master the art of broadcasting with our comprehensive training
                program. Learn to operate professional equipment, manage live
                streams, and produce high-quality audio and video content.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  "Professional Camera Operation",
                  "Audio Mixing & Sound Engineering",
                  "Live Streaming Management",
                  "Content Production Workflow",
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-gray-700"
                  >
                    <Icon
                      icon="solar:check-circle-bold"
                      className="text-blue-600 text-xl"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex gap-4 mt-8">
                <a
                  href="/demo"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                >
                  <Icon icon="solar:play-circle-bold" className="text-xl" />
                  See Live Demo
                </a>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2 relative"
            >
              <div className="aspect-video rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
                {/* Placeholder for broadcast studio */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1598550476439-c9212f57757c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
              </div>
            </motion.div>
          </div>

          {/* English Program */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
                {/* Placeholder for classroom */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-6">
                <Icon icon="solar:global-bold" />
                Global Communication
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                English Proficiency
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Elevate your communication skills with our structured English
                courses. From public speaking to business English, we prepare
                you for global opportunities.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  "Public Speaking & Debate",
                  "Business English Communication",
                  "TOEFL & IELTS Preparation",
                  "Interactive Learning Environment",
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-gray-700"
                  >
                    <Icon
                      icon="solar:check-circle-bold"
                      className="text-blue-600 text-xl"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
