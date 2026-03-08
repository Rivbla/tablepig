"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, PawPrint, Star, Bone, Waves } from "lucide-react";
import Link from "next/link";

export default function MochaPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const photos = [
    "/mocha/IMG_0309.JPG",
    "/mocha/IMG_1172.JPG",
    "/mocha/IMG_4641.jpeg",
    "/mocha/IMG_8884.jpeg",
    "/mocha/IMG_9590.jpeg"
  ];

  if (!mounted) return <main className="min-h-screen bg-pink-light" />;

  return (
    <main className="min-h-screen bg-pink-light selection:bg-soft-pink selection:text-white pb-20 relative overflow-hidden" key="mocha-page">
      {/* 背景装饰 */}
      <PawPrint className="absolute top-20 right-[-50px] text-pencil/5 w-64 h-64 rotate-12 pointer-events-none" />
      
      {/* 顶部导航 */}
      <nav className="p-6 md:p-8">
        <Link href="/" className="flex items-center gap-2 text-pencil opacity-60 hover:opacity-100 font-bold transition-all">
          <ArrowLeft className="w-5 h-5" />
          <span className="font-bold">回到 TablePig</span>
        </Link>
      </nav>

      <div className="max-w-4xl mx-auto px-6">
        {/* 核心介绍卡片 */}
        <section className="flex flex-col md:flex-row items-center gap-10 py-10 bg-note-yellow p-8 md:p-12 hand-drawn-border hand-drawn-shadow relative">
          <div className="tape bg-soft-pink/40" />
          
          <motion.div 
            initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            className="w-64 h-64 bg-sage rounded-full flex items-center justify-center relative shadow-2xl shadow-sage/20 border-4 border-pencil shrink-0 overflow-hidden"
          >
            <img src={photos[0]} alt="Mocha Profile" className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/10">
              <div className="text-white text-center z-10 drop-shadow-lg">
                <p className="text-5xl font-black mb-1">Mocha</p>
                <p className="font-bold opacity-90 italic text-sm">#长毛腊肠 #傲娇公举</p>
              </div>
            </div>
          </motion.div>

          <div className="text-center md:text-left space-y-4">
            <h1 className="text-5xl font-black text-pencil tracking-tight">你好，我是 Mocha 🐾</h1>
            <p className="text-xl text-pencil font-bold leading-relaxed">
              身高 20cm，体重不到 6kg，<br />
              虽然我是个修长的女孩子，但爸爸妈妈说我要减肥了...<br />
              其实我只是毛蓬松，真的！
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2">
              <Badge icon={<Star className="w-4 h-4" />} label="床位霸占者" />
              <Badge icon={<Bone className="w-4 h-4" />} label="鸡肉发烧友" />
              <Badge icon={<Heart className="w-4 h-4" />} label="有点小脾气" />
            </div>
          </div>
        </section>

        {/* 趣味数据记录 */}
        <section className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div whileHover={{ y: -5, rotate: -1 }} className="bg-white p-8 rounded-4xl hand-drawn-border hand-drawn-shadow relative">
            <div className="tape w-20 bg-sage/20 left-10" />
            <h3 className="text-2xl font-black text-pencil mb-6 flex items-center gap-2 border-b-2 border-pencil/10 pb-2">
              <Bone className="text-sage" /> 腊肠法则
            </h3>
            <ul className="space-y-4 font-bold text-pencil/80">
              <li>🐾 所有的鸡肉都属于我，剩下的才属于人类</li>
              <li>🐾 晚上10点必须准时跳上床，占领中心位</li>
              <li>🐾 如果没被关注，会通过哼唧表达“小脾气”</li>
              <li>🐾 长毛一定要梳顺，不然我会不高兴</li>
            </ul>
          </motion.div>

          <motion.div whileHover={{ y: -5, rotate: 1 }} className="bg-note-blue p-8 rounded-4xl hand-drawn-border hand-drawn-shadow relative">
            <div className="tape w-20 bg-soft-pink/20 right-10 left-auto translate-x-0" />
            <h3 className="text-2xl font-black text-pencil mb-6 flex items-center gap-2 border-b-2 border-pencil/10 pb-2">
              <Heart className="text-soft-pink" /> 心头好
            </h3>
            <ul className="space-y-4 font-bold text-pencil/80">
              <li>✨ 刚刚煮熟的鸡胸肉（撕成条）</li>
              <li>✨ 被窝里最暖和的那块地方</li>
              <li>✨ 人类温柔的摸摸，但仅限我想被摸的时候</li>
              <li>✨ 每一个能展现我修长身姿的瞬间</li>
            </ul>
          </motion.div>
        </section>

        {/* 身体特征记录 */}
        <section className="mt-16 bg-note-green p-8 md:p-12 hand-drawn-border hand-drawn-shadow relative">
          <div className="tape bg-pencil/10" />
          <h2 className="text-3xl font-black text-pencil mb-8 text-center flex items-center justify-center gap-3">
            <Waves className="text-sage" /> 长毛腊肠的小秘密
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MochaFeature label="睡眠位" value="枕头正中心" />
            <MochaFeature label="脾气指数" value="偶尔傲娇" />
            <MochaFeature label="鸡肉探测器" value="100% 灵敏" />
          </div>
        </section>

        {/* 相册 */}
        <section className="mt-20 text-center">
          <h2 className="text-3xl font-black text-pencil mb-8">Mocha 的精彩瞬间</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {photos.map((src, i) => (
              <motion.div key={i} whileHover={{ rotate: i % 2 === 0 ? 3 : -3, scale: 1.05 }} className="aspect-square bg-white p-3 hand-drawn-border hand-drawn-shadow flex flex-col">
                <div className="relative w-full h-full overflow-hidden rounded-xl border-2 border-pencil/5">
                  <img src={src} alt={`Mocha ${i}`} className="w-full h-full object-cover" />
                </div>
                <p className="mt-3 text-[10px] font-black opacity-30 italic uppercase tracking-tighter">Moments #{i + 1}</p>
              </motion.div>
            ))}
          </div>
          <p className="mt-12 text-pencil opacity-40 font-bold italic text-sm">“我很挑剔，但我很爱你。”</p>
        </section>
      </div>
      <div className="fixed bottom-0 left-0 right-0 h-2 bg-pencil/10 z-0" />
    </main>
  );
}

function Badge({ icon, label }: any) {
  return (
    <div className="flex items-center gap-2 bg-white/60 text-pencil px-4 py-2 rounded-full text-sm font-black border-2 border-pencil/20 shadow-sm whitespace-nowrap">
      {icon}
      {label}
    </div>
  );
}

function MochaFeature({ label, value }: any) {
  return (
    <div className="bg-white/40 p-6 rounded-3xl border-2 border-dashed border-pencil/20 text-center">
      <p className="text-xs font-bold text-pencil opacity-50 uppercase mb-2">{label}</p>
      <p className="text-xl font-black text-pencil">{value}</p>
    </div>
  );
}
