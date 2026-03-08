"use client";

import { useState, useEffect, useRef } from "react";
import { motion, Reorder, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  StickyNote, 
  CheckCircle2, 
  ShoppingCart, 
  Bell, 
  PawPrint,
  Clock,
  ArrowLeft,
  PenLine,
  Calendar,
  Waves,
  Scissors,
  Utensils,
  Scale,
  GripVertical,
  Heart,
  X
} from "lucide-react";
import Link from "next/link";

export default function BoardPage() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(new Date());
  const nailInputRef = useRef<HTMLInputElement>(null);
  const bathInputRef = useRef<HTMLInputElement>(null);
  
  const birthday = new Date("2024-08-22");
  const [daysWithUs, setDaysWithUs] = useState(0);

  // 状态管理
  const [todayTasks, setTodayTasks] = useState([
    { id: "t1", text: "重构 TablePig 的 UI 界面", completed: false },
    { id: "t2", text: "买晚餐的食材", completed: true },
  ]);
  const [newTodayTask, setNewTodayTask] = useState("");

  const [weeklyTasks, setWeeklyTasks] = useState([
    { id: "w1", text: "宠物店修毛 (长毛护理)", day: "周三", completed: false },
    { id: "w2", text: "给小家网站加个 AI", day: "周五", completed: false },
  ]);
  const [newWeeklyTask, setNewWeeklyTask] = useState("");

  const [notes, setNotes] = useState([
    { id: 1, text: "周末想去公园野餐，带上腊肠专用垫！" },
    { id: 2, text: "新设计的配色可以用这种鼠尾草绿。" }
  ]);
  const [newNote, setNewNote] = useState("");

  const [mochaData, setMochaData] = useState({
    lastNails: "2026-03-01",
    lastBath: "2026-03-05",
    weight: 5.2,
    breakfast: { type: "鲜食", grams: 120 },
    dinner: { type: "狗粮", grams: 0 }
  });

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setTime(new Date()), 1000);
    const diff = Math.floor((new Date().getTime() - birthday.getTime()) / (1000 * 60 * 60 * 24));
    setDaysWithUs(diff);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) return <main className="min-h-screen bg-paper" />;

  const handleAddTodayTask = (e: any) => {
    if (e.key === "Enter" && newTodayTask.trim()) {
      setTodayTasks([{ id: `t-${Date.now()}`, text: newTodayTask, completed: false }, ...todayTasks]);
      setNewTodayTask("");
    }
  };

  const handleAddWeeklyTask = (e: any) => {
    if (e.key === "Enter" && newWeeklyTask.trim()) {
      setWeeklyTasks([{ id: `w-${Date.now()}`, text: newWeeklyTask, day: "待定", completed: false }, ...weeklyTasks]);
      setNewWeeklyTask("");
    }
  };

  const deleteTodayTask = (id: string) => setTodayTasks(todayTasks.filter(t => t.id !== id));
  const deleteWeeklyTask = (id: string) => setWeeklyTasks(weeklyTasks.filter(t => t.id !== id));

  const handleAddNote = (e: any) => {
    if (e.key === "Enter" && newNote.trim()) {
      setNotes([{ id: Date.now(), text: newNote }, ...notes]);
      setNewNote("");
    }
  };

  const deleteNote = (id: number) => setNotes(notes.filter(note => note.id !== id));
  
  const toggleTask = (id: string, isToday: boolean) => {
    if (isToday) {
      setTodayTasks(todayTasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    } else {
      setWeeklyTasks(weeklyTasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    }
  };

  const updateWeeklyDay = (id: string, newDay: string) => {
    setWeeklyTasks(weeklyTasks.map(t => t.id === id ? { ...t, day: newDay } : t));
  };

  const moveToWeekly = (task: any) => {
    setTodayTasks(todayTasks.filter(t => t.id !== task.id));
    setWeeklyTasks([{ ...task, day: "待定" }, ...weeklyTasks]);
  };

  const moveToToday = (task: any) => {
    setWeeklyTasks(weeklyTasks.filter(t => t.id !== task.id));
    setTodayTasks([{ ...task }, ...todayTasks]);
  };

  const getDaysAgo = (dateStr: string) => {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const selected = new Date(dateStr); selected.setHours(0, 0, 0, 0);
    const diffDays = Math.floor(Math.abs(today.getTime() - selected.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays === 0 ? "今天" : `${diffDays} 天前`;
  };

  const timeString = time.toLocaleTimeString('zh-CN', { hour12: false });
  const dateString = time.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });
  const daysLabels = ["周一", "周二", "周三", "周四", "周五", "周六", "周日", "待定"];

  return (
    <main className="min-h-screen bg-paper p-4 md:p-10 pb-32" key="board-page">
      <header className="max-w-7xl mx-auto flex justify-between items-start mb-12">
        <div className="flex items-center gap-4 mt-4">
          <Link href="/" className="flex items-center gap-2 text-pencil opacity-70 hover:opacity-100 font-bold transition-all">
            <ArrowLeft className="w-5 h-5" />
            <span>回到首页</span>
          </Link>
          <motion.div 
            whileHover={{ y: -10, rotate: 10 }}
            className="cursor-help opacity-20 hover:opacity-100 transition-opacity"
          >
            <PawPrint className="w-5 h-5 text-soft-pink" />
          </motion.div>
        </div>
        <motion.div animate={{ rotate: [-1, 1, -1] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="bg-white px-6 py-3 hand-drawn-border hand-drawn-shadow flex flex-col items-center relative">
          <div className="tape bg-soft-pink/30 scale-75" />
          <span className="text-3xl font-black text-pencil tracking-widest font-mono">{timeString}</span>
          <span className="text-[10px] font-bold opacity-60 mt-1">{dateString}</span>
        </motion.div>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        {/* 今日重点 */}
        <div className="md:col-span-2">
          <BoardNote color="bg-note-yellow" rotation="rotate-[-0.5deg]" tapeColor="bg-soft-pink/40">
            <h2 className="text-3xl font-black mb-6 flex items-center gap-3 border-b-3 border-pencil/20 pb-3 text-pencil"><CheckCircle2 className="w-8 h-8" />今日重点</h2>
            <div className="mb-6 bg-white/40 p-3 rounded-xl border-2 border-dashed border-pencil/20">
              <input type="text" value={newTodayTask} onChange={(e) => setNewTodayTask(e.target.value)} onKeyDown={handleAddTodayTask} placeholder="增加今日任务... (Enter键)" className="w-full bg-transparent border-none outline-none font-bold text-xl text-pencil placeholder:opacity-30" />
            </div>
            <Reorder.Group axis="y" values={todayTasks} onReorder={setTodayTasks} className="space-y-4">
              <AnimatePresence>{todayTasks.map((task) => (
                <Reorder.Item key={task.id} value={task} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} className="cursor-grab active:cursor-grabbing">
                  <TodoItem task={task.text} completed={task.completed} onToggle={() => toggleTask(task.id, true)} onDelete={() => deleteTodayTask(task.id)} onMove={() => moveToWeekly(task)} moveLabel="去本周" large />
                </Reorder.Item>
              ))}</AnimatePresence>
            </Reorder.Group>
          </BoardNote>
        </div>

        {/* 随手记 */}
        <div className="h-full">
          <BoardNote color="bg-note-blue" rotation="rotate-[1.5deg]" tapeColor="bg-sage/30">
            <h2 className="text-2xl font-black mb-4 border-b-2 border-pencil/20 pb-2 text-pencil flex items-center gap-2"><PenLine className="w-6 h-6" />随手记</h2>
            <div className="mb-6 bg-white/40 p-2 rounded-xl border-2 border-dashed border-pencil/20">
              <input type="text" value={newNote} onChange={(e) => setNewNote(e.target.value)} onKeyDown={handleAddNote} placeholder="记点什么..." className="w-full bg-transparent border-none outline-none font-bold text-sm text-pencil placeholder:opacity-30" />
            </div>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              <AnimatePresence>{notes.map((note) => (
                <motion.div key={note.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.5 }} className="relative group p-3 border-l-4 border-sage/40 bg-white/30 italic font-bold text-base text-pencil/90 hover:bg-white/50 transition-all">
                  <button onClick={() => deleteNote(note.id)} className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-pencil/20 hover:text-soft-pink transition-all"><X className="w-4 h-4" /></button>
                  <p className="pr-6">"{note.text}"</p>
                </motion.div>
              ))}</AnimatePresence>
            </div>
          </BoardNote>
        </div>

        {/* 本周计划 */}
        <div className="md:col-span-2">
          <BoardNote color="bg-note-purple" rotation="rotate-[0.5deg]" tapeColor="bg-sage/40">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-2 border-b-2 border-pencil/20 pb-2 text-pencil"><Calendar className="w-6 h-6" />本周计划</h2>
            <div className="mb-6 bg-white/40 p-3 rounded-xl border-2 border-dashed border-pencil/20">
              <input type="text" value={newWeeklyTask} onChange={(e) => setNewWeeklyTask(e.target.value)} onKeyDown={handleAddWeeklyTask} placeholder="为本周打算... (Enter键)" className="w-full bg-transparent border-none outline-none font-bold text-lg text-pencil placeholder:opacity-30" />
            </div>
            <Reorder.Group axis="y" values={weeklyTasks} onReorder={setWeeklyTasks} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatePresence>{weeklyTasks.map((task) => (
                <Reorder.Item key={task.id} value={task} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, x: 20 }} className="cursor-grab active:cursor-grabbing">
                  <TodoItem task={task.text} completed={task.completed} onToggle={() => toggleTask(task.id, false)} onDelete={() => deleteWeeklyTask(task.id)} onMove={() => moveToToday(task)} moveLabel="去今日" badge={task.day} onBadgeChange={(newDay: string) => updateWeeklyDay(task.id, newDay)} daysLabels={daysLabels} />
                </Reorder.Item>
              ))}</AnimatePresence>
            </Reorder.Group>
          </BoardNote>
        </div>

        {/* Mocha 频道 */}
        <div className="h-full">
          <BoardNote color="bg-note-green" rotation="rotate-[-1deg]" tapeColor="bg-pencil/15">
            <h2 className="text-2xl font-black mb-4 text-sage-dark flex items-center gap-2 underline decoration-pencil/10 decoration-2 underline-offset-4"><PawPrint className="w-6 h-6 animate-pulse" />Mocha 频道</h2>
            <div className="mb-6 bg-white/40 p-3 rounded-2xl border-2 border-dashed border-pencil/10 flex flex-col items-center">
              <span className="text-xs font-black text-pencil/40 uppercase tracking-widest">已经陪伴我们</span>
              <div className="flex items-center gap-2"><span className="text-3xl font-black text-pencil">{daysWithUs}</span><span className="text-sm font-black text-pencil/60 mt-1">天</span><Heart className="w-4 h-4 text-soft-pink fill-current animate-bounce" /></div>
            </div>
            <div className="space-y-5 font-black text-pencil">
              <div className="grid grid-cols-2 gap-3">
                <div onClick={() => nailInputRef.current?.showPicker()} className="bg-white/50 p-3 rounded-xl border-2 border-pencil/5 relative hover:bg-white/80 transition-colors cursor-pointer text-center"><span className="text-[10px] opacity-50 flex items-center justify-center gap-1 mb-1"><Scissors className="w-3 h-3"/> 剪指甲</span><span className="text-base">{getDaysAgo(mochaData.lastNails)}</span><input ref={nailInputRef} type="date" value={mochaData.lastNails} onChange={(e) => setMochaData({...mochaData, lastNails: e.target.value})} className="absolute inset-0 opacity-0 pointer-events-none" /></div>
                <div onClick={() => bathInputRef.current?.showPicker()} className="bg-white/50 p-3 rounded-xl border-2 border-pencil/5 relative hover:bg-white/80 transition-colors cursor-pointer text-center"><span className="text-[10px] opacity-50 flex items-center justify-center gap-1 mb-1"><Waves className="w-3 h-3"/> 洗澡</span><span className="text-base">{getDaysAgo(mochaData.lastBath)}</span><input ref={bathInputRef} type="date" value={mochaData.lastBath} onChange={(e) => setMochaData({...mochaData, lastBath: e.target.value})} className="absolute inset-0 opacity-0 pointer-events-none" /></div>
              </div>
              <div className="bg-white/50 p-4 rounded-xl border-2 border-pencil/5 flex justify-between items-center"><span className="flex items-center gap-2 text-base"><Scale className="w-5 h-5 opacity-40" /> 体重</span><div className="flex items-center gap-1"><input type="number" step="0.1" value={mochaData.weight} onChange={(e) => setMochaData({...mochaData, weight: parseFloat(e.target.value)})} className="bg-transparent border-none outline-none text-right font-black w-12 text-xl" /><span className="text-sm opacity-60">kg</span></div></div>
              <div className="space-y-4 pt-4 border-t-2 border-dashed border-pencil/10">
                <h3 className="text-base font-black flex items-center gap-2"><Utensils className="w-5 h-5 opacity-40" /> 今日伙食</h3>
                <div className="bg-white/60 p-4 rounded-2xl border-2 border-pencil/5">
                  <div className="flex justify-between items-center mb-3"><select value={mochaData.breakfast.type} onChange={(e) => setMochaData({...mochaData, breakfast: {...mochaData.breakfast, type: e.target.value}})} className="bg-transparent border-none outline-none font-black text-sm cursor-pointer"><option>早餐(鲜食)</option><option>早餐(狗粮)</option></select><span className="text-sm font-mono bg-pencil/5 px-2 py-0.5 rounded-lg">{mochaData.breakfast.grams}g</span></div>
                  <input type="range" min="0" max="150" step="5" value={mochaData.breakfast.grams} onChange={(e) => setMochaData({...mochaData, breakfast: {...mochaData.breakfast, grams: parseInt(e.target.value)}})} className="w-full accent-sage h-2 cursor-pointer" />
                </div>
                <div className={`bg-white/60 p-4 rounded-2xl border-2 border-pencil/5 ${mochaData.dinner.grams === 0 ? 'opacity-60' : ''}`}>
                  <div className="flex justify-between items-center mb-3"><select value={mochaData.dinner.type} onChange={(e) => setMochaData({...mochaData, dinner: {...mochaData.dinner, type: e.target.value}})} className="bg-transparent border-none outline-none font-black text-sm cursor-pointer"><option>晚餐(待记录)</option><option>晚餐(鲜食)</option><option>晚餐(狗粮)</option></select><span className="text-sm font-mono bg-pencil/5 px-2 py-0.5 rounded-lg">{mochaData.dinner.grams}g</span></div>
                  <input type="range" min="0" max="150" step="5" value={mochaData.dinner.grams} onChange={(e) => setMochaData({...mochaData, dinner: {...mochaData.dinner, grams: parseInt(e.target.value)}})} className="w-full accent-pencil/40 h-2 cursor-pointer" />
                </div>
              </div>
            </div>
          </BoardNote>
        </div>
      </div>
    </main>
  );
}

