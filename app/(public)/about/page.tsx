"use client";

import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-gray-50 overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/5" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
              <Icon icon="solar:verified-check-bold" />
              <span>Since 2019</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Empowering Minds, <br />
              <span className="text-blue-600">Shaping Futures</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Fortuna English & Human Resources Development (HRD) Training
              Centre is dedicated to unlocking potential through language
              mastery and professional growth in Kupang.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                {/* Placeholder for vision image */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-8 left-8 text-white">
                  <p className="font-bold text-2xl mb-2">Our Vision</p>
                  <p className="text-white/90">
                    To be the leading center for professional development in
                    East Nusa Tenggara.
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Our Mission
                </h2>
                <p className="text-gray-600 text-lg mb-8">
                  We believe that education is the key to unlocking human
                  potential. Our mission is built on three core pillars:
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: "solar:global-bold",
                    title: "Global Communication",
                    desc: "Providing high-quality English education to bridge cultural and professional gaps.",
                  },
                  {
                    icon: "solar:users-group-rounded-bold",
                    title: "Human Resource Development",
                    desc: "Equipping individuals with soft skills and professional competencies for the modern workplace.",
                  },
                  {
                    icon: "solar:microphone-3-bold",
                    title: "Confidence Building",
                    desc: "Fostering self-assurance through public speaking, broadcasting, and competitions.",
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    className="flex gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                      <Icon icon={item.icon} className="text-2xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History / Milestones */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From our humble beginnings to becoming a trusted training center
              in Kupang.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative border-l-2 border-blue-200 ml-6 md:ml-0 space-y-12">
              {[
                {
                  year: "2019",
                  title: "English Speech Competition",
                  desc: "Successfully organized a city-wide English Speech Competition, discovering young talents across Kupang.",
                },
                {
                  year: "2020",
                  title: "Partnership with HAND International",
                  desc: "Established a strategic partnership to bring international standard training methodologies.",
                },
                {
                  year: "2023",
                  title: "Broadcast Center Launch",
                  desc: "Expanded our facilities to include a state-of-the-art broadcast studio for digital media training.",
                },
                {
                  year: "Present",
                  title: "Growing Community",
                  desc: "Continuing to serve hundreds of students and professionals annually.",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="relative pl-12 md:pl-0"
                >
                  <div className="md:flex items-center justify-between group">
                    <div className="hidden md:block w-1/2 pr-12 text-right">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 mt-2">{item.desc}</p>
                    </div>

                    <div className="absolute left-[-9px] md:left-1/2 md:-translate-x-1/2 w-5 h-5 rounded-full bg-white border-4 border-blue-600 z-10" />

                    <div className="md:w-1/2 md:pl-12">
                      <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-bold mb-2 md:mb-0">
                        {item.year}
                      </span>
                      <div className="md:hidden mt-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 mt-2">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partners

      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-12">
            Trusted Partners
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            
            <div className="flex items-center gap-2 text-2xl font-bold text-gray-400">
              <Icon icon="solar:hand-shake-bold" className="text-4xl" />
              <span>HAND International</span>
            </div>
            <div className="flex items-center gap-2 text-2xl font-bold text-gray-400">
              <Icon icon="solar:diploma-verified-bold" className="text-4xl" />
              <span>Education Dept.</span>
            </div>
            <div className="flex items-center gap-2 text-2xl font-bold text-gray-400">
              <Icon icon="solar:global-bold" className="text-4xl" />
              <span>Global Connect</span>
            </div>
          </div>
        </div>
      </section>
       */}
    </div>
  );
}
