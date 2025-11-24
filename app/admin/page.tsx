'use client';

import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatCard from '@/features/admin/components/StatCard';

// Mock data
const viewerData = [
  { time: '00:00', viewers: 120 },
  { time: '04:00', viewers: 89 },
  { time: '08:00', viewers: 234 },
  { time: '12:00', viewers: 456 },
  { time: '16:00', viewers: 678 },
  { time: '20:00', viewers: 543 },
  { time: '23:59', viewers: 321 },
];

const stats = [
  {
    title: 'Active Sessions',
    value: '12',
    change: '+23%',
    icon: 'solar:play-circle-bold-duotone',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    textColor: 'text-blue-400',
  },
  {
    title: 'Total Viewers',
    value: '8,456',
    change: '+18%',
    icon: 'solar:users-group-rounded-bold-duotone',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/10',
    textColor: 'text-purple-400',
  },
  {
    title: 'Peak Viewers',
    value: '2,341',
    change: '+45%',
    icon: 'solar:chart-2-bold-duotone',
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-500/10',
    textColor: 'text-amber-400',
  },
  {
    title: 'Avg. Duration',
    value: '24m',
    change: '+12%',
    icon: 'solar:clock-circle-bold-duotone',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-500/10',
    textColor: 'text-green-400',
  },
];

const recentSessions = [
  {
    id: 'sess_001',
    title: 'Live Gaming Session',
    viewers: 1234,
    status: 'live',
    startedAt: '2 hours ago',
  },
  {
    id: 'sess_002',
    title: 'Product Launch Event',
    viewers: 856,
    status: 'live',
    startedAt: '45 minutes ago',
  },
  {
    id: 'sess_003',
    title: 'Music Concert',
    viewers: 2341,
    status: 'ended',
    startedAt: '5 hours ago',
  },
  {
    id: 'sess_004',
    title: 'Tech Talk',
    viewers: 432,
    status: 'ended',
    startedAt: '1 day ago',
  },
];

export default function AdminDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-default-900">Dashboard</h1>
          <p className="text-default-500 mt-1">
            Welcome back! Here's what's happening with your broadcasts.
          </p>
        </div>
        <div className="glass-panel px-4 py-3 rounded-xl border border-default-200">
          <div className="flex items-center gap-2 text-default-500">
            <Icon icon="solar:clock-circle-bold" className="text-xl" />
            <span className="font-mono text-sm">
              {currentTime.toLocaleTimeString('en-US', { hour12: false })}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
            bgColor={stat.bgColor}
            textColor={stat.textColor}
            delay={index * 0.1}
          />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Viewer Trends */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-panel rounded-2xl p-6 border border-default-200"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-default-900">Viewer Trends</h2>
              <p className="text-default-500 text-sm mt-1">Last 24 hours</p>
            </div>
            <Icon icon="solar:chart-bold-duotone" className="text-2xl text-primary" />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={viewerData}>
              <defs>
                <linearGradient id="colorViewers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#fbbf24" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="time" stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  color: '#171717',
                }}
              />
              <Area
                type="monotone"
                dataKey="viewers"
                stroke="#fbbf24"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorViewers)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-panel rounded-2xl p-6 border border-default-200"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-default-900">Quick Actions</h2>
              <p className="text-default-500 text-sm mt-1">Common tasks</p>
            </div>
            <Icon icon="solar:widget-5-bold-duotone" className="text-2xl text-primary" />
          </div>
          <div className="space-y-3">
            {[
              {
                title: 'Create New Session',
                icon: 'solar:add-circle-bold',
                color: 'text-blue-400',
                bgColor: 'bg-blue-500/10',
              },
              {
                title: 'View Analytics',
                icon: 'solar:chart-2-bold',
                color: 'text-purple-400',
                bgColor: 'bg-purple-500/10',
              },
              {
                title: 'Manage Settings',
                icon: 'solar:settings-bold',
                color: 'text-green-400',
                bgColor: 'bg-green-500/10',
              },
              {
                title: 'Export Reports',
                icon: 'solar:download-bold',
                color: 'text-amber-400',
                bgColor: 'bg-amber-500/10',
              },
            ].map((action, idx) => (
              <button
                key={idx}
                className="w-full flex items-center gap-4 p-4 rounded-xl bg-default-50 hover:bg-default-100 border border-default-200 hover:border-default-300 transition-all group"
              >
                <div className={`p-3 rounded-xl ${action.bgColor}`}>
                  <Icon icon={action.icon} className={`text-xl ${action.color}`} />
                </div>
                <span className="text-default-700 font-medium flex-1 text-left">{action.title}</span>
                <Icon
                  icon="solar:alt-arrow-right-bold"
                  className="text-default-400 group-hover:text-default-900 group-hover:translate-x-1 transition-all"
                />
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Sessions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-panel rounded-2xl p-6 border border-default-200"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-default-900">Recent Sessions</h2>
            <p className="text-default-500 text-sm mt-1">Your latest broadcasts</p>
          </div>
          <button className="text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-1 transition-colors">
            View All
            <Icon icon="solar:alt-arrow-right-bold" />
          </button>
        </div>

        <div className="space-y-3">
          {recentSessions.map((session, idx) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + idx * 0.1 }}
              className="flex items-center gap-4 p-4 rounded-xl bg-default-50 hover:bg-default-100 border border-default-200 hover:border-default-300 transition-all group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <Icon
                  icon={session.status === 'live' ? 'solar:play-circle-bold' : 'solar:stop-circle-bold'}
                  className={`text-2xl ${session.status === 'live' ? 'text-red-400' : 'text-default-400'}`}
                />
              </div>
              <div className="flex-1">
                <h3 className="text-default-900 font-medium">{session.title}</h3>
                <p className="text-default-500 text-sm">{session.startedAt}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-default-500">
                  <Icon icon="solar:eye-bold" />
                  <span className="font-medium">{session.viewers.toLocaleString()}</span>
                </div>
                {session.status === 'live' && (
                  <span className="px-3 py-1 rounded-lg bg-red-500/10 text-red-400 text-xs font-medium flex items-center gap-1">
                    <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                    LIVE
                  </span>
                )}
              </div>
              <Icon
                icon="solar:alt-arrow-right-bold"
                className="text-default-400 group-hover:text-default-900 group-hover:translate-x-1 transition-all"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