function BoardNote({ children, color, rotation, tapeColor }: any) {
  return (
    <motion.div className={`relative ${color} ${rotation} p-8 hand-drawn-border hand-drawn-shadow min-h-[300px] transition-all duration-300 group flex flex-col`}>
      <div className={`tape ${tapeColor}`} />
      <div className="flex-1 overflow-hidden">{children}</div>
    </motion.div>
  );
}

function TodoItem({ task, completed, onToggle, onDelete, onMove, moveLabel, badge, onBadgeChange, daysLabels, large }: any) {
  return (
    <div className={`flex items-center justify-between group/item bg-white/40 rounded-xl border-2 border-transparent hover:border-pencil/10 transition-all ${large ? 'p-4' : 'p-2'}`}>
      <div className="flex items-center gap-3 flex-1 overflow-hidden" onClick={onToggle}>
        <div className={`rounded-full border-3 border-pencil flex items-center justify-center shrink-0 cursor-pointer ${large ? 'w-8 h-8' : 'w-6 h-6'} ${completed ? 'bg-sage' : 'bg-transparent'}`}>
          {completed && <Plus className={`${large ? 'w-6 h-6' : 'w-4 h-4'} text-white rotate-45`} />}
        </div>
        <div className="relative overflow-hidden truncate">
          <span className={`font-black transition-all cursor-pointer ${large ? 'text-2xl' : 'text-lg'} ${completed ? 'opacity-30' : 'text-pencil'}`}>{task}</span>
          {completed && <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} className="absolute left-0 top-1/2 h-0.5 bg-pencil -translate-y-1/2" />}
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button 
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          className="p-1.5 text-pencil/20 hover:text-soft-pink opacity-0 group-hover/item:opacity-100 transition-all"
        >
          <X className="w-4 h-4" />
        </button>
        {badge && (
          <div className="relative bg-pencil/10 px-1.5 py-0.5 rounded italic font-black text-[10px] cursor-pointer hover:bg-pencil/20 transition-colors">
            <select value={badge} onChange={(e) => onBadgeChange(e.target.value)} className="absolute inset-0 opacity-0 cursor-pointer">{daysLabels.map((day: string) => (<option key={day} value={day}>{day}</option>))}</select>{badge}
          </div>
        )}
        <button onClick={(e) => { e.stopPropagation(); onMove(); }} className="text-[10px] font-black bg-pencil text-white px-2 py-1 rounded-lg opacity-0 group-hover/item:opacity-100 transition-opacity whitespace-nowrap">{moveLabel}</button>
        <GripVertical className="w-4 h-4 text-pencil/20 cursor-grab" />
      </div>
    </div>
  );
}
