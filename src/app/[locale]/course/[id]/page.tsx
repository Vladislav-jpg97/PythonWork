"use client"

import * as React from "react";
import { use, useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { CalendarSection } from "@/components/ui/CalendarSection";
import { Heading } from "@/components/ui/Headings";
import { Paragraph } from "@/components/ui/Paragraph";
import { TopicSlider } from "@/components/TopicSlider";
import { cn } from "@/lib/utils";

interface CoursePageProps {
  params: Promise<{ id: string; locale: string }>;
}

const CoursePage = ({ params }: CoursePageProps) => {
  const { id } = use(params);
  const t = useTranslations("PythonThemes");
  const allContent = t.raw("content");
  const content = allContent[id];

  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-25% 0px -65% 0px", threshold: 0.1 }
    );

    ["theory", "video", "visual"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  if (!content) {
    return (
      <div className="min-h-screen bg-[#0b0e14] flex items-center justify-center text-white px-6">
        <div className="text-center space-y-8">
          <h1 className="text-7xl md:text-9xl font-black italic opacity-5 tracking-tighter select-none">ERROR 404</h1>
          <Paragraph tone="muted" className="font-mono text-[10px] uppercase tracking-[0.5em]">
            {t("aside_title")}: <span className="text-blue-500 border-b border-blue-500/30 pb-1">"{id}"</span>
          </Paragraph>
        </div>
      </div>
    );
  }

  const menuItems = [
    { id: "theory", label: t("menu.theory") },
    { id: "video", label: t("menu.video") },
    { id: "visual", label: t("menu.visual") },
  ];

  return (
    <main className="min-h-screen bg-[#0b0e14] text-slate-300 scroll-smooth selection:bg-blue-500/30 overflow-x-hidden">
      {/* Адаптивный фон */}
      <div className="absolute top-0 right-0 w-full lg:w-[70%] h-[500px] md:h-[1000px] bg-blue-600/[0.04] blur-[100px] md:blur-[180px] pointer-events-none" />

      {/* Основной контейнер с адаптивными отступами */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pt-20 md:pt-28 lg:pt-36 pb-20 md:pb-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-24">

          {/* ЛЕВАЯ КОЛОНКА */}
          <div className="lg:col-span-8 space-y-24 md:space-y-40">

            {/* Header раздела */}
            <header className="space-y-6 md:space-y-10">
              <div className="inline-flex items-center gap-3 text-blue-500 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.4em] bg-blue-500/[0.08] px-4 md:px-6 py-2 md:py-3 rounded-full border border-blue-500/20 shadow-lg">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500 shadow-[0_0_8px_#3b82f6]"></span>
                </span>
                {t("academy")}
              </div>
              <Heading as="h1" level="h1" className="!text-4xl sm:!text-6xl md:!text-7xl lg:!text-8xl !font-black text-white tracking-tighter leading-[1] md:leading-[0.9] uppercase italic">
                {content.name}
              </Heading>
            </header>

            {/* --- СЕКЦИЯ: ТЕОРИЯ --- */}
            <section id="theory" className="scroll-mt-24 md:scroll-mt-32 space-y-10 md:space-y-16">
              <div className="flex items-center gap-4 md:gap-8 group">
                <div className="h-10 md:h-14 w-1.5 md:w-2.5 bg-blue-600 rounded-full shadow-[0_0_25px_rgba(37,99,235,0.6)] group-hover:scale-y-110 transition-transform duration-700" />
                <Heading as="h2" level="h2" className="!text-3xl md:!text-5xl !font-black text-white tracking-tight italic uppercase">
                  {t("theory_title")}
                </Heading>
              </div>

              <div className="space-y-8 md:space-y-14">
                {/* Главное определение */}
                <div className="bg-[#11141b]/40 backdrop-blur-2xl border border-white/[0.06] rounded-[2.5rem] md:rounded-[4.5rem] p-8 md:p-14 shadow-2xl relative overflow-hidden group hover:border-white/[0.12] transition-all duration-1000">
                  <div className="absolute top-0 left-0 w-1.5 md:w-2 h-full bg-blue-600/30 group-hover:bg-blue-600 transition-colors duration-1000" />
                  <Paragraph className="!text-lg sm:!text-xl md:!text-3xl text-slate-100 !leading-[1.45] font-medium tracking-tight">
                    {content.definition}
                  </Paragraph>
                  {content.dynamic_info && (
                    <div className="mt-10 md:mt-14 pt-8 md:pt-10 border-t border-white/[0.05]">
                      <span className="text-blue-400/80 font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold">
                        {content.dynamic_info}
                      </span>
                    </div>
                  )}
                </div>

                {/* Сетка типов (1 колонка на мобилках, 2 на десктопе) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-10">
                  {content.types_list?.map((item: any, idx: number) => (
                    <div key={idx} className="bg-white/[0.02] border border-white/[0.04] p-8 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] hover:bg-white/[0.04] hover:border-blue-500/30 transition-all duration-700 group relative">
                      <div className="space-y-6 md:space-y-8">
                        <div className="flex justify-between items-start">
                          <span className="text-blue-500 font-black text-base md:text-xl uppercase tracking-tighter">{item.t}</span>
                          <span className="text-[8px] md:text-[9px] text-slate-500 font-bold uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-full border border-white/5">{item.n}</span>
                        </div>
                        <code className="block bg-black/40 p-5 md:p-8 rounded-[1.8rem] md:rounded-[2.5rem] text-emerald-400 text-sm md:text-lg font-bold font-mono border border-white/[0.03] overflow-x-auto shadow-2xl">
                          {item.ex}
                        </code>
                        <Paragraph size="sm" tone="muted" className="px-1 !text-sm md:!text-base !leading-relaxed">
                          {item.desc}
                        </Paragraph>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Советы и Предупреждения (те самые строчки) */}
                <div className="grid grid-cols-1 gap-5 md:gap-8">
                  {content.warning && (
                    <div className="bg-red-500/[0.03] border border-red-500/10 rounded-[2rem] md:rounded-[3rem] p-7 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-10 group hover:bg-red-500/[0.06] transition-all duration-700">
                      <div className="shrink-0 bg-red-500/10 p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] text-2xl md:text-4xl group-hover:rotate-12 transition-transform">⚠️</div>
                      <p className="text-red-200/70 text-sm md:text-xl font-bold uppercase italic tracking-tight text-center md:text-left">{content.warning}</p>
                    </div>
                  )}
                  {content.pro_tip && (
                    <div className="bg-blue-600/[0.04] border border-blue-500/10 rounded-[2rem] md:rounded-[3rem] p-7 md:p-10 flex flex-col md:flex-row gap-6 md:gap-10 items-center group hover:bg-blue-600/[0.08] transition-all duration-700">
                      <div className="shrink-0 bg-blue-500/10 p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] text-2xl md:text-4xl group-hover:-rotate-12 transition-transform">💡</div>
                      <p className="text-blue-100/70 text-sm md:text-xl italic leading-relaxed font-medium text-center md:text-left">{content.pro_tip}</p>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* --- СЕКЦИЯ: ВИДЕО --- */}
            <section id="video" className="scroll-mt-24 md:scroll-mt-32 space-y-10">
              <div className="flex items-center gap-5 pl-6 md:pl-10 relative">
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 md:w-2 h-8 md:h-12 bg-slate-800 rounded-full" />
                <Heading as="h2" level="h2" className="!text-2xl md:!text-4xl !font-extrabold text-white uppercase italic tracking-tight">{t("video_title")}</Heading>
              </div>
              <div className="aspect-video rounded-[2.5rem] md:rounded-[4.5rem] overflow-hidden border border-white/10 bg-black shadow-3xl group">
                <iframe className="w-full h-full opacity-60 group-hover:opacity-100 transition-all duration-1000" src={`https://www.youtube.com/embed/${content.video_id}`} allowFullScreen />
              </div>
            </section>

            {/* --- СЕКЦИЯ: ВИЗУАЛ --- */}
            <section id="visual" className="scroll-mt-24 md:scroll-mt-32 space-y-10">
              <div className="flex items-center gap-5 pl-6 md:pl-10 relative">
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 md:w-2 h-8 md:h-12 bg-slate-800 rounded-full" />
                <Heading as="h2" level="h2" className="!text-2xl md:!text-4xl !font-extrabold text-white uppercase italic tracking-tight">{t("visual_title")}</Heading>
              </div>
              <div className="bg-white/[0.02] rounded-[2.5rem] md:rounded-[4.5rem] p-4 md:p-8 border border-white/[0.05] shadow-2xl relative">
                <TopicSlider slides={content.slides || []} />
              </div>
            </section>
          </div>

          {/* ПРАВАЯ КОЛОНКА (SIDEBAR) */}
          <aside className="hidden lg:block lg:col-span-4 relative">
            <div className="sticky top-32 space-y-10 xl:pl-10">

              <nav className="p-2 bg-[#11141b]/60 backdrop-blur-3xl rounded-[3rem] border border-white/[0.08] shadow-2xl">
                <div className="px-8 py-6">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">{t("aside_title")}</h3>
                </div>
                <div className="flex flex-col gap-2 p-2">
                  {menuItems.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={cn(
                          "flex items-center justify-between px-8 py-5 rounded-[2.2rem] transition-all duration-500 border",
                          isActive
                            ? "bg-white/[0.08] border-white/10 text-white shadow-xl"
                            : "text-slate-500 border-transparent hover:bg-white/[0.03] hover:text-slate-300"
                        )}
                      >
                        <span className="text-[11px] font-black uppercase tracking-widest">{item.label}</span>
                        <div className={cn(
                          "w-2 h-2 rounded-full transition-all duration-500",
                          isActive ? "bg-blue-500 scale-150 shadow-[0_0_12px_#3b82f6]" : "bg-slate-800"
                        )} />
                      </a>
                    );
                  })}
                </div>
              </nav>

              <div className="bg-[#11141b]/80 backdrop-blur-2xl rounded-[3.5rem] border border-white/[0.08] p-5 shadow-2xl">
                <div className="rounded-[2.5rem] overflow-hidden bg-black/20 p-2">
                  <CalendarSection />
                </div>
              </div>

            </div>
          </aside>

        </div>
      </div>
    </main>
  );
};

export default CoursePage;