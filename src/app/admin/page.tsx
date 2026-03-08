"use client";

import { useState } from "react";
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  Users, 
  History, 
  PawPrint,
  ArrowLeft,
  Search,
  Check,
  X,
  Plus
} from "lucide-react";
import Link from "next/link";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex min-h-screen bg-cream">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-cream-dark p-6 hidden md:block">
        <div className="flex items-center gap-2 mb-10">
          <div className="bg-cocoa p-2 rounded-2xl">
            <Settings className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-lg text-cocoa-dark">TablePig Admin</span>
        </div>
        
        <nav className="space-y-2">
          <SidebarLink icon={<LayoutDashboard />} label="Dashboard" active={activeTab === "dashboard"} onClick={() => setActiveTab("dashboard")} />
          <SidebarLink icon={<FileText />} label="Home Content" active={activeTab === "home"} onClick={() => setActiveTab("home")} />
          <SidebarLink icon={<Check />} label="Board Data" active={activeTab === "board"} onClick={() => setActiveTab("board")} />
          <SidebarLink icon={<PawPrint />} label="Mocha Status" active={activeTab === "mocha"} onClick={() => setActiveTab("mocha")} />
          <SidebarLink icon={<History />} label="AI Logs" active={activeTab === "ai"} onClick={() => setActiveTab("ai")} />
          <SidebarLink icon={<Users />} label="Users & Access" active={activeTab === "users"} onClick={() => setActiveTab("users")} />
        </nav>

        <div className="mt-auto pt-10">
          <Link href="/" className="flex items-center gap-2 text-cocoa-light hover:text-cocoa transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back to Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-cocoa-dark capitalize">{activeTab}</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-cocoa-light" />
              <input type="text" placeholder="Search data..." className="bg-white border border-cream-dark pl-9 pr-4 py-2 rounded-2xl text-sm outline-none focus:ring-2 ring-sage/20 w-64" />
            </div>
            <div className="w-10 h-10 rounded-2xl bg-sage-light flex items-center justify-center font-bold text-white">R</div>
          </div>
        </header>

        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatCard label="Tasks Added Today" value="5" color="text-sage" />
              <StatCard label="AI Suggestions" value="3" color="text-soft-pink" />
              <StatCard label="Reminders Due" value="1" color="text-cocoa" />
              <StatCard label="Mocha Activity" value="Active" color="text-sage" />
            </div>

            {/* Recent Activity */}
            <section className="bg-white p-8 rounded-4xl border border-cream-dark shadow-sm">
              <h2 className="text-xl font-bold text-cocoa-dark mb-6">Recent AI Interactions</h2>
              <div className="space-y-4">
                <ActivityItem 
                  original="Reminder buy dog food Friday"
                  parsed="Task: Buy dog food • Date: 2026-03-13"
                  status="confirmed"
                />
                <ActivityItem 
                  original="Set bath time for Mocha next Tue 10am"
                  parsed="Reminder: Mocha Bath • Date: 2026-03-10 10:00"
                  status="pending"
                />
              </div>
            </section>
          </div>
        )}

        {activeTab === "home" && (
          <section className="bg-white p-8 rounded-4xl border border-cream-dark shadow-sm max-w-2xl">
            <h2 className="text-xl font-bold text-cocoa-dark mb-6">Edit Hero Section</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-cocoa-light mb-2">Main Title</label>
                <input type="text" defaultValue="A tiny home for ideas, reminders, and Mocha moments." className="w-full bg-cream p-4 rounded-2xl border border-cream-dark outline-none focus:ring-2 ring-sage/20" />
              </div>
              <div>
                <label className="block text-sm font-medium text-cocoa-light mb-2">Subheadline</label>
                <textarea rows={3} className="w-full bg-cream p-4 rounded-2xl border border-cream-dark outline-none focus:ring-2 ring-sage/20">TablePig is a small digital space where we keep our thoughts, plans, and everything that matters to our family.</textarea>
              </div>
              <button className="bg-sage text-white px-6 py-3 rounded-2xl font-bold hover:scale-105 transition-transform">Save Changes</button>
            </div>
          </section>
        )}

        {(activeTab === "board" || activeTab === "mocha" || activeTab === "ai" || activeTab === "users") && (
          <div className="flex flex-col items-center justify-center py-32 bg-white/50 rounded-4xl border border-dashed border-cream-dark">
            <PawPrint className="w-16 h-16 text-cream-dark mb-4 animate-bounce" />
            <p className="text-cocoa-light font-medium italic">"Woof! This section is coming soon... Mocha is helping me build it!"</p>
          </div>
        )}
      </main>
    </div>
  );
}

function SidebarLink({ icon, label, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${active ? 'bg-cream text-cocoa-dark font-bold shadow-sm' : 'text-cocoa-light hover:bg-cream/50'}`}
    >
      <span className={active ? 'text-sage' : ''}>{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function StatCard({ label, value, color }: any) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-cream-dark shadow-sm">
      <p className="text-xs font-bold text-cocoa-light uppercase tracking-wider mb-2">{label}</p>
      <p className={`text-3xl font-black ${color}`}>{value}</p>
    </div>
  );
}

function ActivityItem({ original, parsed, status }: any) {
  return (
    <div className="flex items-center justify-between p-4 bg-cream/30 rounded-2xl border border-cream-dark/50">
      <div>
        <p className="text-xs text-cocoa-light italic mb-1">User said: "{original}"</p>
        <p className="font-bold text-cocoa-dark">{parsed}</p>
      </div>
      <div className="flex gap-2">
        {status === "pending" ? (
          <>
            <button className="p-2 bg-sage/20 text-sage rounded-xl hover:bg-sage hover:text-white transition-colors"><Check className="w-4 h-4" /></button>
            <button className="p-2 bg-soft-pink/20 text-soft-pink rounded-xl hover:bg-soft-pink hover:text-white transition-colors"><X className="w-4 h-4" /></button>
          </>
        ) : (
          <span className="text-xs font-bold text-sage bg-sage/10 px-3 py-1 rounded-full uppercase tracking-tighter">Verified</span>
        )}
      </div>
    </div>
  );
}
